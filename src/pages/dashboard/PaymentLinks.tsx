
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Link, Eye, Copy, MoreVertical, TrendingUp } from 'lucide-react';
import PaymentLinkGenerator from "@/components/invoice/PaymentLinkGenerator";
import { useToast } from "@/hooks/use-toast";

interface PaymentLink {
  id: string;
  title: string;
  amount: number;
  currency: string;
  status: 'active' | 'expired' | 'disabled';
  created_date: string;
  clicks: number;
  conversions: number;
  url: string;
}

const PaymentLinks = () => {
  const { toast } = useToast();
  const [showGenerator, setShowGenerator] = useState(false);
  const [paymentLinks] = useState<PaymentLink[]>([
    {
      id: 'link_001',
      title: 'Dental Consultation Fee',
      amount: 1500,
      currency: 'INR',
      status: 'active',
      created_date: '2024-01-15',
      clicks: 45,
      conversions: 12,
      url: 'https://pay.itsysmile.com/pay/link_001'
    },
    {
      id: 'link_002',
      title: 'Teeth Cleaning Service',
      amount: 2500,
      currency: 'INR',
      status: 'active',
      created_date: '2024-01-10',
      clicks: 67,
      conversions: 23,
      url: 'https://pay.itsysmile.com/pay/link_002'
    },
    {
      id: 'link_003',
      title: 'Orthodontic Treatment',
      amount: 25000,
      currency: 'INR',
      status: 'disabled',
      created_date: '2024-01-05',
      clicks: 12,
      conversions: 3,
      url: 'https://pay.itsysmile.com/pay/link_003'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'disabled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyLink = (url: string, title: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: `Payment link for "${title}" copied to clipboard`
    });
  };

  const getConversionRate = (clicks: number, conversions: number) => {
    if (clicks === 0) return 0;
    return ((conversions / clicks) * 100).toFixed(1);
  };

  if (showGenerator) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Payment Link</h1>
            <p className="text-gray-600 mt-2">Generate a new payment link for your services</p>
          </div>
          <Button variant="outline" onClick={() => setShowGenerator(false)}>
            Back to Links
          </Button>
        </div>
        <PaymentLinkGenerator />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Links</h1>
          <p className="text-gray-600 mt-2">Create and manage payment links for your business</p>
        </div>
        <Button onClick={() => setShowGenerator(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Payment Link
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Links</p>
                <p className="text-2xl font-bold">{paymentLinks.length}</p>
              </div>
              <Link className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold">{paymentLinks.reduce((sum, link) => sum + link.clicks, 0)}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversions</p>
                <p className="text-2xl font-bold">{paymentLinks.reduce((sum, link) => sum + link.conversions, 0)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Conversion</p>
                <p className="text-2xl font-bold">
                  {getConversionRate(
                    paymentLinks.reduce((sum, link) => sum + link.clicks, 0),
                    paymentLinks.reduce((sum, link) => sum + link.conversions, 0)
                  )}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Links Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Payment Links</CardTitle>
          <CardDescription>Manage and monitor your payment link performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Link Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Rate</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paymentLinks.map((link) => (
                  <tr key={link.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{link.title}</p>
                        <p className="text-sm text-gray-500">{link.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium">
                        {link.currency === 'INR' ? '₹' : '$'}{link.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(link.status)}>
                        {link.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{link.clicks}</td>
                    <td className="py-3 px-4 text-gray-700">{link.conversions}</td>
                    <td className="py-3 px-4">
                      <span className="text-green-600 font-medium">
                        {getConversionRate(link.clicks, link.conversions)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(link.created_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyLink(link.url, link.title)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(link.url, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Integration Instructions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Integration Instructions</CardTitle>
          <CardDescription className="text-blue-700">
            How to integrate payment links with automatic invoicing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-blue-800">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-medium">Embed payment links on your website</h4>
                <p className="text-sm text-blue-700">Add payment buttons or links directly to your product pages</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-medium">Automatic invoice generation</h4>
                <p className="text-sm text-blue-700">Upon successful payment, invoices are automatically generated and sent</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-medium">Branded email dispatch</h4>
                <p className="text-sm text-blue-700">Invoices are sent from your custom domain email with your branding</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentLinks;
