
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, CreditCard, Smartphone, Bitcoin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PaymentLinkData {
  amount: number;
  currency: string;
  description: string;
  customer_email?: string;
  custom_domain?: string;
  merchant_id: string;
}

const PaymentLinkGenerator = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedLinks, setGeneratedLinks] = useState<{
    standard: string;
    upi: string;
    crypto: string;
    custom_domain: string;
  } | null>(null);

  const [linkData, setLinkData] = useState<PaymentLinkData>({
    amount: 1000,
    currency: 'INR',
    description: 'Payment for services',
    customer_email: '',
    custom_domain: 'pay.itsysmile.com',
    merchant_id: 'merchant_123'
  });

  const generatePaymentLinks = async () => {
    setLoading(true);
    try {
      // Simulate API call to generate payment links
      const linkId = `link_${Date.now()}`;
      
      const links = {
        standard: `https://payments.maya.exchange/pay/${linkId}`,
        upi: `upi://pay?pa=maya@upi&pn=Maya%20Payments&am=${linkData.amount}&cu=${linkData.currency}&tr=${linkId}`,
        crypto: `https://crypto.maya.exchange/pay/${linkId}`,
        custom_domain: `https://${linkData.custom_domain}/pay/${linkId}`
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setGeneratedLinks(links);
      
      toast({
        title: "Payment Links Generated",
        description: "All payment links have been generated successfully"
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate payment links",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} payment link copied to clipboard`
    });
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6" />
          <span>Payment Link Generator</span>
        </CardTitle>
        <CardDescription>
          Generate branded payment links for your merchant account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Link Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={linkData.amount}
              onChange={(e) => setLinkData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
              placeholder="Enter amount"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              value={linkData.currency}
              onChange={(e) => setLinkData(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={linkData.description}
              onChange={(e) => setLinkData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Payment description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom_domain">Custom Domain</Label>
            <Input
              id="custom_domain"
              value={linkData.custom_domain}
              onChange={(e) => setLinkData(prev => ({ ...prev, custom_domain: e.target.value }))}
              placeholder="pay.yourdomain.com"
            />
          </div>
        </div>

        <Button onClick={generatePaymentLinks} disabled={loading} className="w-full">
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating Links...
            </>
          ) : (
            'Generate Payment Links'
          )}
        </Button>

        {/* Generated Links */}
        {generatedLinks && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Generated Payment Links</h3>
            
            {/* Standard Payment Link */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium">Standard Payment Link</h4>
                      <p className="text-sm text-gray-600">All payment methods</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generatedLinks.standard, 'Standard')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openLink(generatedLinks.standard)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm font-mono break-all">
                  {generatedLinks.standard}
                </div>
              </CardContent>
            </Card>

            {/* UPI Payment Link */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium">UPI Payment Link</h4>
                      <p className="text-sm text-gray-600">Direct UPI payment</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generatedLinks.upi, 'UPI')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openLink(generatedLinks.upi)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm font-mono break-all">
                  {generatedLinks.upi}
                </div>
              </CardContent>
            </Card>

            {/* Crypto Payment Link */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bitcoin className="h-5 w-5 text-orange-600" />
                    <div>
                      <h4 className="font-medium">Crypto Payment Link</h4>
                      <p className="text-sm text-gray-600">BTC, ETH, USDT supported</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generatedLinks.crypto, 'Crypto')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openLink(generatedLinks.crypto)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm font-mono break-all">
                  {generatedLinks.crypto}
                </div>
              </CardContent>
            </Card>

            {/* Custom Domain Link */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="h-5 w-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium">Custom Domain Link</h4>
                      <p className="text-sm text-gray-600">Branded payment page</p>
                    </div>
                    <Badge variant="secondary">Pro</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generatedLinks.custom_domain, 'Custom Domain')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openLink(generatedLinks.custom_domain)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm font-mono break-all">
                  {generatedLinks.custom_domain}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Integration Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-blue-900 mb-2">Integration Notes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Payment links automatically trigger invoice generation upon successful payment</li>
              <li>• Invoices are sent from your custom domain email (e.g., billing@yourdomain.com)</li>
              <li>• All payment methods support webhook notifications for real-time updates</li>
              <li>• Custom domain links require DNS configuration in your domain settings</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default PaymentLinkGenerator;
