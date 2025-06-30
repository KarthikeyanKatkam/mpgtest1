
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  company_name?: string;
  company_logo?: string;
  company_address?: string;
  invoice_number: string;
}

interface InvoiceTemplateProps {
  invoice: InvoiceData;
  isPreview?: boolean;
}

const InvoiceTemplate = ({ invoice, isPreview = false }: InvoiceTemplateProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-4">
            {invoice.company_logo && (
              <img 
                src={invoice.company_logo} 
                alt="Company Logo" 
                className="h-16 w-auto"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {invoice.company_name || 'Your Company'}
              </h1>
              {invoice.company_address && (
                <p className="text-gray-600">{invoice.company_address}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h2>
            <p className="text-gray-600">#{invoice.invoice_number}</p>
            <Badge className={getStatusColor(invoice.status)}>
              {invoice.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill To:</h3>
            <div className="text-gray-700">
              <p className="font-medium">{invoice.customer_name}</p>
              <p>{invoice.customer_email}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details:</h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Issue Date:</span> {invoice.created_date}</p>
              <p><span className="font-medium">Due Date:</span> {invoice.due_date}</p>
              <p><span className="font-medium">Currency:</span> {invoice.currency}</p>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="border-t border-gray-200 pt-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-semibold text-gray-900">Description</th>
                <th className="text-right py-3 font-semibold text-gray-900">Quantity</th>
                <th className="text-right py-3 font-semibold text-gray-900">Rate</th>
                <th className="text-right py-3 font-semibold text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 text-gray-700">{invoice.description}</td>
                <td className="py-4 text-right text-gray-700">1</td>
                <td className="py-4 text-right text-gray-700">
                  {invoice.currency === 'INR' ? '₹' : invoice.currency === 'USD' ? '$' : '€'}
                  {invoice.amount.toLocaleString()}
                </td>
                <td className="py-4 text-right font-semibold text-gray-900">
                  {invoice.currency === 'INR' ? '₹' : invoice.currency === 'USD' ? '$' : '€'}
                  {invoice.amount.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mt-8 text-right">
          <div className="inline-block">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">
                  {invoice.currency === 'INR' ? '₹' : invoice.currency === 'USD' ? '$' : '€'}
                  {invoice.amount.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {invoice.currency === 'INR' ? '₹' : invoice.currency === 'USD' ? '$' : '€'}
                    {invoice.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        {!isPreview && invoice.status !== 'paid' && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Payment Instructions</h4>
            <p className="text-blue-800 text-sm">
              Please make payment by the due date. You can pay online using the payment link provided via email.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>Thank you for your business!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceTemplate;
