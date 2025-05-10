export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  apiKey?: string;
  businessName?: string;
  businessId?: string;
}

export type NetworkType = 'testnet' | 'devnet' | 'mainnet';

export interface Network {
  id: string;
  name: string;
  symbol: string;
  chainId: number;
  isTestnet: boolean;
  explorerUrl: string;
}

export interface Wallet {
  id: string;
  userId?: string;
  businessId?: string;
  type: 'hot' | 'cold';
  address: string;
  balance: number;
  currency: CryptoCurrency;
  network: NetworkType;
  isActive: boolean;
  createdAt: Date;
  depositEnabled: boolean;
  withdrawalEnabled: boolean;
  minDeposit: number;
  maxDeposit: number;
}

export type CryptoCurrency = 
  | 'BTC' 
  | 'ETH' 
  | 'USDT' 
  | 'USDC' 
  | 'BNB' 
  | 'MATIC' 
  | 'DAI' 
  | 'BUSD';

export interface Transaction {
  id: string;
  fromWalletId: string;
  toWalletId: string;
  amount: number;
  currency: CryptoCurrency;
  network: Network;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  fee: number;
  hash?: string;
  businessId?: string;
  userId?: string;
  metadata?: {
    appId?: string;
    userReference?: string;
    purpose?: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface WalletState {
  hotWallets: Wallet[];
  coldWallets: Wallet[];
  isLoading: boolean;
  error: string | null;
}

export interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface DepositAddress {
  address: string;
  currency: CryptoCurrency;
  network: Network;
  qrCode: string;
}

export interface BusinessIntegration {
  id: string;
  businessId: string;
  name: string;
  apiKey: string;
  webhookUrl: string;
  allowedIps: string[];
  supportedCurrencies: CryptoCurrency[];
  createdAt: Date;
  status: 'active' | 'inactive';
}