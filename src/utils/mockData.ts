import { User, Wallet, Transaction, CryptoCurrency } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'johndoe',
    email: 'john@example.com',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: 'user2',
    username: 'janedoe',
    email: 'jane@example.com',
    createdAt: new Date('2023-02-20'),
  },
];

// Mock Wallets
export const mockWallets: Wallet[] = [
  // Hot Wallets (User Wallets)
  {
    id: 'wallet1',
    userId: 'user1',
    type: 'hot',
    address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    balance: 1.25,
    currency: 'ETH',
    isActive: true,
    createdAt: new Date('2023-01-20'),
  },
  {
    id: 'wallet2',
    userId: 'user1',
    type: 'hot',
    address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    balance: 0.05,
    currency: 'BTC',
    isActive: true,
    createdAt: new Date('2023-01-21'),
  },
  {
    id: 'wallet3',
    userId: 'user2',
    type: 'hot',
    address: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac',
    balance: 2.5,
    currency: 'ETH',
    isActive: true,
    createdAt: new Date('2023-02-25'),
  },
  // Cold Wallets (Company Wallets)
  {
    id: 'wallet4',
    type: 'cold',
    address: 'bc1q9h6ywm9tf57tqc5xva82uzjmd4g9keezcu4rv5',
    balance: 12.3,
    currency: 'BTC',
    isActive: true,
    createdAt: new Date('2022-12-10'),
  },
  {
    id: 'wallet5',
    type: 'cold',
    address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
    balance: 150,
    currency: 'ETH',
    isActive: true,
    createdAt: new Date('2022-12-15'),
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    fromWalletId: 'wallet1',
    toWalletId: 'wallet4',
    amount: 0.5,
    currency: 'ETH',
    status: 'completed',
    timestamp: new Date('2023-03-10T14:30:00'),
    fee: 0.002,
    hash: '0xabc123def456',
  },
  {
    id: 'tx2',
    fromWalletId: 'wallet2',
    toWalletId: 'wallet4',
    amount: 0.01,
    currency: 'BTC',
    status: 'completed',
    timestamp: new Date('2023-03-15T10:45:00'),
    fee: 0.0005,
    hash: '0xdef456abc789',
  },
  {
    id: 'tx3',
    fromWalletId: 'wallet4',
    toWalletId: 'wallet3',
    amount: 0.25,
    currency: 'ETH',
    status: 'pending',
    timestamp: new Date('2023-03-20T16:20:00'),
    fee: 0.001,
  },
];

// Get user wallets
export const getUserWallets = (userId: string): Wallet[] => {
  return mockWallets.filter(wallet => wallet.userId === userId && wallet.type === 'hot');
};

// Get company cold wallets
export const getCompanyWallets = (): Wallet[] => {
  return mockWallets.filter(wallet => wallet.type === 'cold');
};

// Get user transactions
export const getUserTransactions = (userId: string): Transaction[] => {
  const userWalletIds = getUserWallets(userId).map(wallet => wallet.id);
  return mockTransactions.filter(tx => 
    userWalletIds.includes(tx.fromWalletId) || userWalletIds.includes(tx.toWalletId)
  );
};