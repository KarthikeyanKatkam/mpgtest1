
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Building, 
  Plus, 
  CheckCircle, 
  AlertCircle,
  Edit,
  Trash2,
  IndianRupee,
  DollarSign,
  Euro
} from 'lucide-react';

const FiatPayments = () => {
  const [paymentMethods, setPaymentMethods] = useState({
    upi: true,
    neft: true,
    rtgs: false,
    imps: true,
    swift: false
  });

  const [showAddBank, setShowAddBank] = useState(false);

  const bankAccounts = [
    {
      id: 1,
      bankName: 'HDFC Bank',
      accountNumber: '****1234',
      ifsc: 'HDFC0001234',
      accountType: 'Current',
      status: 'active'
    },
    {
      id: 2,
      bankName: 'ICICI Bank',
      accountNumber: '****5678',
      ifsc: 'ICICI0005678',
      accountType: 'Savings',
      status: 'active'
    }
  ];

  const upiIds = [
    { id: 1, upiId: 'demo@okhdfc', provider: 'HDFC Bank', status: 'active' },
    { id: 2, upiId: 'maya.demo@paytm', provider: 'Paytm', status: 'active' }
  ];

  const togglePaymentMethod = (method: string) => {
    setPaymentMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fiat Payments Setup</h1>
          <p className="text-gray-600 mt-1">Configure your traditional payment methods and bank accounts</p>
        </div>
        <Button onClick={() => setShowAddBank(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Payment Methods Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Methods</span>
          </CardTitle>
          <CardDescription>Enable or disable payment methods for your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'upi', label: 'UPI Payments', desc: 'Instant payments via UPI' },
              { key: 'neft', label: 'NEFT Transfer', desc: 'National Electronic Funds Transfer' },
              { key: 'rtgs', label: 'RTGS Transfer', desc: 'Real Time Gross Settlement' },
              { key: 'imps', label: 'IMPS Transfer', desc: 'Immediate Payment Service' },
              { key: 'swift', label: 'SWIFT Transfer', desc: 'International wire transfers' }
            ].map((method) => (
              <div key={method.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{method.label}</h3>
                  <p className="text-sm text-gray-600">{method.desc}</p>
                </div>
                <Switch
                  checked={paymentMethods[method.key as keyof typeof paymentMethods]}
                  onCheckedChange={() => togglePaymentMethod(method.key)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* UPI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IndianRupee className="h-5 w-5" />
            <span>UPI Configuration</span>
          </CardTitle>
          <CardDescription>Manage your UPI IDs for receiving payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upiIds.map((upi) => (
              <div key={upi.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <IndianRupee className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{upi.upiId}</p>
                    <p className="text-sm text-gray-600">{upi.provider}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {upi.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add UPI ID
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Bank Accounts</span>
          </CardTitle>
          <CardDescription>Manage your bank accounts for settlements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bankAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Building className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{account.bankName}</p>
                    <p className="text-sm text-gray-600">
                      {account.accountNumber} • {account.ifsc} • {account.accountType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {account.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full" onClick={() => setShowAddBank(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Bank Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Bank Account Form */}
      {showAddBank && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Bank Account</CardTitle>
            <CardDescription>Enter your bank account details for settlements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" placeholder="Enter bank name" />
              </div>
              <div>
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input id="accountNumber" placeholder="Enter account number" />
              </div>
              <div>
                <Label htmlFor="ifscCode">IFSC Code</Label>
                <Input id="ifscCode" placeholder="Enter IFSC code" />
              </div>
              <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Input id="accountType" placeholder="Current/Savings" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="accountHolder">Account Holder Name</Label>
                <Input id="accountHolder" placeholder="Enter account holder name" />
              </div>
            </div>
            <div className="flex space-x-3">
              <Button>Add Account</Button>
              <Button variant="outline" onClick={() => setShowAddBank(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Currency Support */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Currencies</CardTitle>
          <CardDescription>Currencies available for fiat transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { symbol: <IndianRupee className="h-5 w-5" />, code: 'INR', name: 'Indian Rupee', status: 'active' },
              { symbol: <DollarSign className="h-5 w-5" />, code: 'USD', name: 'US Dollar', status: 'active' },
              { symbol: <Euro className="h-5 w-5" />, code: 'EUR', name: 'Euro', status: 'inactive' }
            ].map((currency) => (
              <div key={currency.code} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    {currency.symbol}
                  </div>
                  <div>
                    <p className="font-medium">{currency.code}</p>
                    <p className="text-sm text-gray-600">{currency.name}</p>
                  </div>
                </div>
                <Badge className={currency.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {currency.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FiatPayments;
