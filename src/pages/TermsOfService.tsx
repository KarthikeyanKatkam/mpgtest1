
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <img 
                src="/lovable-uploads/438cf714-65a7-4c46-80ee-f10fbd5afa0d.png" 
                alt="Maya Exchange" 
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Maya Payments Gateway
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: January 1, 2025
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 mb-4">
                    By accessing and using Maya Payments Gateway services, you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                  <p className="text-gray-600 mb-4">
                    Maya Payments Gateway provides payment processing services including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Credit and debit card processing</li>
                    <li>UPI and digital wallet integration</li>
                    <li>Cryptocurrency payment processing</li>
                    <li>Invoice generation and management</li>
                    <li>API access for payment integration</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
                  <p className="text-gray-600 mb-4">You agree to:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Not use the service for illegal or fraudulent activities</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Processing</h2>
                  <p className="text-gray-600 mb-4">
                    All payment processing is subject to our terms and the terms of our payment partners. 
                    We reserve the right to refuse, cancel, or suspend any transaction.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
                  <p className="text-gray-600 mb-4">
                    Maya Payments Gateway shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages arising from your use of our services.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Information</h2>
                  <p className="text-gray-600">
                    For questions about these Terms of Service, please contact us at:<br/>
                    Email: sales@mayaexchange.co.in<br/>
                    Phone: +91 79817 03460
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
