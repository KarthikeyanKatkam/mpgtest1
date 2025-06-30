import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, CreditCard, Smartphone } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import InvoiceTemplate from "@/components/InvoiceTemplate";

interface InvoiceData {
  id: string;
  customer_name: string;
  customer_email: string;
  amount: number;
  currency: string;
  status: string;
  due_date: string;
  created_date: string;
  description: string;
  company_name: string;
  company_logo: string;
  company_address: string;
  invoice_number: string;
  theme_color: string;
}

const PublicInvoice = () => {
  const { invoiceId } = useParams();
  const { toast } = useToast();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch invoice
    const fetchInvoice = async () => {
      try {
        // Mock data - replace with actual API call
        const mockInvoice: InvoiceData = {
          id: invoiceId || '1',
          customer_name: 'John Doe',
          customer_email: 'john@example.com',
          amount: 25000,
          currency: 'INR',
          status: 'pending',
          due_date: '2024-02-15',
          created_date: '2024-01-15',
          description: 'Web Development Services',
          company_name: 'TechCorp Solutions',
          company_logo: '/lovable-uploads/438cf714-65a7-4c46-80ee-f10fbd5afa0d.png',
          company_address: '123 Business Street, Tech City, TC 12345',
          invoice_number: 'INV-001',
          theme_color: '#3b82f6'
        };

        setTimeout(() => {
          setInvoice(mockInvoice);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  const handleDownloadPDF = () => {
    toast({
      title: "Download Started",
      description: "Your invoice PDF is being generated and will download shortly."
    });
    // Implement PDF generation and download
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePayNow = async (paymentMethod: 'card' | 'upi' | 'crypto') => {
    setPaymentLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate payment link based on method
      let paymentUrl = '';
      switch (paymentMethod) {
        case 'card':
          paymentUrl = `https://payments.maya.exchange/card/${invoiceId}`;
          break;
        case 'upi':
          paymentUrl = `https://payments.maya.exchange/upi/${invoiceId}`;
          break;
        case 'crypto':
          paymentUrl = `https://payments.maya.exchange/crypto/${invoiceId}`;
          break;
      }

      // Open payment in new tab
      window.open(paymentUrl, '_blank');
      
      toast({
        title: "Payment Initiated",
        description: `Redirecting to ${paymentMethod.toUpperCase()} payment gateway...`
      });
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice Not Found</h2>
            <p className="text-gray-600">The invoice you're looking for doesn't exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isPaid = invoice.status === 'paid';
  const isOverdue = invoice.status === 'overdue';

  return (
    <div className="min-h-screen bg-gray-50 py-8" style={{ accentColor: invoice.theme_color }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoice {invoice.invoice_number}</h1>
            <p className="text-gray-600">From {invoice.company_name}</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            {!isPaid && (
              <div className="flex gap-2">
                <Button 
                  onClick={() => handlePayNow('card')}
                  disabled={paymentLoading}
                  style={{ backgroundColor: invoice.theme_color }}
                  className="text-white hover:opacity-90"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay with Card
                </Button>
                <Button 
                  onClick={() => handlePayNow('upi')}
                  disabled={paymentLoading}
                  variant="outline"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Pay with UPI
                </Button>
                <Button 
                  onClick={() => handlePayNow('crypto')}
                  disabled={paymentLoading}
                  variant="outline"
                >
                  ₿ Pay with Crypto
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Payment Status Alert */}
        {!isPaid && (
          <Card className={`mb-8 border-l-4 ${isOverdue ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold ${isOverdue ? 'text-red-800' : 'text-yellow-800'}`}>
                    {isOverdue ? 'Payment Overdue' : 'Payment Pending'}
                  </h3>
                  <p className={`text-sm ${isOverdue ? 'text-red-600' : 'text-yellow-600'}`}>
                    {isOverdue 
                      ? `This invoice was due on ${new Date(invoice.due_date).toLocaleDateString()}`
                      : `Payment is due by ${new Date(invoice.due_date).toLocaleDateString()}`
                    }
                  </p>
                </div>
                <Badge className={isOverdue ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                  {invoice.status.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {isPaid && (
          <Card className="mb-8 border-l-4 border-green-500 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800">Payment Completed</h3>
                  <p className="text-sm text-green-600">
                    Thank you! This invoice has been paid in full.
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  PAID
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invoice Template */}
        <div className="print:shadow-none">
          <InvoiceTemplate invoice={invoice} />
        </div>

        {/* Payment Methods (Mobile Optimized) */}
        {!isPaid && (
          <Card className="mt-8 sm:hidden">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Payment Options</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => handlePayNow('card')}
                  disabled={paymentLoading}
                  className="w-full"
                  style={{ backgroundColor: invoice.theme_color }}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay with Credit/Debit Card
                </Button>
                <Button 
                  onClick={() => handlePayNow('upi')}
                  disabled={paymentLoading}
                  variant="outline"
                  className="w-full"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Pay with UPI
                </Button>
                <Button 
                  onClick={() => handlePayNow('crypto')}
                  disabled={paymentLoading}
                  variant="outline"
                  className="w-full"
                >
                  ₿ Pay with Cryptocurrency
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm print:hidden">
          <p>This is a computer-generated invoice from {invoice.company_name}</p>
          <p className="mt-1">For support, contact {invoice.company_name} directly</p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { margin: 0; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
};

export default PublicInvoice;
