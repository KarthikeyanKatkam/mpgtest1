
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Save, Globe, Mail, Palette, Check, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const MerchantBranding = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({
    domain: 'verified',
    email: 'pending',
    ssl: 'verified'
  });

  const [brandingData, setBrandingData] = useState({
    company_name: 'ItsySmile Dental Care',
    custom_domain: 'itsysmile.com',
    email_domain: 'billing@itsysmile.com',
    logo_url: '/lovable-uploads/438cf714-65a7-4c46-80ee-f10fbd5afa0d.png',
    theme_color: '#3b82f6',
    primary_color: '#3b82f6',
    secondary_color: '#1e40af',
    website: 'https://itsysmile.com',
    support_email: 'support@itsysmile.com',
    phone: '+91 98765 43210',
    address: '123 Dental Street, Healthcare City, HC 560001',
    gst_number: '27AAAAA0000A1Z5',
    footer_text: 'Thank you for choosing ItsySmile Dental Care for your oral health needs.',
    invoice_prefix: 'ISM',
    payment_page_title: 'Complete Your Payment - ItsySmile',
    payment_page_description: 'Secure payment processing for dental services'
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBrandingData(prev => ({ ...prev, logo_url: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveBrandingSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call to save branding settings
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Branding Settings Saved",
        description: "Your merchant branding has been updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save branding settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyDomain = async () => {
    setVerificationStatus(prev => ({ ...prev, domain: 'verifying' }));
    
    // Simulate domain verification
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, domain: 'verified' }));
      toast({
        title: "Domain Verified",
        description: "Your custom domain has been successfully verified"
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <Check className="h-4 w-4 text-green-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Merchant Branding</h1>
        <p className="text-gray-600 mt-2">Configure your brand identity for payment pages and invoices</p>
      </div>

      {/* Verification Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Domain & Email Verification</span>
          </CardTitle>
          <CardDescription>
            Verify your custom domain and email for white-label payment processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(verificationStatus.domain)}
                <div>
                  <p className="font-medium">Custom Domain</p>
                  <p className="text-sm text-gray-600">{brandingData.custom_domain}</p>
                </div>
              </div>
              <Badge className={getStatusColor(verificationStatus.domain)}>
                {verificationStatus.domain.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(verificationStatus.email)}
                <div>
                  <p className="font-medium">Email Domain</p>
                  <p className="text-sm text-gray-600">{brandingData.email_domain}</p>
                </div>
              </div>
              <Badge className={getStatusColor(verificationStatus.email)}>
                {verificationStatus.email.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(verificationStatus.ssl)}
                <div>
                  <p className="font-medium">SSL Certificate</p>
                  <p className="text-sm text-gray-600">HTTPS Enabled</p>
                </div>
              </div>
              <Badge className={getStatusColor(verificationStatus.ssl)}>
                {verificationStatus.ssl.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Basic company details for invoicing and payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={brandingData.company_name}
                onChange={(e) => setBrandingData(prev => ({ ...prev, company_name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst_number">GST/Tax Number</Label>
              <Input
                id="gst_number"
                value={brandingData.gst_number}
                onChange={(e) => setBrandingData(prev => ({ ...prev, gst_number: e.target.value }))}
                placeholder="e.g., 27AAAAA0000A1Z5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                value={brandingData.website}
                onChange={(e) => setBrandingData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourdomain.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={brandingData.phone}
                onChange={(e) => setBrandingData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Textarea
              id="address"
              value={brandingData.address}
              onChange={(e) => setBrandingData(prev => ({ ...prev, address: e.target.value }))}
              rows={3}
              placeholder="Complete business address"
            />
          </div>
        </CardContent>
      </Card>

      {/* Brand Identity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Brand Identity</span>
          </CardTitle>
          <CardDescription>Logo, colors, and visual branding for payment pages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Company Logo</Label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('logo')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                  {brandingData.logo_url && (
                    <img src={brandingData.logo_url} alt="Logo" className="h-12 w-auto" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoice_prefix">Invoice Prefix</Label>
                <Input
                  id="invoice_prefix"
                  value={brandingData.invoice_prefix}
                  onChange={(e) => setBrandingData(prev => ({ ...prev, invoice_prefix: e.target.value }))}
                  placeholder="e.g., ISM, INV"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary_color">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primary_color"
                      type="color"
                      value={brandingData.primary_color}
                      onChange={(e) => setBrandingData(prev => ({ ...prev, primary_color: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={brandingData.primary_color}
                      onChange={(e) => setBrandingData(prev => ({ ...prev, primary_color: e.target.value }))}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary_color">Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondary_color"
                      type="color"
                      value={brandingData.secondary_color}
                      onChange={(e) => setBrandingData(prev => ({ ...prev, secondary_color: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={brandingData.secondary_color}
                      onChange={(e) => setBrandingData(prev => ({ ...prev, secondary_color: e.target.value }))}
                      placeholder="#1e40af"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="footer_text">Invoice Footer Text</Label>
                <Textarea
                  id="footer_text"
                  value={brandingData.footer_text}
                  onChange={(e) => setBrandingData(prev => ({ ...prev, footer_text: e.target.value }))}
                  rows={2}
                  placeholder="Thank you message for invoices"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Domain Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Custom Domain Setup</span>
          </CardTitle>
          <CardDescription>Configure your custom domains for payment pages and emails</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="custom_domain">Payment Page Domain</Label>
              <Input
                id="custom_domain"
                value={brandingData.custom_domain}
                onChange={(e) => setBrandingData(prev => ({ ...prev, custom_domain: e.target.value }))}
                placeholder="pay.yourdomain.com"
              />
              <p className="text-sm text-gray-600">
                Customers will see this domain during payment
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email_domain">Invoice Email Domain</Label>
              <Input
                id="email_domain"
                value={brandingData.email_domain}
                onChange={(e) => setBrandingData(prev => ({ ...prev, email_domain: e.target.value }))}
                placeholder="billing@yourdomain.com"
              />
              <p className="text-sm text-gray-600">
                Invoices will be sent from this email address
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="payment_page_title">Payment Page Title</Label>
              <Input
                id="payment_page_title"
                value={brandingData.payment_page_title}
                onChange={(e) => setBrandingData(prev => ({ ...prev, payment_page_title: e.target.value }))}
                placeholder="Complete Your Payment"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support_email">Support Email</Label>
              <Input
                id="support_email"
                value={brandingData.support_email}
                onChange={(e) => setBrandingData(prev => ({ ...prev, support_email: e.target.value }))}
                placeholder="support@yourdomain.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_page_description">Payment Page Description</Label>
            <Textarea
              id="payment_page_description"
              value={brandingData.payment_page_description}
              onChange={(e) => setBrandingData(prev => ({ ...prev, payment_page_description: e.target.value }))}
              rows={2}
              placeholder="Description shown on payment pages"
            />
          </div>
        </CardContent>
      </Card>

      {/* DNS Configuration Instructions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">DNS Configuration Required</CardTitle>
          <CardDescription className="text-blue-700">
            Add these DNS records to your domain to enable custom branding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-blue-900 mb-2">Payment Page (CNAME)</h4>
              <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                pay.{brandingData.custom_domain} → payments.maya.exchange
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-blue-900 mb-2">Email Verification (TXT)</h4>
              <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                maya-verify=abc123def456...
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-medium text-blue-900 mb-2">Email SPF (TXT)</h4>
              <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                v=spf1 include:maya.exchange ~all
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={verifyDomain}>
          <Globe className="h-4 w-4 mr-2" />
          Verify Domain
        </Button>
        <Button onClick={saveBrandingSettings} disabled={loading} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Branding Settings'}
        </Button>
      </div>
    </div>
  );
};

export default MerchantBranding;
