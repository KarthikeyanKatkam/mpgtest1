import React, { useEffect, useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useTransaction } from '../../contexts/TransactionContext';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import WalletCard from '../../components/dashboard/WalletCard';
import TransactionCard from '../../components/dashboard/TransactionCard';
import { Wallet, ArrowUpDown, TrendingUp, Shield, RefreshCcw } from 'lucide-react';
import { CryptoCurrency } from '../../types';

const DashboardHome: React.FC = () => {
  const { hotWallets, coldWallets, isLoading: walletsLoading } = useWallet();
  const { transactions, isLoading: transactionsLoading } = useTransaction();
  const [totalBalance, setTotalBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  
  // Calculate total balance
  useEffect(() => {
    // In a real app, you would convert all balances to a single currency
    // For this demo, we'll just sum the values as if they're all in USD
    const total = hotWallets.reduce((sum, wallet) => sum + wallet.balance, 0);
    setTotalBalance(total);
  }, [hotWallets]);
  
  const simulateRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };
  
  // Get unique cryptocurrencies from user wallets
  const getUniqueCurrencies = (): CryptoCurrency[] => {
    const currencies = hotWallets.map(wallet => wallet.currency);
    return [...new Set(currencies)] as CryptoCurrency[];
  };
  
  // Get recent transactions (last 5)
  const getRecentTransactions = () => {
    return transactions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <button 
          onClick={simulateRefresh}
          className="flex items-center px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          disabled={refreshing}
        >
          <RefreshCcw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">${totalBalance.toFixed(2)}</h3>
                <p className="text-sm text-green-600 mt-1">+2.5% from last week</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Wallet size={24} className="text-blue-600" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{transactions.length}</h3>
                <p className="text-sm text-gray-600 mt-1">Last 30 days</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <ArrowUpDown size={24} className="text-purple-600" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Wallets</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{hotWallets.length}</h3>
                <p className="text-sm text-gray-600 mt-1">{getUniqueCurrencies().join(', ')}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Status</p>
                <h3 className="text-2xl font-bold text-green-600 mt-2">Secure</h3>
                <p className="text-sm text-gray-600 mt-1">2FA Enabled</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Shield size={24} className="text-green-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
            </CardHeader>
            <CardBody className="p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
              {transactionsLoading ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">Loading transactions...</p>
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-10">
                  <ArrowUpDown size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No transactions yet</p>
                  <p className="text-sm text-gray-400 mt-1">Your transaction history will appear here</p>
                </div>
              ) : (
                getRecentTransactions().map(transaction => (
                  <TransactionCard 
                    key={transaction.id} 
                    transaction={transaction} 
                    walletId={hotWallets[0]?.id} 
                  />
                ))
              )}
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Your Wallets</h3>
            </CardHeader>
            <CardBody className="p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
              {walletsLoading ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">Loading wallets...</p>
                </div>
              ) : hotWallets.length === 0 ? (
                <div className="text-center py-10">
                  <Wallet size={40} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No wallets yet</p>
                  <p className="text-sm text-gray-400 mt-1">Create a wallet to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {hotWallets.map(wallet => (
                    <WalletCard 
                      key={wallet.id} 
                      wallet={wallet} 
                    />
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;