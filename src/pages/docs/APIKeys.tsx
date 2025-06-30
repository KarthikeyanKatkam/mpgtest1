
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const APIKeysDoc = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="API Keys" 
      description="Learn how to generate and manage your API keys for secure integration"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Understanding API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              API keys are essential for authenticating your requests to Maya Payments Gateway. We provide two types of keys:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700">Test Keys</h4>
                <p className="text-sm text-gray-600">Used for development and testing. No real money is processed.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">Live Keys</h4>
                <p className="text-sm text-gray-600">Used for production. Real transactions are processed.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generating API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Step 1: Access Dashboard</h4>
                <p className="text-gray-600">Log in to your Maya Payments Gateway dashboard and navigate to the API Keys section.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Step 2: Generate Keys</h4>
                <p className="text-gray-600">Click "Generate New Key" and select the appropriate environment (Test/Live).</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Step 3: Secure Storage</h4>
                <p className="text-gray-600">Store your keys securely and never expose them in client-side code.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Key Format</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Test Environment</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                  test_maya_sk_1234567890abcdef
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Live Environment</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                  live_maya_sk_abcdef1234567890
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Using API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Include your API key in the Authorization header of your requests:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`curl -X POST https://api.mayaexchange.co.in/payments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "currency": "INR",
    "customer_email": "customer@example.com"
  }'`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-red-900 mb-2">Important Security Guidelines:</h4>
              <ul className="list-disc list-inside space-y-1 text-red-800">
                <li>Never expose API keys in client-side code or public repositories</li>
                <li>Use environment variables to store API keys</li>
                <li>Regularly rotate your API keys</li>
                <li>Use test keys for development and live keys only for production</li>
                <li>Monitor API key usage in your dashboard</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/getting-started/test-environment')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Test Environment
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/getting-started/account-setup')}>
            Previous: Account Setup
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default APIKeysDoc;
