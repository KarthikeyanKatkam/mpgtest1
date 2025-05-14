import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { WalletState, Wallet, CryptoCurrency } from '../types';
import { supabase } from '../utils/supabase';
import { useAuth } from './AuthContext';

type WalletAction =
  | { type: 'FETCH_WALLETS_START' }
  | { type: 'FETCH_WALLETS_SUCCESS'; payload: { hot: Wallet[]; cold: Wallet[] } }
  | { type: 'FETCH_WALLETS_FAILURE'; payload: string }
  | { type: 'CREATE_WALLET_START' }
  | { type: 'CREATE_WALLET_SUCCESS'; payload: Wallet }
  | { type: 'CREATE_WALLET_FAILURE'; payload: string };

interface WalletContextType extends WalletState {
  fetchWallets: () => Promise<void>;
  createWallet: (currency: CryptoCurrency) => Promise<void>;
}

const initialState: WalletState = {
  hotWallets: [],
  coldWallets: [],
  isLoading: false,
  error: null,
};

const WalletContext = createContext<WalletContextType>({
  ...initialState,
  fetchWallets: async () => {},
  createWallet: async () => {},
});

const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'FETCH_WALLETS_START':
    case 'CREATE_WALLET_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_WALLETS_SUCCESS':
      return {
        ...state,
        hotWallets: action.payload.hot,
        coldWallets: action.payload.cold,
        isLoading: false,
        error: null,
      };
    case 'CREATE_WALLET_SUCCESS':
      return {
        ...state,
        hotWallets: [...state.hotWallets, action.payload],
        isLoading: false,
        error: null,
      };
    case 'FETCH_WALLETS_FAILURE':
    case 'CREATE_WALLET_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchWallets();
    }
  }, [isAuthenticated, user]);

  const fetchWallets = async () => {
    if (!user) return;

    dispatch({ type: 'FETCH_WALLETS_START' });
    try {
      const { data: hotWallets, error: hotError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'hot');

      const { data: coldWallets, error: coldError } = await supabase
        .from('wallets')
        .select('*')
        .eq('type', 'cold');

      if (hotError || coldError) {
        throw hotError || coldError;
      }

      dispatch({
        type: 'FETCH_WALLETS_SUCCESS',
        payload: {
          hot: hotWallets || [],
          cold: coldWallets || [],
        },
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_WALLETS_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to fetch wallets',
      });
    }
  };

  const createWallet = async (currency: CryptoCurrency) => {
    if (!user) return;

    dispatch({ type: 'CREATE_WALLET_START' });
    try {
      // Generate a random wallet address (in a real app, this would be done securely on the backend)
      const address = `0x${Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;

      const { data: wallet, error } = await supabase
        .from('wallets')
        .insert({
          user_id: user.id,
          type: 'hot',
          address,
          currency,
          balance: 0,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;
      if (!wallet) throw new Error('Failed to create wallet');

      dispatch({ type: 'CREATE_WALLET_SUCCESS', payload: wallet });
    } catch (error) {
      dispatch({
        type: 'CREATE_WALLET_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to create wallet',
      });
    }
  };

  return (
    <WalletContext.Provider value={{ ...state, fetchWallets, createWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);