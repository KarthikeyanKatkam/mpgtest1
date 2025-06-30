
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface PaymentWebhookData {
  payment_id: string;
  merchant_id: string;
  customer_email: string;
  customer_name: string;
  amount: number;
  currency: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
    description?: string;
  }>;
  payment_status: 'success' | 'failed' | 'pending';
  order_id: string;
}

interface MerchantBranding {
  company_name: string;
  logo_url: string;
  theme_color: string;
  custom_domain: string;
  email_domain: string;
  gst_number?: string;
  address: string;
  phone: string;
  website: string;
}

const AutoInvoiceService = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate webhook listener for payment success
  useEffect(() => {
    const handlePaymentWebhook = async (webhookData: PaymentWebhookData) => {
      if (webhookData.payment_status === 'success') {
        await generateAndSendInvoice(webhookData);
      }
    };

    // This would be replaced with actual webhook listener
    const mockWebhookListener = () => {
      console.log('Webhook listener initialized for automated invoice generation');
    };

    mockWebhookListener();
  }, []);

  const generateAndSendInvoice = async (paymentData: PaymentWebhookData) => {
    setIsProcessing(true);
    try {
      // 1. Fetch merchant branding settings
      const merchantBranding = await fetchMerchantBranding(paymentData.merchant_id);
      
      // 2. Generate invoice number
      const invoiceNumber = `INV-${Date.now()}-${paymentData.order_id}`;
      
      // 3. Create invoice data
      const invoiceData = {
        id: `inv_${Date.now()}`,
        invoice_number: invoiceNumber,
        customer_name: paymentData.customer_name,
        customer_email: paymentData.customer_email,
        amount: paymentData.amount,
        currency: paymentData.currency,
        status: 'paid',
        due_date: new Date().toISOString().split('T')[0],
        created_date: new Date().toISOString().split('T')[0],
        description: 'Purchase from ' + merchantBranding.company_name,
        company_name: merchantBranding.company_name,
        company_logo: merchantBranding.logo_url,
        company_address: merchantBranding.address,
        theme_color: merchantBranding.theme_color,
        items: paymentData.products,
        payment_id: paymentData.payment_id
      };

      // 4. Generate PDF invoice
      await generateInvoicePDF(invoiceData, merchantBranding);
      
      // 5. Send branded email from merchant's domain
      await sendBrandedInvoiceEmail(invoiceData, merchantBranding);
      
      // 6. Store invoice in database
      await storeInvoiceRecord(invoiceData);

      toast({
        title: "Invoice Generated Successfully",
        description: `Invoice ${invoiceNumber} sent to ${paymentData.customer_email} from ${merchantBranding.email_domain}`
      });

    } catch (error) {
      console.error('Error generating automated invoice:', error);
      toast({
        title: "Invoice Generation Failed",
        description: "Failed to generate automated invoice. Please check logs.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchMerchantBranding = async (merchantId: string): Promise<MerchantBranding> => {
    // Simulate API call to fetch merchant branding settings
    const mockBranding: MerchantBranding = {
      company_name: 'ItsySmile Dental Care',
      logo_url: '/lovable-uploads/438cf714-65a7-4c46-80ee-f10fbd5afa0d.png',
      theme_color: '#3b82f6',
      custom_domain: 'itsysmile.com',
      email_domain: 'billing@itsysmile.com',
      gst_number: '27AAAAA0000A1Z5',
      address: '123 Dental Street, Healthcare City, HC 560001',
      phone: '+91 98765 43210',
      website: 'https://itsysmile.com'
    };
    
    return new Promise(resolve => {
      setTimeout(() => resolve(mockBranding), 500);
    });
  };

  const generateInvoicePDF = async (invoiceData: any, branding: MerchantBranding) => {
    // This would integrate with PDF generation service
    console.log('Generating PDF with merchant branding:', {
      invoice: invoiceData.invoice_number,
      company: branding.company_name,
      theme: branding.theme_color
    });
    
    // Simulate PDF generation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const sendBrandedInvoiceEmail = async (invoiceData: any, branding: MerchantBranding) => {
    const emailData = {
      from: branding.email_domain,
      to: invoiceData.customer_email,
      subject: `Invoice ${invoiceData.invoice_number} from ${branding.company_name}`,
      html: generateInvoiceEmailHTML(invoiceData, branding),
      attachments: [{
        filename: `Invoice-${invoiceData.invoice_number}.pdf`,
        content: 'base64_pdf_content_here'
      }]
    };

    // This would integrate with email service (SendGrid, AWS SES, etc.)
    console.log('Sending branded email from:', emailData.from, 'to:', emailData.to);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 800));
  };

  const generateInvoiceEmailHTML = (invoiceData: any, branding: MerchantBranding) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: ${branding.theme_color}; padding: 20px; text-align: center;">
          <img src="${branding.logo_url}" alt="${branding.company_name}" style="height: 60px;">
          <h2 style="color: white; margin: 10px 0;">Invoice from ${branding.company_name}</h2>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h3>Invoice #${invoiceData.invoice_number}</h3>
          <p><strong>Dear ${invoiceData.customer_name},</strong></p>
          <p>Thank you for your purchase! Your payment has been successfully processed.</p>
          
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h4>Payment Details:</h4>
            <p>Amount: ${invoiceData.currency} ${invoiceData.amount.toLocaleString()}</p>
            <p>Status: <span style="color: green; font-weight: bold;">PAID</span></p>
            <p>Date: ${invoiceData.created_date}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://${branding.custom_domain}/invoice/${invoiceData.id}" 
               style="background-color: ${branding.theme_color}; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              View Invoice Online
            </a>
          </div>
          
          <p>Best regards,<br>
          ${branding.company_name}<br>
          ${branding.phone}<br>
          ${branding.website}</p>
        </div>
      </div>
    `;
  };

  const storeInvoiceRecord = async (invoiceData: any) => {
    // This would store the invoice in the database
    console.log('Storing invoice record:', invoiceData.invoice_number);
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isProcessing && (
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Generating Invoice...</span>
        </div>
      )}
    </div>
  );
};

export default AutoInvoiceService;
