
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, Save, Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  taxApplicable: boolean;
}

const InvoiceSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    taxApplicable: true
  });

  const [businessInfo, setBusinessInfo] = useState({
    companyName: '',
    gstNumber: '',
    address: '',
    email: '',
    phone: '',
    website: '',
    logoUrl: '',
    themeColor: '#3b82f6'
  });

  const [invoiceDefaults, setInvoiceDefaults] = useState({
    defaultCurrency: 'INR',
    taxRate: 18,
    paymentTerms: 'Net 30',
    footerNote: 'Thank you for your business!'
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBusinessInfo(prev => ({ ...prev, logoUrl: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required product fields",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      ...newProduct,
      id: Date.now().toString()
    };

    setProducts(prev => [...prev, product]);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      taxApplicable: true
    });

    toast({
      title: "Success",
      description: "Product added to catalog"
    });
  };

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Product removed from catalog"
    });
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Invoice settings saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Invoice Settings</h1>
        <p className="text-gray-600 mt-2">Configure your business information and invoice preferences</p>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Set up your company details for invoices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={businessInfo.companyName}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="Maya Payments Gateway"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gstNumber">GST/Tax ID</Label>
              <Input
                id="gstNumber"
                value={businessInfo.gstNumber}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, gstNumber: e.target.value }))}
                placeholder="GSTIN or Tax ID"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Textarea
              id="address"
              value={businessInfo.address}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Complete business address"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={businessInfo.email}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="business@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={businessInfo.phone}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={businessInfo.website}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://company.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {businessInfo.logoUrl && (
                  <img src={businessInfo.logoUrl} alt="Logo" className="h-12 w-auto" />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="themeColor">Brand Theme Color</Label>
              <Input
                id="themeColor"
                type="color"
                value={businessInfo.themeColor}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, themeColor: e.target.value }))}
                className="w-20 h-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Defaults */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Defaults</CardTitle>
          <CardDescription>Set default values for new invoices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Select value={invoiceDefaults.defaultCurrency} onValueChange={(value) => setInvoiceDefaults(prev => ({ ...prev, defaultCurrency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={invoiceDefaults.taxRate}
                onChange={(e) => setInvoiceDefaults(prev => ({ ...prev, taxRate: parseFloat(e.target.value) }))}
                placeholder="18"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select value={invoiceDefaults.paymentTerms} onValueChange={(value) => setInvoiceDefaults(prev => ({ ...prev, paymentTerms: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                  <SelectItem value="Net 7">Net 7 Days</SelectItem>
                  <SelectItem value="Net 15">Net 15 Days</SelectItem>
                  <SelectItem value="Net 30">Net 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="footerNote">Footer Note</Label>
            <Textarea
              id="footerNote"
              value={invoiceDefaults.footerNote}
              onChange={(e) => setInvoiceDefaults(prev => ({ ...prev, footerNote: e.target.value }))}
              placeholder="Thank you for your business!"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Product Catalog */}
      <Card>
        <CardHeader>
          <CardTitle>Product/Service Catalog</CardTitle>
          <CardDescription>Manage your products and services for quick invoice creation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Product */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium mb-4">Add New Product/Service</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                placeholder="Product/Service Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Description (optional)"
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Unit Price"
                value={newProduct.price || ''}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              />
              <div className="flex items-center space-x-2">
                <Button onClick={addProduct} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Product List */}
          {products.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Saved Products/Services</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Description</th>
                      <th className="text-right p-3 font-medium">Price</th>
                      <th className="text-center p-3 font-medium">Tax</th>
                      <th className="text-center p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t">
                        <td className="p-3 font-medium">{product.name}</td>
                        <td className="p-3 text-gray-600">{product.description || '-'}</td>
                        <td className="p-3 text-right">
                          {invoiceDefaults.defaultCurrency === 'INR' ? '₹' : 
                           invoiceDefaults.defaultCurrency === 'USD' ? '$' : 
                           invoiceDefaults.defaultCurrency === 'EUR' ? '€' : '₹'}
                          {product.price.toLocaleString()}
                        </td>
                        <td className="p-3 text-center">
                          {product.taxApplicable ? '✓' : '-'}
                        </td>
                        <td className="p-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} disabled={loading} size="lg">
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
};

export default InvoiceSettings;
