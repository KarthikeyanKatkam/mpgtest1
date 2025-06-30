
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
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

      {/* Privacy Policy Content */}
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Privacy Policy
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
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                  <p className="text-gray-600 mb-4">
                    We collect information you provide directly to us, such as when you create an account, 
                    use our services, or contact us for support. This may include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Personal identification information (name, email address, phone number)</li>
                    <li>Business information (company name, tax identification numbers)</li>
                    <li>Payment information (bank account details, card information)</li>
                    <li>Transaction data and payment history</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Provide, maintain, and improve our payment services</li>
                    <li>Process transactions and send related information</li>
                    <li>Verify your identity and prevent fraud</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Communicate with you about our services</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                  <p className="text-gray-600 mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    except as described in this policy. We may share your information:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>With service providers who assist in our operations</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and prevent fraud</li>
                    <li>With your consent</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                  <p className="text-gray-600 mb-4">
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. This includes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>End-to-end encryption for sensitive data</li>
                    <li>Regular security audits and monitoring</li>
                    <li>Compliance with PCI DSS standards</li>
                    <li>Secure data storage and transmission</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                  <p className="text-gray-600 mb-4">
                    You have certain rights regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Access to your personal information</li>
                    <li>Correction of inaccurate information</li>
                    <li>Deletion of your information (subject to legal requirements)</li>
                    <li>Portability of your data</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="text-gray-600">
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

export default PrivacyPolicy;
