"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Copy, 
  ExternalLink, 
  Bitcoin, 
  DollarSign,
  QrCode,
  Settings,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import DashboardLayout from '@/components/dashboard-layout';
import { toast } from 'sonner';

interface PaymentLink {
  id: string;
  title: string;
  amount: number;
  currency: string;
  method: 'fiat' | 'crypto';
  status: 'active' | 'expired' | 'used';
  link: string;
  createdAt: Date;
  expiresAt: Date;
  description?: string;
}

// Mock existing payment links
const mockPaymentLinks: PaymentLink[] = [
  {
    id: 'PL-001',
    title: 'Product Purchase',
    amount: 250.00,
    currency: 'USD',
    method: 'fiat',
    status: 'active',
    link: 'https://maya.pay/link/PL-001',
    createdAt: new Date('2024-01-15T10:30:00'),
    expiresAt: new Date('2024-02-15T10:30:00'),
    description: 'Payment for premium subscription'
  },
  {
    id: 'PL-002',
    title: 'Crypto Payment',
    amount: 0.01,
    currency: 'BTC',
    method: 'crypto',
    status: 'active',
    link: 'https://maya.pay/link/PL-002',
    createdAt: new Date('2024-01-14T16:45:00'),
    expiresAt: new Date('2024-02-14T16:45:00'),
    description: 'Bitcoin payment for digital goods'
  },
  {
    id: 'PL-003',
    title: 'Service Payment',
    amount: 500.00,
    currency: 'USDT',
    method: 'crypto',
    status: 'used',
    link: 'https://maya.pay/link/PL-003',
    createdAt: new Date('2024-01-13T11:20:00'),
    expiresAt: new Date('2024-02-13T11:20:00'),
  },
];

export default function PaymentLinksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>(mockPaymentLinks);
  const [activeTab, setActiveTab] = useState('create');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    currency: 'USD',
    method: 'fiat' as 'fiat' | 'crypto',
    description: '',
    expiresIn: '30' // days
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const handleCreatePaymentLink = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLink: PaymentLink = {
      id: `PL-${String(paymentLinks.length + 1).padStart(3, '0')}`,
      title: formData.title,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      method: formData.method,
      status: 'active',
      link: `https://maya.pay/link/PL-${String(paymentLinks.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + parseInt(formData.expiresIn) * 24 * 60 * 60 * 1000),
      description: formData.description || undefined
    };

    setPaymentLinks([newLink, ...paymentLinks]);
    setFormData({
      title: '',
      amount: '',
      currency: 'USD',
      method: 'fiat',
      description: '',
      expiresIn: '30'
    });
    
    toast.success('Payment link created successfully!');
    setActiveTab('manage');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'used': return 'secondary';
      case 'expired': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Links</h1>
            <p className="text-gray-600">Create and manage payment links for your customers</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create Link</TabsTrigger>
            <TabsTrigger value="manage">Manage Links</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Payment Link</CardTitle>
                <CardDescription>
                  Generate a secure payment link for both fiat and crypto payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePaymentLink} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Payment Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Product Purchase"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="method">Payment Method</Label>
                      <Select 
                        value={formData.method} 
                        onValueChange={(value: 'fiat' | 'crypto') => {
                          setFormData({
                            ...formData, 
                            method: value,
                            currency: value === 'fiat' ? 'USD' : 'BTC'
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fiat">Fiat Payment</SelectItem>
                          <SelectItem value="crypto">Crypto Payment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select 
                        value={formData.currency} 
                        onValueChange={(value) => setFormData({...formData, currency: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.method === 'fiat' ? (
                            <>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="INR">INR</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                              <SelectItem value="USDT">Tether (USDT)</SelectItem>
                              <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiresIn">Expires In (Days)</Label>
                      <Select 
                        value={formData.expiresIn} 
                        onValueChange={(value) => setFormData({...formData, expiresIn: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add a description for this payment..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full maya-gradient text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Payment Link
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Links</CardTitle>
                <CardDescription>
                  Manage your existing payment links and view their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentLinks.map((link) => (
                    <div key={link.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              link.method === 'crypto' ? 'crypto-gradient' : 'fiat-gradient'
                            }`}>
                              {link.method === 'crypto' ? (
                                <Bitcoin className="w-5 h-5 text-white" />
                              ) : (
                                <DollarSign className="w-5 h-5 text-white" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{link.title}</h3>
                              <p className="text-sm text-gray-500">
                                {link.amount} {link.currency}
                              </p>
                            </div>
                          </div>
                          
                          {link.description && (
                            <p className="text-sm text-gray-600 mb-3">{link.description}</p>
                          )}

                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>ID: {link.id}</span>
                            <span>Created: {link.createdAt.toLocaleDateString()}</span>
                            <span>Expires: {link.expiresAt.toLocaleDateString()}</span>
                          </div>

                          <div className="flex items-center space-x-2 mt-3">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                              {link.link}
                            </code>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => copyToClipboard(link.link)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <QrCode className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant={getStatusColor(link.status)}>
                            {link.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {paymentLinks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No payment links created yet. Create your first payment link to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}