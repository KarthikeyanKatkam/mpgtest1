
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const AccountSetup = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Account Setup" 
      description="Step-by-step guide to set up your Maya Payments Gateway account"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Create Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Start by creating your Maya Payments Gateway account to access our payment processing services.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Visit our signup page and provide your business information</li>
              <li>Verify your email address through the confirmation link</li>
              <li>Complete the business verification process</li>
              <li>Upload required documents (Business license, Tax ID, etc.)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Business Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Complete the KYC (Know Your Customer) process to activate your account:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">Required Documents:</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Business registration certificate</li>
                <li>Tax identification number</li>
                <li>Bank account details</li>
                <li>Director/Owner identification documents</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Configure Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Set up the payment methods you want to accept:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Card Payments</h4>
                <p className="text-sm text-gray-600">Visa, Mastercard, RuPay, American Express</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Digital Wallets</h4>
                <p className="text-sm text-gray-600">UPI, PayTM, PhonePe, Google Pay</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Bank Transfers</h4>
                <p className="text-sm text-gray-600">NEFT, RTGS, IMPS</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Cryptocurrency</h4>
                <p className="text-sm text-gray-600">Bitcoin, Ethereum, USDT</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Account Activation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Once your documents are verified, your account will be activated and you can start accepting payments.
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800">
                <strong>Verification typically takes 1-3 business days.</strong> You'll receive an email notification once your account is approved.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/getting-started/api-keys')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: API Keys Setup
          </Button>
          <Button variant="outline" onClick={() => navigate('/contact')}>
            Need Help?
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default AccountSetup;
