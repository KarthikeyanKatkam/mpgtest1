import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { TransactionState, Transaction, CryptoCurrency, Network } from '../types';
import { getUserTransactions } from '../utils/mockData';
import { useAuth } from './AuthContext';

type TransactionAction =
  | { type: 'FETCH_TRANSACTIONS_START' }
  | { type: 'FETCH_TRANSACTIONS_SUCCESS'; payload: Transaction[] }
  | { type: 'FETCH_TRANSACTIONS_FAILURE'; payload: string }
  | { type: 'CREATE_TRANSACTION_START' }
  | { type: 'CREATE_TRANSACTION_SUCCESS'; payload: Transaction }
  | { type: 'CREATE_TRANSACTION_FAILURE'; payload: string };

interface TransactionContextType extends TransactionState {
  fetchTransactions: () => Promise<void>;
  createTransaction: (
    fromWalletId: string,
    toAddress: string,
    amount: number,
    currency: CryptoCurrency
  ) => Promise<void>;
}

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
};

const TransactionContext = createContext<TransactionContextType>({
  ...initialState,
  fetchTransactions: async () => {},
  createTransaction: async () => {},
});

const transactionReducer = (state: TransactionState, action: TransactionAction): TransactionState => {
  switch (action.type) {
    case 'FETCH_TRANSACTIONS_START':
    case 'CREATE_TRANSACTION_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_TRANSACTIONS_SUCCESS':
      return {
        ...state,
        transactions: action.payload,
        isLoading: false,
        error: null,
      };
    case 'CREATE_TRANSACTION_SUCCESS':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        isLoading: false,
        error: null,
      };
    case 'FETCH_TRANSACTIONS_FAILURE':
    case 'CREATE_TRANSACTION_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  const fetchTransactions = useCallback(async () => {
    if (!user) return;
    
    dispatch({ type: 'FETCH_TRANSACTIONS_START' });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get user transactions
      const transactions = getUserTransactions(user.id);
      
      dispatch({
        type: 'FETCH_TRANSACTIONS_SUCCESS',
        payload: transactions,
      });
    } catch (err) {
      dispatch({
        type: 'FETCH_TRANSACTIONS_FAILURE',
        payload: 'Failed to fetch transactions. Please try again.',
      });
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchTransactions();
    }
  }, [isAuthenticated, user, fetchTransactions]);

  const createTransaction = async (
    fromWalletId: string,
    toAddress: string,
    amount: number,
    currency: CryptoCurrency
  ) => {
    if (!user) return;
    
    dispatch({ type: 'CREATE_TRANSACTION_START' });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For this demo, we'll just create a new transaction object
      const mockNetwork: Network = {
        id: 'eth-mainnet',
        name: 'Ethereum Mainnet',
        symbol: 'ETH',
        chainId: 1,
        isTestnet: false,
        explorerUrl: 'https://etherscan.io'
      };

      const newTransaction: Transaction = {
        id: `tx${Math.random().toString(16).substring(2, 10)}`,
        fromWalletId,
        toWalletId: 'wallet4', // Assuming transfer to company wallet
        amount,
        currency,
        network: mockNetwork,
        status: 'pending',
        timestamp: new Date(),
        fee: amount * 0.005, // 0.5% fee for demo
      };
      
      dispatch({ type: 'CREATE_TRANSACTION_SUCCESS', payload: newTransaction });
      
      // Simulate transaction completion after 3 seconds
      setTimeout(() => {
        const updatedTransaction: Transaction = {
          ...newTransaction,
          status: 'completed',
          hash: `0x${Math.random().toString(16).substring(2, 42)}`,
        };
        
        dispatch({ type: 'CREATE_TRANSACTION_SUCCESS', payload: updatedTransaction });
      }, 3000);
    } catch (err) {
      dispatch({
        type: 'CREATE_TRANSACTION_FAILURE',
        payload: 'Failed to create transaction. Please try again.',
      });
    }
  };

  return (
    <TransactionContext.Provider value={{ ...state, fetchTransactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);