"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Download, 
  Bitcoin, 
  CreditCard,
  Eye,
  ArrowUpDown
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import DashboardLayout from '@/components/dashboard-layout';

// Mock transactions data
const allTransactions = [
  {
    id: 'TXN-001',
    amount: 250.00,
    currency: 'USD',
    method: 'fiat',
    status: 'completed',
    customer: 'customer@example.com',
    reference: 'UPI-123456789',
    createdAt: new Date('2024-01-15T10:30:00'),
    fee: 5.00,
  },
  {
    id: 'TXN-002',
    amount: 0.01,
    currency: 'BTC',
    method: 'crypto',
    status: 'pending',
    customer: 'crypto@example.com',
    reference: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    createdAt: new Date('2024-01-15T09:15:00'),
    fee: 0.0001,
  },
  {
    id: 'TXN-003',
    amount: 500.00,
    currency: 'USDT',
    method: 'crypto',
    status: 'completed',
    customer: 'trader@example.com',
    reference: '0x742d35cc6bb71866e073c5c5e09b5e9f',
    createdAt: new Date('2024-01-14T16:45:00'),
    fee: 2.50,
  },
  {
    id: 'TXN-004',
    amount: 1250.00,
    currency: 'USD',
    method: 'fiat',
    status: 'failed',
    customer: 'failed@example.com',
    reference: 'BANK-987654321',
    createdAt: new Date('2024-01-14T14:20:00'),
    fee: 0,
  },
  {
    id: 'TXN-005',
    amount: 0.25,
    currency: 'ETH',
    method: 'crypto',
    status: 'completed',
    customer: 'ethereum@example.com',
    reference: '0x32be343b94f860124dc4fee278fdcbd38c102d88',
    createdAt: new Date('2024-01-13T11:20:00'),
    fee: 0.001,
  },
  {
    id: 'TXN-006',
    amount: 750.00,
    currency: 'USD',
    method: 'fiat',
    status: 'completed',
    customer: 'business@example.com',
    reference: 'UPI-555666777',
    createdAt: new Date('2024-01-12T15:30:00'),
    fee: 15.00,
  },
];

export default function TransactionsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState(allTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    let filtered = allTransactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.reference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }

    // Method filter
    if (methodFilter !== 'all') {
      filtered = filtered.filter(tx => tx.method === methodFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'amount':
          return b.amount - a.amount;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setTransactions(filtered);
  }, [searchTerm, statusFilter, methodFilter, sortBy]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const totalVolume = transactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalFees = transactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.fee, 0);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.length}</div>
              <p className="text-xs text-muted-foreground">
                {transactions.filter(tx => tx.status === 'completed').length} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalVolume.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Completed transactions only
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalFees.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Transaction processing fees
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
            <CardDescription>
              View and manage all your payment transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="fiat">Fiat</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="whitespace-nowrap">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Transactions Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {transaction.method === 'crypto' ? (
                            <Bitcoin className="w-4 h-4 text-orange-500" />
                          ) : (
                            <CreditCard className="w-4 h-4 text-green-500" />
                          )}
                          <span>
                            {transaction.amount} {transaction.currency}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {transaction.method}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {transaction.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {transactions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No transactions found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}