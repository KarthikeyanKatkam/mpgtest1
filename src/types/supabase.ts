export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          created_at?: string
          updated_at?: string
        }
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          type: 'hot' | 'cold'
          address: string
          balance: number
          currency: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'hot' | 'cold'
          address: string
          balance?: number
          currency: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'hot' | 'cold'
          address?: string
          balance?: number
          currency?: string
          is_active?: boolean
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          from_wallet_id: string
          to_wallet_id: string
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed'
          fee: number
          hash: string | null
          created_at: string
        }
        Insert: {
          id?: string
          from_wallet_id: string
          to_wallet_id: string
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed'
          fee: number
          hash?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          from_wallet_id?: string
          to_wallet_id?: string
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed'
          fee?: number
          hash?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}