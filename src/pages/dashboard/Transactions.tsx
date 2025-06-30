
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  TrendingUp,
  DollarSign,
  CreditCard,
  Bitcoin,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const transactions = [
    {
      id: 'TXN-2024-001',
      customer: 'Rajesh Kumar',
      amount: '₹2,350',
      currency: 'INR',
      method: 'UPI',
      type: 'payment',
      status: 'completed',
      date: '2024-01-15 14:30',
      fee: '₹23.50',
      invoiceId: 'INV-001'
    },
    {
      id: 'TXN-2024-002',
      customer: 'Priya Sharma',
      amount: '$150',
      currency: 'USD',
      method: 'Credit Card',
      type: 'payment',
      status: 'completed',
      date: '2024-01-15 12:15',
      fee: '$4.50',
      invoiceId: 'INV-002'
    },
    {
      id: 'TXN-2024-003',
      customer: 'Amit Singh',
      amount: '0.05 BTC',
      currency: 'BTC',
      method: 'Bitcoin',
      type: 'payment',
      status: 'pending',
      date: '2024-01-15 11:45',
      fee: '0.0002 BTC',
      invoiceId: 'INV-003'
    },
    {
      id: 'TXN-2024-004',
      customer: 'Settlement',
      amount: '₹45,000',
      currency: 'INR',
      method: 'NEFT',
      type: 'settlement',
      status: 'completed',
      date: '2024-01-15 10:00',
      fee: '₹15',
      invoiceId: '-'
    },
    {
      id: 'TXN-2024-005',
      customer: 'Sarah Wilson',
      amount: '€89',
      currency: 'EUR',
      method: 'Credit Card',
      type: 'payment',
      status: 'failed',
      date: '2024-01-15 09:30',
      fee: '€2.67',
      invoiceId: 'INV-004'
    },
    {
      id: 'TXN-2024-006',
      customer: 'David Lee',
      amount: '₹5,000',
      currency: 'INR',
      method: 'IMPS',
      type: 'payment',
      status: 'completed',
      date: '2024-01-14 18:20',
      fee: '₹50',
      invoiceId: 'INV-005'
    },
    {
      id: 'TXN-2024-007',
      customer: 'Tech Corp',
      amount: '0.15 ETH',
      currency: 'ETH',
      method: 'Ethereum',
      type: 'payment',
      status: 'completed',
      date: '2024-01-14 16:45',
      fee: '0.002 ETH',
      invoiceId: 'INV-006'
    },
    {
      id: 'TXN-2024-008',
      customer: 'Maya Exchange',
      amount: '$25',
      currency: 'USD',
      method: 'Credit Card',
      type: 'refund',
      status: 'completed',
      date: '2024-01-14 15:10',
      fee: '$0.75',
      invoiceId: 'INV-002'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment': return <ArrowDownRight className="h-4 w-4 text-green-600" />;
      case 'settlement': return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      case 'refund': return <ArrowUpRight className="h-4 w-4 text-orange-600" />;
      default: return <CreditCard className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMethodIcon = (method: string) => {
    if (method.includes('Bitcoin') || method.includes('Ethereum')) {
      return <Bitcoin className="h-4 w-4 text-orange-600" />;
    }
    return <CreditCard className="h-4 w-4 text-blue-600" />;
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.method.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'completed' && transaction.status === 'completed') ||
                         (selectedFilter === 'pending' && transaction.status === 'pending') ||
                         (selectedFilter === 'failed' && transaction.status === 'failed') ||
                         (selectedFilter === 'crypto' && ['Bitcoin', 'Ethereum'].includes(transaction.method)) ||
                         (selectedFilter === 'fiat' && !['Bitcoin', 'Ethereum'].includes(transaction.method));
    
    return matchesSearch && matchesFilter;
  });

  const totalVolume = transactions
    .filter(t => t.status === 'completed' && t.type === 'payment')
    .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[₹$€,\s\w]/g, '')), 0);

  const todayTransactions = transactions.filter(t => t.date.startsWith('2024-01-15')).length;
  const successRate = (transactions.filter(t => t.status === 'completed').length / transactions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">Monitor all payment transactions and settlements</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTransactions}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.5%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'completed', label: 'Completed' },
                { value: 'pending', label: 'Pending' },
                { value: 'failed', label: 'Failed' },
                { value: 'crypto', label: 'Crypto' },
                { value: 'fiat', label: 'Fiat' }
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Complete list of all payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell className="font-semibold">{transaction.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(transaction.method)}
                      <span>{transaction.method}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(transaction.type)}
                      <span className="capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="text-gray-600">{transaction.fee}</TableCell>
                  <TableCell>
                    {transaction.invoiceId !== '-' ? (
                      <Button variant="link" size="sm" className="h-auto p-0">
                        {transaction.invoiceId}
                      </Button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
