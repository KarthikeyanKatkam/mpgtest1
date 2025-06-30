
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Bitcoin, Users, Plus, Eye } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Overview = () => {
  const monthlyData = [
    { month: 'Jan', fiat: 45000, crypto: 15000 },
    { month: 'Feb', fiat: 52000, crypto: 18000 },
    { month: 'Mar', fiat: 48000, crypto: 22000 },
    { month: 'Apr', fiat: 61000, crypto: 25000 },
    { month: 'May', fiat: 55000, crypto: 28000 },
    { month: 'Jun', fiat: 67000, crypto: 32000 },
  ];

  const paymentMethodsData = [
    { name: 'UPI', value: 45, color: '#8884d8' },
    { name: 'Cards', value: 30, color: '#82ca9d' },
    { name: 'Crypto', value: 15, color: '#ffc658' },
    { name: 'Bank Transfer', value: 10, color: '#ff7300' },
  ];

  const recentTransactions = [
    { id: 'TXN001', customer: 'Rajesh Kumar', amount: '₹2,500', method: 'UPI', status: 'Completed', time: '2 mins ago' },
    { id: 'TXN002', customer: 'Priya Sharma', amount: '$150', method: 'Card', status: 'Completed', time: '5 mins ago' },
    { id: 'TXN003', customer: 'Tech Solutions Inc', amount: '0.05 BTC', method: 'Crypto', status: 'Pending', time: '10 mins ago' },
    { id: 'TXN004', customer: 'Amit Patel', amount: '₹8,900', method: 'NEFT', status: 'Completed', time: '15 mins ago' },
    { id: 'TXN005', customer: 'Global Traders', amount: '$750', method: 'SWIFT', status: 'Processing', time: '20 mins ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your payments.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View All Transactions
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹99,000</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fiat Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹67,000</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crypto Payments</CardTitle>
            <Bitcoin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹32,000</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +28.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +4.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue breakdown by payment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                  <Line 
                    type="monotone" 
                    dataKey="fiat" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Fiat Payments"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="crypto" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Crypto Payments"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment methods used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {paymentMethodsData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest payment activities on your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    {transaction.method === 'UPI' && <CreditCard className="h-4 w-4 text-blue-600" />}
                    {transaction.method === 'Card' && <CreditCard className="h-4 w-4 text-blue-600" />}
                    {transaction.method === 'Crypto' && <Bitcoin className="h-4 w-4 text-blue-600" />}
                    {(transaction.method === 'NEFT' || transaction.method === 'SWIFT') && <DollarSign className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.customer}</p>
                    <p className="text-sm text-gray-600">{transaction.id} • {transaction.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{transaction.amount}</p>
                    <p className="text-sm text-gray-600">{transaction.method}</p>
                  </div>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" className="w-full sm:w-auto">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
