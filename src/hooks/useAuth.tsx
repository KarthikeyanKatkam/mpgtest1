
import { useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const createMerchantRecord = useCallback(async (user: User | undefined) => {
    if (!user) return;

    try {
      const { data: existingMerchant, error: checkError } = await supabase
        .from('merchants')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking merchant record:', checkError);
        return;
      }

      if (!existingMerchant) {
        const { error: insertError } = await supabase
          .from('merchants')
          .insert({
            user_id: user.id,
            company_name: user.user_metadata?.company_name || 'My Company',
            business_email: user.email || '',
            business_phone: user.user_metadata?.phone || '',
            subscription_plan: 'business_basic',
          });

        if (insertError) {
          console.error('Error creating merchant record:', insertError);
        } else {
          console.log('Merchant record created successfully');
        }
      }
    } catch (error) {
      console.error('Error in createMerchantRecord:', error);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
        } else if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await createMerchantRecord(session.user);
          }
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN' && session?.user) {
          await createMerchantRecord(session.user);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [createMerchantRecord]);

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        toast.error(error.message);
      }
      
      return { data, error };
    } catch (error) {
      console.error('SignUp error:', error);
      toast.error('An unexpected error occurred');
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message);
      }
      
      return { data, error };
    } catch (error) {
      console.error('SignIn error:', error);
      toast.error('An unexpected error occurred');
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
      }
      return { error };
    } catch (error) {
      console.error('SignOut error:', error);
      toast.error('An unexpected error occurred');
      return { error };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };
};
