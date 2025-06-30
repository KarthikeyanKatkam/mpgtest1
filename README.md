
# Maya Payments Gateway - Complete White-Label Invoice & Payment System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)

Maya Payments Gateway is a comprehensive, production-ready white-label invoice management and payment processing system built with modern web technologies. This system enables businesses to create, manage, and send fully branded invoices with integrated payment processing across multiple currencies and payment methods.

## 🚀 Features Overview

### Core Invoice Management
- **Complete Invoice Lifecycle**: Create, edit, send, track, and manage invoices from creation to payment
- **White-Label Branding**: Fully customizable with merchant's logo, colors, and branding elements
- **Multi-Currency Support**: Support for INR, USD, EUR, GBP with proper currency symbols and formatting
- **Professional PDF Generation**: High-quality invoice PDFs with merchant branding and customizable templates
- **Email Dispatch System**: Send invoices from merchant's custom domain with branded email templates
- **Payment Integration**: Comprehensive support for cards, UPI, bank transfers, and cryptocurrency payments
- **Real-time Status Tracking**: Live updates on payment status, delivery confirmation, and customer interactions

### Advanced Dashboard Features
- **Invoice Settings Management**: Configure business information, branding, tax settings, and payment terms
- **Product Catalog**: Comprehensive product/service management for quick invoice creation
- **Invoice Dashboard**: Advanced search, filtering, sorting, and bulk operations for invoice management
- **Customer Management**: Store and manage customer information with interaction history
- **Analytics & Reporting**: Detailed insights into payment trends, customer behavior, and business metrics
- **Public Invoice Viewer**: Customer-facing invoice view with seamless payment options
- **Automated Reminders**: Configurable email reminders for pending and overdue invoices

### Payment Methods & Processing
- **Fiat Payment Methods**: UPI, NEFT, RTGS, IMPS, SWIFT wire transfers
- **Card Processing**: Visa, Mastercard, American Express, RuPay with PCI compliance
- **Digital Wallets**: Google Pay, PhonePe, Paytm, PayPal integration
- **Cryptocurrency**: Bitcoin, Ethereum, USDT, and other major cryptocurrencies
- **Bank Integration**: Direct bank account verification and instant payment confirmation
- **International Payments**: SWIFT integration for global B2B transactions

### Security & Compliance
- **PCI DSS Compliance**: Full compliance with payment card industry standards
- **Data Encryption**: End-to-end encryption for all sensitive data transmission and storage
- **Fraud Prevention**: Advanced algorithms for transaction monitoring and risk assessment
- **GDPR Compliance**: Full compliance with European data protection regulations
- **Multi-factor Authentication**: Enhanced security for merchant dashboard access
- **Audit Trails**: Comprehensive logging of all system activities and transactions

## 📁 Project Architecture

```
maya-payments-gateway/
├── src/
│   ├── components/
│   │   ├── ui/                      # Shadcn UI components
│   │   ├── invoice/                 # Invoice-specific components
│   │   ├── layouts/                 # Layout components
│   │   └── ProtectedRoute.tsx       # Authentication wrapper
│   ├── contexts/
│   │   └── AuthContext.tsx          # Authentication context
│   ├── hooks/
│   │   ├── useAuth.tsx              # Authentication hook
│   │   └── use-toast.ts             # Toast notifications
│   ├── integrations/
│   │   └── supabase/                # Supabase integration
│   │       ├── client.ts            # Supabase client configuration
│   │       └── types.ts             # Generated database types
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── pages/
│   │   ├── dashboard/               # Protected dashboard pages
│   │   │   ├── Overview.tsx         # Dashboard overview
│   │   │   ├── InvoiceSettings.tsx  # Business configuration
│   │   │   ├── CreateInvoice.tsx    # Invoice creation form
│   │   │   ├── InvoicesDashboard.tsx # Invoice management
│   │   │   ├── PaymentLinks.tsx     # Payment link generator
│   │   │   ├── Transactions.tsx     # Transaction history
│   │   │   ├── APIKeys.tsx          # API key management
│   │   │   └── Settings.tsx         # Account settings
│   │   ├── docs/                    # Documentation pages
│   │   ├── Index.tsx                # Landing page
│   │   ├── Login.tsx                # Authentication page
│   │   ├── PublicInvoice.tsx        # Customer invoice view
│   │   └── ...                      # Other public pages
│   ├── styles/
│   │   └── globals.css              # Global styles
│   └── main.tsx                     # Application entry point
├── supabase/
│   ├── config.toml                  # Supabase configuration
│   ├── migrations/                  # Database migrations
│   ├── functions/                   # Edge functions
│   └── seed.sql                     # Database seeding
├── public/
│   ├── lovable-uploads/             # Uploaded assets
│   └── ...                          # Static assets
├── docs/                            # Additional documentation
├── .env.example                     # Environment variables template
├── package.json                     # Dependencies and scripts
├── tailwind.config.ts               # Tailwind CSS configuration
├── vite.config.ts                   # Vite configuration
└── README.md                        # This file
```

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18.x**: Modern React with hooks and concurrent features
- **TypeScript 5.x**: Full type safety and enhanced developer experience
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn/UI**: High-quality, accessible React components
- **React Router**: Declarative routing for single-page applications
- **React Query**: Powerful data synchronization and state management
- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation library

### Backend & Database
- **Supabase**: Complete backend-as-a-service platform
- **PostgreSQL**: Robust relational database with advanced features
- **Supabase Auth**: Built-in authentication with multiple providers
- **Row Level Security**: Database-level security policies
- **Real-time Subscriptions**: Live data updates across clients
- **Edge Functions**: Serverless functions for custom backend logic
- **Supabase Storage**: File storage with CDN capabilities

### Development & Deployment
- **ESLint**: Code linting and quality enforcement
- **Prettier**: Code formatting and consistency
- **TypeScript Strict Mode**: Enhanced type checking
- **Hot Module Replacement**: Instant development feedback
- **Code Splitting**: Optimized bundle sizes
- **Progressive Web App**: Offline capabilities and native-like experience

## 🗄️ Database Schema & Design

### Core Tables Structure

#### Merchants Table
Stores merchant/business information and branding settings.

```sql
CREATE TABLE public.merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  business_type TEXT CHECK (business_type IN ('individual', 'sole_proprietorship', 'partnership', 'private_limited', 'public_limited', 'llp')),
  gst_number TEXT UNIQUE,
  pan_number TEXT,
  address JSONB NOT NULL DEFAULT '{}',
  contact_info JSONB NOT NULL DEFAULT '{}',
  banking_details JSONB DEFAULT '{}',
  logo_url TEXT,
  theme_settings JSONB DEFAULT '{"primary_color": "#3b82f6", "secondary_color": "#1e40af"}',
  default_currency TEXT DEFAULT 'INR' CHECK (default_currency IN ('INR', 'USD', 'EUR', 'GBP')),
  tax_settings JSONB DEFAULT '{"default_rate": 18.0, "tax_inclusive": false}',
  payment_terms JSONB DEFAULT '{"due_days": 30, "late_fee_rate": 2.0}',
  notification_settings JSONB DEFAULT '{"email_enabled": true, "sms_enabled": false}',
  business_hours JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  subscription_plan TEXT DEFAULT 'basic' CHECK (subscription_plan IN ('basic', 'professional', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Products/Services Catalog
Comprehensive product and service management.

```sql
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  sku TEXT,
  price_tiers JSONB DEFAULT '[]', -- Support for volume-based pricing
  base_price DECIMAL(15,2) NOT NULL,
  cost_price DECIMAL(15,2),
  tax_applicable BOOLEAN DEFAULT true,
  tax_rate DECIMAL(5,2),
  unit_of_measurement TEXT DEFAULT 'piece',
  inventory_tracking BOOLEAN DEFAULT false,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_alert INTEGER DEFAULT 10,
  images JSONB DEFAULT '[]',
  product_type TEXT DEFAULT 'physical' CHECK (product_type IN ('physical', 'digital', 'service')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discontinued')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Advanced Invoice System
Comprehensive invoice management with support for complex business scenarios.

```sql
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL,
  invoice_series TEXT DEFAULT 'INV',
  customer_info JSONB NOT NULL, -- Flexible customer data storage
  billing_address JSONB NOT NULL,
  shipping_address JSONB,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  payment_terms TEXT,
  
  -- Financial fields
  subtotal DECIMAL(15,2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(15,2) DEFAULT 0,
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  shipping_cost DECIMAL(15,2) DEFAULT 0,
  total_amount DECIMAL(15,2) NOT NULL,
  paid_amount DECIMAL(15,2) DEFAULT 0,
  outstanding_amount DECIMAL(15,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
  
  currency TEXT DEFAULT 'INR' CHECK (currency IN ('INR', 'USD', 'EUR', 'GBP')),
  exchange_rate DECIMAL(10,4) DEFAULT 1.0,
  
  -- Status and workflow
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'sent', 'viewed', 'paid', 'partially_paid', 'overdue', 'cancelled', 'refunded')),
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partially_paid', 'paid', 'overpaid', 'refunded')),
  
  -- Communication tracking
  email_sent_at TIMESTAMP WITH TIME ZONE,
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  reminder_count INTEGER DEFAULT 0,
  last_reminder_sent TIMESTAMP WITH TIME ZONE,
  
  -- Additional metadata
  notes TEXT,
  terms_and_conditions TEXT,
  custom_fields JSONB DEFAULT '{}',
  attachments JSONB DEFAULT '[]',
  
  -- Integration fields
  external_reference TEXT,
  payment_gateway_data JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(merchant_id, invoice_number)
);
```

#### Invoice Line Items
Detailed line item management with advanced features.

```sql
CREATE TABLE public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  
  -- Item details
  name TEXT NOT NULL,
  description TEXT,
  sku TEXT,
  category TEXT,
  
  -- Quantity and pricing
  quantity DECIMAL(10,3) NOT NULL DEFAULT 1,
  unit_price DECIMAL(15,2) NOT NULL,
  discount_amount DECIMAL(15,2) DEFAULT 0,
  discount_percentage DECIMAL(5,2) DEFAULT 0,
  
  -- Tax calculations
  tax_rate DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  
  -- Calculated totals
  line_total DECIMAL(15,2) GENERATED ALWAYS AS (
    (quantity * unit_price) - discount_amount + tax_amount
  ) STORED,
  
  -- Additional metadata
  unit_of_measurement TEXT DEFAULT 'piece',
  custom_fields JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Payment Transactions
Comprehensive payment tracking and reconciliation.

```sql
CREATE TABLE public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  
  -- Transaction identification
  transaction_id TEXT UNIQUE NOT NULL,
  gateway_transaction_id TEXT,
  reference_number TEXT,
  
  -- Payment details
  amount DECIMAL(15,2) NOT NULL,
  currency TEXT NOT NULL CHECK (currency IN ('INR', 'USD', 'EUR', 'GBP', 'BTC', 'ETH', 'USDT')),
  exchange_rate DECIMAL(10,4) DEFAULT 1.0,
  fee_amount DECIMAL(15,2) DEFAULT 0,
  net_amount DECIMAL(15,2) GENERATED ALWAYS AS (amount - fee_amount) STORED,
  
  -- Payment method and gateway
  payment_method TEXT NOT NULL CHECK (payment_method IN ('card', 'upi', 'net_banking', 'wallet', 'bank_transfer', 'cryptocurrency', 'cash')),
  payment_gateway TEXT CHECK (payment_gateway IN ('stripe', 'razorpay', 'paypal', 'coinbase', 'manual')),
  gateway_response JSONB DEFAULT '{}',
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded')),
  failure_reason TEXT,
  
  -- Customer and payment details
  customer_info JSONB DEFAULT '{}',
  payment_details JSONB DEFAULT '{}', -- Card last 4 digits, UPI ID, etc.
  
  -- Timestamps
  initiated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  failed_at TIMESTAMP WITH TIME ZONE,
  
  -- Reconciliation
  bank_settlement_date DATE,
  reconciled BOOLEAN DEFAULT false,
  reconciliation_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Customer Management
Advanced customer relationship management.

```sql
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  
  -- Basic information
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  customer_type TEXT DEFAULT 'individual' CHECK (customer_type IN ('individual', 'business')),
  
  -- Business details (for B2B customers)
  company_name TEXT,
  gst_number TEXT,
  pan_number TEXT,
  
  -- Address information
  billing_address JSONB DEFAULT '{}',
  shipping_address JSONB DEFAULT '{}',
  
  -- Financial information
  credit_limit DECIMAL(15,2) DEFAULT 0,
  outstanding_balance DECIMAL(15,2) DEFAULT 0,
  payment_terms INTEGER DEFAULT 30, -- Days
  
  -- Customer insights
  total_invoices_count INTEGER DEFAULT 0,
  total_amount_invoiced DECIMAL(15,2) DEFAULT 0,
  total_amount_paid DECIMAL(15,2) DEFAULT 0,
  average_payment_days DECIMAL(5,1),
  last_invoice_date DATE,
  last_payment_date DATE,
  
  -- Communication preferences
  preferred_contact_method TEXT DEFAULT 'email' CHECK (preferred_contact_method IN ('email', 'phone', 'sms')),
  communication_preferences JSONB DEFAULT '{}',
  
  -- Tags and categories
  tags JSONB DEFAULT '[]',
  category TEXT,
  source TEXT, -- How customer was acquired
  
  -- Status and notes
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
  notes TEXT,
  custom_fields JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(merchant_id, email)
);
```

### Database Indexes and Performance Optimization

```sql
-- Performance indexes for fast queries
CREATE INDEX idx_invoices_merchant_status ON invoices(merchant_id, status);
CREATE INDEX idx_invoices_customer_email ON invoices USING GIN ((customer_info->>'email'));
CREATE INDEX idx_invoices_due_date ON invoices(due_date) WHERE status IN ('pending', 'sent', 'viewed');
CREATE INDEX idx_transactions_merchant_date ON payment_transactions(merchant_id, created_at DESC);
CREATE INDEX idx_products_merchant_status ON products(merchant_id, status);
CREATE INDEX idx_customers_merchant_email ON customers(merchant_id, email);

-- Full-text search indexes
CREATE INDEX idx_invoices_search ON invoices USING GIN (to_tsvector('english', invoice_number || ' ' || (customer_info->>'name')));
CREATE INDEX idx_products_search ON products USING GIN (to_tsvector('english', name || ' ' || COALESCE(description, '')));
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Merchant policies
CREATE POLICY "Users can view their own merchant data" ON merchants
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own merchant data" ON merchants
  FOR UPDATE USING (user_id = auth.uid());

-- Invoice policies
CREATE POLICY "Merchants can manage their own invoices" ON invoices
  FOR ALL USING (merchant_id IN (SELECT id FROM merchants WHERE user_id = auth.uid()));

-- Public invoice viewing (for customers)
CREATE POLICY "Public invoice viewing" ON invoices
  FOR SELECT USING (status IN ('sent', 'viewed', 'paid', 'partially_paid', 'overdue'));
```

## 🔧 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Supabase** account (free tier available)

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-organization/maya-payments-gateway.git

# Navigate to the project directory
cd maya-payments-gateway

# Install dependencies
npm install
# or if using yarn
yarn install
```

### Step 2: Environment Configuration

Create environment configuration files:

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
VITE_APP_NAME="Maya Payments Gateway"
VITE_APP_URL=http://localhost:8080
VITE_ENVIRONMENT=development

# Email Configuration (Optional for development)
VITE_SUPPORT_EMAIL=support@yourdomain.com

# Payment Gateway Configuration (for production)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_RAZORPAY_KEY_ID=rzp_test_...

# Analytics (Optional)
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Step 3: Supabase Setup

#### A. Create a New Supabase Project

1. Visit [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization and provide project details
4. Wait for the project to be initialized
5. Navigate to Settings > API to find your project URL and anon key

#### B. Database Setup

Run the database migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

Or manually execute the SQL schemas provided in the Database Schema section.

#### C. Authentication Setup

1. Go to Authentication > Settings in your Supabase dashboard
2. Configure your site URL: `http://localhost:8080`
3. Add redirect URLs:
   - `http://localhost:8080/dashboard`
   - `http://localhost:8080/auth/callback`
4. Enable email confirmation if needed (disable for development)

#### D. Storage Setup (Optional)

If you plan to use file uploads:

```sql
-- Create storage bucket for merchant logos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'merchant-assets',
  'merchant-assets',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf']
);

-- Create storage policies
CREATE POLICY "Merchants can upload their assets" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'merchant-assets' AND
    auth.uid() IN (SELECT user_id FROM merchants WHERE id::text = (storage.foldername(name))[1])
  );
```

### Step 4: Development Server

Start the development server:

```bash
# Start the development server
npm run dev
# or
yarn dev

# The application will be available at http://localhost:8080
```

### Step 5: Production Build

For production deployment:

```bash
# Build the application
npm run build
# or
yarn build

# Preview the production build
npm run preview
# or
yarn preview
```

## 🎨 Customization & Branding

### White-Label Configuration

The system is designed to be completely white-labeled. Here's how to customize it for your brand:

#### 1. Brand Assets

Replace the default assets in `/public/` directory:

```bash
public/
├── favicon.ico          # Browser favicon
├── logo-light.svg       # Light theme logo
├── logo-dark.svg        # Dark theme logo
├── og-image.png         # Social media preview image
└── manifest.json        # PWA manifest
```

#### 2. Theme Configuration

Update the theme configuration in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        // Add your brand colors
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        // Add your brand fonts
      },
    },
  },
}
```

#### 3. Company Information

Update the default company information in your merchant settings or through the dashboard interface.

#### 4. Email Templates

Customize email templates by modifying the email service functions in your Supabase Edge Functions.

### Advanced Customization

#### Custom Invoice Templates

Create custom invoice templates by modifying the `InvoiceTemplate.tsx` component:

```typescript
// src/components/invoice/CustomInvoiceTemplate.tsx
export const CustomInvoiceTemplate = ({ invoice, merchant }: InvoiceTemplateProps) => {
  return (
    <div className="invoice-template custom-design">
      {/* Your custom invoice design */}
    </div>
  );
};
```

#### Payment Gateway Integration

Add custom payment gateways by implementing the payment interface:

```typescript
// src/lib/payments/CustomGateway.ts
export class CustomPaymentGateway implements PaymentGateway {
  async createPayment(amount: number, currency: string): Promise<PaymentResponse> {
    // Implementation
  }
  
  async verifyPayment(transactionId: string): Promise<PaymentVerification> {
    // Implementation
  }
}
```

## 💳 Payment Integration Guide

### Supported Payment Methods

#### 1. Fiat Currency Payments

**Credit/Debit Cards**
- Visa, Mastercard, American Express, RuPay
- 3D Secure authentication
- EMI options for high-value transactions
- Recurring payment support

**UPI (Unified Payments Interface)**
- All major UPI apps supported
- QR code generation
- Deep linking for mobile apps
- Real-time payment confirmation

**Net Banking**
- 50+ banks supported
- Direct bank integration
- Instant payment confirmation
- Corporate banking support

**Digital Wallets**
- Paytm, PhonePe, Google Pay
- Amazon Pay, Mobikwik
- Wallet balance and bank account options

#### 2. Bank Transfers

**Domestic Transfers (India)**
- NEFT (National Electronic Funds Transfer)
- RTGS (Real Time Gross Settlement)
- IMPS (Immediate Payment Service)
- UPI bank transfers

**International Transfers**
- SWIFT wire transfers
- Foreign currency support
- Correspondent banking network
- Compliance with international regulations

#### 3. Cryptocurrency Payments

**Supported Cryptocurrencies**
- Bitcoin (BTC)
- Ethereum (ETH)
- Tether (USDT)
- USD Coin (USDC)
- Litecoin (LTC)
- Ripple (XRP)

**Features**
- Real-time exchange rates
- Multi-wallet support
- Automatic conversion to fiat
- Blockchain confirmation tracking

### Payment Gateway Configuration

#### Stripe Integration

```typescript
// src/lib/payments/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const createPaymentIntent = async (
  amount: number,
  currency: string,
  customerId?: string
) => {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // Amount in cents
    currency: currency.toLowerCase(),
    customer: customerId,
    metadata: {
      integration_check: 'accept_a_payment',
    },
  });
};
```

#### Razorpay Integration

```typescript
// src/lib/payments/razorpay.ts
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createOrder = async (amount: number, currency: string) => {
  return await razorpay.orders.create({
    amount: amount * 100, // Amount in paise
    currency: currency.toUpperCase(),
    receipt: `receipt_${Date.now()}`,
  });
};
```

#### Cryptocurrency Integration

```typescript
// src/lib/payments/crypto.ts
import { CoinbaseCommerce } from 'coinbase-commerce-node';

const Client = CoinbaseCommerce.Client;
Client.init(process.env.COINBASE_API_KEY!);

export const createCryptoCharge = async (
  amount: number,
  currency: string,
  description: string
) => {
  const charge = await Client.Charge.create({
    name: 'Maya Payment',
    description,
    pricing_type: 'fixed_price',
    local_price: {
      amount: amount.toString(),
      currency: currency.toUpperCase(),
    },
  });
  
  return charge;
};
```

### Webhook Handling

Implement webhook handlers for payment confirmation:

```typescript
// supabase/functions/payment-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();
  
  // Verify webhook signature
  const event = verifyWebhookSignature(body, signature);
  
  if (event.type === 'payment_intent.succeeded') {
    // Update payment status in database
    await updatePaymentStatus(event.data.object.id, 'completed');
  }
  
  return new Response('OK', { status: 200 });
});
```

## 📧 Email System Configuration

### Custom Domain Email Setup

#### 1. DNS Configuration

Add these DNS records to your domain:

```
# MX Records
MX 10 mail.yourdomain.com

# SPF Record
TXT "v=spf1 include:mailgun.org ~all"

# DKIM Record
TXT "k=rsa; p=YOUR_DKIM_PUBLIC_KEY"

# DMARC Record
TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"
```

#### 2. Email Service Configuration

Configure your email service provider:

**Using SendGrid:**

```typescript
// supabase/functions/send-invoice/index.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendInvoiceEmail = async (
  invoice: Invoice,
  merchant: Merchant,
  attachmentUrl: string
) => {
  const msg = {
    to: invoice.customer_email,
    from: {
      email: `invoice@${merchant.domain}`,
      name: merchant.company_name,
    },
    subject: `Invoice ${invoice.invoice_number} from ${merchant.company_name}`,
    html: generateInvoiceEmailTemplate(invoice, merchant),
    attachments: [
      {
        content: await fetchPDFContent(attachmentUrl),
        filename: `invoice-${invoice.invoice_number}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ],
  };
  
  return await sgMail.send(msg);
};
```

**Using Postmark:**

```typescript
import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_API_KEY!);

export const sendEmailWithPostmark = async (emailData: EmailData) => {
  return await client.sendEmailWithTemplate({
    TemplateAlias: 'invoice-template',
    TemplateModel: emailData,
    From: `${emailData.merchant.company_name} <invoice@${emailData.merchant.domain}>`,
    To: emailData.recipient,
    Attachments: emailData.attachments,
  });
};
```

### Email Templates

Create responsive email templates:

```html
<!-- Email Template: Invoice -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice {{invoice_number}}</title>
  <style>
    /* Responsive email styles */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
    }
  </style>
</head>
<body>
  <div class="container" style="max-width: 600px; margin: 0 auto;">
    <!-- Header with merchant logo -->
    <div class="header">
      <img src="{{merchant_logo}}" alt="{{company_name}}" style="height: 60px;">
      <h1 style="color: {{theme_color}};">{{company_name}}</h1>
    </div>
    
    <!-- Invoice details -->
    <div class="content">
      <h2>Invoice {{invoice_number}}</h2>
      <p>Dear {{customer_name}},</p>
      <p>Please find attached your invoice for the amount of {{currency}}{{total_amount}}.</p>
      
      <!-- Payment button -->
      <a href="{{payment_link}}" style="background: {{theme_color}}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
        Pay Now
      </a>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p>Thank you for your business!</p>
      <p>{{company_name}} | {{company_address}} | {{company_phone}}</p>
    </div>
  </div>
</body>
</html>
```

## 🔒 Security & Compliance

### Data Security Measures

#### 1. Encryption

**Data at Rest:**
- AES-256 encryption for sensitive data
- Database-level encryption with Supabase
- Encrypted file storage for documents
- Key rotation policies

**Data in Transit:**
- TLS 1.3 for all communications
- Certificate pinning for mobile apps
- End-to-end encryption for sensitive operations

#### 2. Authentication & Authorization

**Multi-Factor Authentication:**
```typescript
// Enable MFA for merchant accounts
export const enableMFA = async (userId: string) => {
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
    friendlyName: 'Maya Payments Gateway',
  });
  
  return { data, error };
};
```

**Role-Based Access Control:**
```sql
-- Create roles for different access levels
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'accountant', 'viewer');

-- Add role column to merchants table
ALTER TABLE merchants ADD COLUMN user_role user_role DEFAULT 'admin';

-- Create policies based on roles
CREATE POLICY "Admins have full access" ON invoices
  FOR ALL USING (
    merchant_id IN (
      SELECT id FROM merchants 
      WHERE user_id = auth.uid() AND user_role = 'admin'
    )
  );
```

#### 3. PCI DSS Compliance

**Secure Payment Processing:**
- Never store credit card information
- Use tokenization for recurring payments
- Implement secure payment forms
- Regular security audits

**Compliance Checklist:**
- [ ] Secure network architecture
- [ ] Regular vulnerability assessments
- [ ] Access control implementation
- [ ] Network monitoring
- [ ] Regular testing of security systems
- [ ] Information security policy maintenance

#### 4. Fraud Prevention

**Transaction Monitoring:**
```typescript
// Fraud detection service
export class FraudDetectionService {
  async analyzeTransaction(transaction: PaymentTransaction): Promise<FraudScore> {
    const riskFactors = [
      this.analyzeVelocity(transaction),
      this.analyzeGeolocation(transaction),
      this.analyzeAmount(transaction),
      this.analyzeBehaviorPattern(transaction),
    ];
    
    const riskScore = this.calculateRiskScore(riskFactors);
    
    if (riskScore > 0.8) {
      await this.flagForReview(transaction);
    }
    
    return {
      score: riskScore,
      factors: riskFactors,
      recommendation: this.getRecommendation(riskScore),
    };
  }
}
```

### GDPR Compliance

#### Data Privacy Implementation

```typescript
// Data export for GDPR compliance
export const exportUserData = async (userId: string) => {
  const [merchant, invoices, transactions, customers] = await Promise.all([
    getMerchantData(userId),
    getInvoiceData(userId),
    getTransactionData(userId),
    getCustomerData(userId),
  ]);
  
  return {
    personal_data: merchant,
    business_data: {
      invoices,
      transactions,
      customers,
    },
    export_timestamp: new Date().toISOString(),
  };
};

// Data deletion for GDPR compliance
export const deleteUserData = async (userId: string) => {
  // Anonymize rather than delete for audit trails
  await supabase.rpc('anonymize_user_data', { user_id: userId });
};
```

#### Privacy Policy Integration

```typescript
// Consent management
export const ConsentManager = {
  async recordConsent(userId: string, consentType: string) {
    return await supabase
      .from('user_consents')
      .insert({
        user_id: userId,
        consent_type: consentType,
        granted_at: new Date().toISOString(),
        ip_address: await this.getUserIP(),
      });
  },
  
  async withdrawConsent(userId: string, consentType: string) {
    return await supabase
      .from('user_consents')
      .update({ withdrawn_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('consent_type', consentType);
  },
};
```

## 📊 Analytics & Reporting

### Business Intelligence Dashboard

#### Key Performance Indicators (KPIs)

```typescript
// Analytics service for business insights
export class AnalyticsService {
  async getDashboardMetrics(merchantId: string, period: string) {
    const [revenue, invoiceStats, customerMetrics, paymentAnalysis] = await Promise.all([
      this.getRevenueMetrics(merchantId, period),
      this.getInvoiceStatistics(merchantId, period),
      this.getCustomerAnalytics(merchantId, period),
      this.getPaymentAnalysis(merchantId, period),
    ]);
    
    return {
      revenue,
      invoiceStats,
      customerMetrics,
      paymentAnalysis,
      trends: await this.calculateTrends(merchantId, period),
    };
  }
  
  private async getRevenueMetrics(merchantId: string, period: string) {
    return await supabase.rpc('calculate_revenue_metrics', {
      p_merchant_id: merchantId,
      p_period: period,
    });
  }
}
```

#### Custom SQL Functions for Analytics

```sql
-- Revenue calculation function
CREATE OR REPLACE FUNCTION calculate_revenue_metrics(
  p_merchant_id UUID,
  p_period TEXT
) RETURNS JSONB AS $$
DECLARE
  result JSONB;
  start_date DATE;
  end_date DATE;
BEGIN
  -- Determine date range based on period
  CASE p_period
    WHEN 'today' THEN
      start_date := CURRENT_DATE;
      end_date := CURRENT_DATE + INTERVAL '1 day';
    WHEN 'week' THEN
      start_date := date_trunc('week', CURRENT_DATE);
      end_date := start_date + INTERVAL '1 week';
    WHEN 'month' THEN
      start_date := date_trunc('month', CURRENT_DATE);
      end_date := start_date + INTERVAL '1 month';
    WHEN 'quarter' THEN
      start_date := date_trunc('quarter', CURRENT_DATE);
      end_date := start_date + INTERVAL '3 months';
    WHEN 'year' THEN
      start_date := date_trunc('year', CURRENT_DATE);
      end_date := start_date + INTERVAL '1 year';
  END CASE;
  
  -- Calculate metrics
  SELECT jsonb_build_object(
    'total_revenue', COALESCE(SUM(total_amount), 0),
    'paid_revenue', COALESCE(SUM(CASE WHEN payment_status = 'paid' THEN total_amount ELSE 0 END), 0),
    'outstanding_amount', COALESCE(SUM(outstanding_amount), 0),
    'invoice_count', COUNT(*),
    'paid_invoice_count', COUNT(*) FILTER (WHERE payment_status = 'paid'),
    'average_invoice_value', COALESCE(AVG(total_amount), 0),
    'period_start', start_date,
    'period_end', end_date
  ) INTO result
  FROM invoices
  WHERE merchant_id = p_merchant_id
    AND created_at >= start_date
    AND created_at < end_date;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Reporting Features

#### 1. Financial Reports

```typescript
// Generate comprehensive financial reports
export const generateFinancialReport = async (
  merchantId: string,
  reportType: 'profit_loss' | 'cash_flow' | 'aging_report',
  startDate: string,
  endDate: string
) => {
  switch (reportType) {
    case 'profit_loss':
      return await generateProfitLossReport(merchantId, startDate, endDate);
    case 'cash_flow':
      return await generateCashFlowReport(merchantId, startDate, endDate);
    case 'aging_report':
      return await generateAgingReport(merchantId, endDate);
    default:
      throw new Error('Invalid report type');
  }
};
```

#### 2. Customer Analysis

```typescript
// Customer behavior analysis
export const analyzeCustomerBehavior = async (merchantId: string) => {
  const analysis = await supabase.rpc('analyze_customer_behavior', {
    p_merchant_id: merchantId,
  });
  
  return {
    topCustomers: analysis.top_customers,
    paymentPatterns: analysis.payment_patterns,
    geographicDistribution: analysis.geographic_data,
    seasonalTrends: analysis.seasonal_trends,
    churnPrediction: analysis.churn_risk,
  };
};
```

#### 3. Payment Analytics

```typescript
// Payment method performance analysis
export const analyzePaymentMethods = async (merchantId: string) => {
  return await supabase
    .from('payment_transactions')
    .select(`
      payment_method,
      COUNT(*) as transaction_count,
      SUM(amount) as total_amount,
      AVG(amount) as average_amount,
      COUNT(*) FILTER (WHERE status = 'completed') as successful_count,
      COUNT(*) FILTER (WHERE status = 'failed') as failed_count
    `)
    .eq('merchant_id', merchantId)
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
    .groupBy('payment_method');
};
```

## 🚀 Deployment Guide

### Production Deployment Options

#### 1. Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Configure environment variables
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
# ... add other environment variables

# Deploy with custom domain
vercel --prod
```

**Vercel Configuration (`vercel.json`):**

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@vite_supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@vite_supabase_anon_key"
  }
}
```

#### 2. Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist

# Configure environment variables through Netlify dashboard
```

**Netlify Configuration (`netlify.toml`):**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  VITE_SUPABASE_URL = "your_supabase_url"
  VITE_SUPABASE_ANON_KEY = "your_supabase_anon_key"
```

#### 3. Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Docker Compose (`docker-compose.yml`):**

```yaml
version: '3.8'

services:
  maya-payments:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl
      - ./nginx-ssl.conf:/etc/nginx/nginx.conf
    depends_on:
      - maya-payments
    restart: unless-stopped
```

### Production Environment Configuration

#### 1. Environment Variables

```env
# Production Environment Variables
NODE_ENV=production

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key

# Application Configuration
VITE_APP_NAME="Maya Payments Gateway"
VITE_APP_URL=https://yourdomain.com
VITE_ENVIRONMENT=production

# Security Configuration
VITE_CSP_NONCE=production_nonce_value
VITE_SECURITY_HEADERS=true

# Payment Gateway Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_RAZORPAY_KEY_ID=rzp_live_...

# Analytics Configuration
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_HOTJAR_ID=your_hotjar_id

# Email Configuration
VITE_SUPPORT_EMAIL=support@yourdomain.com
VITE_NOREPLY_EMAIL=noreply@yourdomain.com

# CDN Configuration
VITE_CDN_URL=https://cdn.yourdomain.com
VITE_ASSETS_URL=https://assets.yourdomain.com
```

#### 2. SSL/TLS Configuration

```nginx
# nginx-ssl.conf
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/nginx/ssl/yourdomain.com.crt;
    ssl_certificate_key /etc/nginx/ssl/yourdomain.com.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://maya-payments:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Performance Optimization

#### 1. Build Optimization

```typescript
// vite.config.ts - Production optimizations
export default defineConfig({
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-button'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'router-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

#### 2. CDN Configuration

```typescript
// Configure CDN for static assets
const CDN_URL = process.env.VITE_CDN_URL || '';

export const getAssetUrl = (path: string) => {
  if (process.env.NODE_ENV === 'production' && CDN_URL) {
    return `${CDN_URL}${path}`;
  }
  return path;
};
```

#### 3. Caching Strategy

```typescript
// Service Worker for caching
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then((cache) => {
        return cache.match(event.request).then((response) => {
          return response || fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
```

## 🔧 API Reference

### Authentication Endpoints

#### Login
```http
POST /auth/v1/token
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Signup
```http
POST /auth/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "data": {
    "company_name": "Example Corp"
  }
}
```

### Invoice Management Endpoints

#### Create Invoice
```http
POST /rest/v1/invoices
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "customer_info": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  },
  "items": [
    {
      "name": "Web Development",
      "quantity": 1,
      "unit_price": 1000,
      "tax_rate": 18
    }
  ],
  "due_date": "2024-02-15",
  "currency": "INR"
}
```

#### Get Invoices
```http
GET /rest/v1/invoices?select=*,invoice_items(*)
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Update Invoice Status
```http
PATCH /rest/v1/invoices?id=eq.{invoice_id}
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "status": "sent"
}
```

### Payment Endpoints

#### Create Payment Intent
```http
POST /functions/v1/create-payment-intent
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "invoice_id": "uuid-here",
  "payment_method": "card",
  "return_url": "https://yourdomain.com/payment/success"
}
```

#### Verify Payment
```http
POST /functions/v1/verify-payment
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "payment_intent_id": "pi_xxx",
  "gateway": "stripe"
}
```

### Webhook Endpoints

#### Payment Webhook
```http
POST /functions/v1/payment-webhook
Content-Type: application/json
Stripe-Signature: t=xxx,v1=xxx

{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_xxx",
      "status": "succeeded"
    }
  }
}
```

## 🧪 Testing

### Unit Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Integration Testing

```typescript
// Example integration test
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateInvoice } from '@/pages/dashboard/CreateInvoice';

describe('CreateInvoice', () => {
  it('should create an invoice successfully', async () => {
    const user = userEvent.setup();
    
    render(<CreateInvoice />);
    
    // Fill in customer information
    await user.type(screen.getByLabelText('Customer Name'), 'John Doe');
    await user.type(screen.getByLabelText('Customer Email'), 'john@example.com');
    
    // Add invoice item
    await user.click(screen.getByText('Add Item'));
    await user.type(screen.getByLabelText('Item Name'), 'Web Development');
    await user.type(screen.getByLabelText('Quantity'), '1');
    await user.type(screen.getByLabelText('Unit Price'), '1000');
    
    // Submit invoice
    await user.click(screen.getByText('Create Invoice'));
    
    // Assert success
    await waitFor(() => {
      expect(screen.getByText('Invoice created successfully')).toBeInTheDocument();
    });
  });
});
```

### End-to-End Testing

```typescript
// Playwright E2E test
import { test, expect } from '@playwright/test';

test('complete invoice flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'test@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="login-button"]');
  
  // Navigate to create invoice
  await page.click('[data-testid="create-invoice"]');
  
  // Fill invoice details
  await page.fill('[data-testid="customer-name"]', 'John Doe');
  await page.fill('[data-testid="customer-email"]', 'john@example.com');
  
  // Add item
  await page.click('[data-testid="add-item"]');
  await page.fill('[data-testid="item-name"]', 'Consulting');
  await page.fill('[data-testid="quantity"]', '5');
  await page.fill('[data-testid="unit-price"]', '100');
  
  // Create invoice
  await page.click('[data-testid="create-invoice-button"]');
  
  // Verify success
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
});
```

## 🛠️ Maintenance & Monitoring

### Error Monitoring

```typescript
// Error tracking service
export class ErrorTracker {
  static init() {
    window.addEventListener('error', this.handleError);
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  }
  
  static handleError(event: ErrorEvent) {
    this.reportError({
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
    });
  }
  
  static async reportError(error: any) {
    await fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });
  }
}
```

### Performance Monitoring

```typescript
// Performance metrics collection
export class PerformanceMonitor {
  static collectMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      pageLoad: navigation.loadEventEnd - navigation.fetchStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      firstContentfulPaint: this.getFirstContentfulPaint(),
      largestContentfulPaint: this.getLargestContentfulPaint(),
    };
  }
  
  static getFirstContentfulPaint() {
    const entry = performance.getEntriesByName('first-contentful-paint')[0];
    return entry ? entry.startTime : 0;
  }
}
```

### Health Checks

```typescript
// Health check endpoint
export const healthCheck = async () => {
  const checks = await Promise.allSettled([
    checkDatabase(),
    checkEmailService(),
    checkPaymentGateways(),
    checkFileStorage(),
  ]);
  
  return {
    status: checks.every(check => check.status === 'fulfilled') ? 'healthy' : 'degraded',
    checks: checks.map((check, index) => ({
      service: ['database', 'email', 'payments', 'storage'][index],
      status: check.status,
      error: check.status === 'rejected' ? check.reason : null,
    })),
    timestamp: new Date().toISOString(),
  };
};
```

## 📞 Support & Community

### Getting Help

1. **Documentation**: Comprehensive guides and API references
2. **GitHub Issues**: Report bugs and request features
3. **Community Discord**: Join our developer community
4. **Email Support**: Reach out to our technical team
5. **Video Tutorials**: Step-by-step implementation guides

### Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

#### Development Workflow

```bash
# Fork the repository
git clone https://github.com/your-username/maya-payments-gateway.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes
git commit -m 'Add amazing feature'

# Push to the branch
git push origin feature/amazing-feature

# Open a Pull Request
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [Supabase](https://supabase.com/) for the backend infrastructure
- [Shadcn/UI](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) for the frontend framework
- All contributors who have helped build this project

---

**Maya Payments Gateway** - Empowering businesses with modern payment solutions.

For more information, visit our [website](https://mayaexchange.co.in) or contact our [support team](mailto:support@mayaexchange.co.in).
