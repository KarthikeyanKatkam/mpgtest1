
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Suspense, lazy } from "react";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const GetStarted = lazy(() => import("./pages/GetStarted"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Documentation = lazy(() => import("./pages/Documentation"));
const APIReference = lazy(() => import("./pages/APIReference"));
const Support = lazy(() => import("./pages/Support"));
const Status = lazy(() => import("./pages/Status"));
const Auth = lazy(() => import("./pages/Auth"));
const PublicInvoice = lazy(() => import("./pages/PublicInvoice"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Protected dashboard pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Overview = lazy(() => import("./pages/dashboard/Overview"));
const KYCVerification = lazy(() => import("./pages/dashboard/KYCVerification"));
const FiatPayments = lazy(() => import("./pages/dashboard/FiatPayments"));
const CryptoPayments = lazy(() => import("./pages/dashboard/CryptoPayments"));
const Invoices = lazy(() => import("./pages/dashboard/Invoices"));
const Transactions = lazy(() => import("./pages/dashboard/Transactions"));
const APIKeys = lazy(() => import("./pages/dashboard/APIKeys"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const InvoiceSettings = lazy(() => import("./pages/dashboard/InvoiceSettings"));
const CreateInvoice = lazy(() => import("./pages/dashboard/CreateInvoice"));
const InvoicesDashboard = lazy(() => import("./pages/dashboard/InvoicesDashboard"));
const PaymentLinks = lazy(() => import("./pages/dashboard/PaymentLinks"));
const MerchantBranding = lazy(() => import("./pages/dashboard/MerchantBranding"));

// Documentation pages
const AccountSetup = lazy(() => import("./pages/docs/AccountSetup"));
const APIKeysDoc = lazy(() => import("./pages/docs/APIKeys"));
const TestEnvironment = lazy(() => import("./pages/docs/TestEnvironment"));
const FirstTransaction = lazy(() => import("./pages/docs/FirstTransaction"));
const PaymentAPIs = lazy(() => import("./pages/docs/PaymentAPIs"));
const WebhookEvents = lazy(() => import("./pages/docs/WebhookEvents"));
const ErrorCodes = lazy(() => import("./pages/docs/ErrorCodes"));
const RateLimits = lazy(() => import("./pages/docs/RateLimits"));
const WebIntegration = lazy(() => import("./pages/docs/WebIntegration"));
const MobileSDKs = lazy(() => import("./pages/docs/MobileSDKs"));
const EcommercePlugins = lazy(() => import("./pages/docs/EcommercePlugins"));
const CustomSolutions = lazy(() => import("./pages/docs/CustomSolutions"));
const Encryption = lazy(() => import("./pages/docs/Encryption"));
const FraudPrevention = lazy(() => import("./pages/docs/FraudPrevention"));
const DataProtection = lazy(() => import("./pages/docs/DataProtection"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/api-reference" element={<APIReference />} />
                <Route path="/support" element={<Support />} />
                <Route path="/status" element={<Status />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Public Invoice Route */}
                <Route path="/invoice/:invoiceId" element={<PublicInvoice />} />
                
                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }>
                  <Route index element={<Overview />} />
                  <Route path="kyc" element={<KYCVerification />} />
                  <Route path="fiat" element={<FiatPayments />} />
                  <Route path="crypto" element={<CryptoPayments />} />
                  <Route path="invoices" element={<InvoicesDashboard />} />
                  <Route path="invoices/create" element={<CreateInvoice />} />
                  <Route path="invoice-settings" element={<InvoiceSettings />} />
                  <Route path="payment-links" element={<PaymentLinks />} />
                  <Route path="merchant-branding" element={<MerchantBranding />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="api-keys" element={<APIKeys />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                
                {/* Documentation routes */}
                <Route path="/docs/getting-started/account-setup" element={<AccountSetup />} />
                <Route path="/docs/getting-started/api-keys" element={<APIKeysDoc />} />
                <Route path="/docs/getting-started/test-environment" element={<TestEnvironment />} />
                <Route path="/docs/getting-started/first-transaction" element={<FirstTransaction />} />
                <Route path="/docs/api-reference/payment-apis" element={<PaymentAPIs />} />
                <Route path="/docs/api-reference/webhook-events" element={<WebhookEvents />} />
                <Route path="/docs/api-reference/error-codes" element={<ErrorCodes />} />
                <Route path="/docs/api-reference/rate-limits" element={<RateLimits />} />
                <Route path="/docs/integration/web-integration" element={<WebIntegration />} />
                <Route path="/docs/integration/mobile-sdks" element={<MobileSDKs />} />
                <Route path="/docs/integration/ecommerce-plugins" element={<EcommercePlugins />} />
                <Route path="/docs/integration/custom-solutions" element={<CustomSolutions />} />
                <Route path="/docs/security/encryption" element={<Encryption />} />
                <Route path="/docs/security/fraud-prevention" element={<FraudPrevention />} />
                <Route path="/docs/security/data-protection" element={<DataProtection />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
