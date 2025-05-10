import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { WalletState, Wallet, CryptoCurrency } from '../types';
import { getUserWallets, getCompanyWallets } from '../utils/mockData';
import { useAuth } from './AuthContext';

type WalletAction =
  | { type: 'FETCH_WALLETS_START' }
  | { type: 'FETCH_WALLETS_SUCCESS'; payload: { hot: Wallet[], cold: Wallet[] } }
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get user hot wallets and company cold wallets
      const hotWallets = getUserWallets(user.id);
      const coldWallets = getCompanyWallets();
      
      dispatch({
        type: 'FETCH_WALLETS_SUCCESS',
        payload: { hot: hotWallets, cold: coldWallets },
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_WALLETS_FAILURE',
        payload: 'Failed to fetch wallets. Please try again.',
      });
    }
  };

  const createWallet = async (currency: CryptoCurrency) => {
    if (!user) return;
    
    dispatch({ type: 'CREATE_WALLET_START' });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate random wallet address (in a real app, this would come from the backend)
      const address = `0x${Math.random().toString(16).substring(2, 42)}`;
      
      // Create new wallet
      const newWallet: Wallet = {
        id: `wallet${Math.random().toString(16).substring(2, 10)}`,
        userId: user.id,
        type: 'hot',
        address,
        balance: 0,
        currency,
        isActive: true,
        createdAt: new Date(),
        network: 'Ethereum', // Example network
        depositEnabled: true,
        withdrawalEnabled: true,
        minDeposit: 0.01, // Example minimum deposit
        maxDeposit: 100, // Example maximum deposit
      };
      
      dispatch({ type: 'CREATE_WALLET_SUCCESS', payload: newWallet });
    } catch (error) {
      dispatch({
        type: 'CREATE_WALLET_FAILURE',
        payload: 'Failed to create wallet. Please try again.',
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