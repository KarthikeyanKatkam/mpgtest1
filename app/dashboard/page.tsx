"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Bitcoin, 
  CreditCard, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import DashboardLayout from '@/components/dashboard-layout';
import Link from 'next/link';

// Mock data
const walletBalances = [
  { currency: 'USD', balance: 12500.50, type: 'fiat', change: 5.2 },
  { currency: 'BTC', balance: 0.45, type: 'crypto', change: -2.1 },
  { currency: 'ETH', balance: 3.2, type: 'crypto', change: 8.4 },
  { currency: 'USDT', balance: 8750.00, type: 'crypto', change: 0.1 },
];

const recentTransactions = [
  {
    id: '1',
    amount: 250.00,
    currency: 'USD',
    method: 'fiat',
    status: 'completed',
    customer: 'customer@example.com',
    createdAt: new Date('2024-01-15T10:30:00'),
  },
  {
    id: '2',
    amount: 0.01,
    currency: 'BTC',
    method: 'crypto',
    status: 'pending',
    customer: 'crypto@example.com',
    createdAt: new Date('2024-01-15T09:15:00'),
  },
  {
    id: '3',
    amount: 500.00,
    currency: 'USDT',
    method: 'crypto',
    status: 'completed',
    customer: 'trader@example.com',
    createdAt: new Date('2024-01-14T16:45:00'),
  },
  {
    id: '4',
    amount: 1250.00,
    currency: 'USD',
    method: 'fiat',
    status: 'failed',
    customer: 'failed@example.com',
    createdAt: new Date('2024-01-14T14:20:00'),
  },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const totalVolume = walletBalances.reduce((acc, wallet) => {
    if (wallet.currency === 'USD' || wallet.currency === 'USDT') {
      return acc + wallet.balance;
    }
    // Mock conversion rates
    if (wallet.currency === 'BTC') return acc + (wallet.balance * 43000);
    if (wallet.currency === 'ETH') return acc + (wallet.balance * 2500);
    return acc;
  }, 0);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.name}
            </h1>
            <p className="text-gray-600">{user.businessName}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant={user.kycStatus === 'verified' ? 'default' : 'secondary'}>
              KYC: {user.kycStatus}
            </Badge>
            <Link href="/payment-links">
              <Button className="maya-gradient text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Payment Link
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalVolume.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crypto Volume</CardTitle>
              <Bitcoin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,230</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline w-3 h-3 mr-1" />
                -2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +0.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wallet Balances */}
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balances</CardTitle>
              <CardDescription>Your current balances across all currencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {walletBalances.map((wallet) => (
                <div key={wallet.currency} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      wallet.type === 'crypto' ? 'crypto-gradient' : 'fiat-gradient'
                    }`}>
                      {wallet.type === 'crypto' ? (
                        <Bitcoin className="w-5 h-5 text-white" />
                      ) : (
                        <DollarSign className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{wallet.currency}</p>
                      <p className="text-sm text-gray-500 capitalize">{wallet.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {wallet.balance.toLocaleString()} {wallet.currency}
                    </p>
                    <p className={`text-sm flex items-center ${
                      wallet.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {wallet.change >= 0 ? (
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3 mr-1" />
                      )}
                      {Math.abs(wallet.change)}%
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest payment activities</CardDescription>
              </div>
              <Link href="/transactions">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.method === 'crypto' ? 'crypto-gradient' : 'fiat-gradient'
                    }`}>
                      {transaction.method === 'crypto' ? (
                        <Bitcoin className="w-5 h-5 text-white" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.customer}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {transaction.amount} {transaction.currency}
                    </p>
                    <Badge 
                      variant={
                        transaction.status === 'completed' ? 'default' :
                        transaction.status === 'pending' ? 'secondary' : 'destructive'
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}