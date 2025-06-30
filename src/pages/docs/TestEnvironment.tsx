
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const TestEnvironment = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Test Environment" 
      description="Learn how to test your integration safely without processing real payments"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Test Environment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Our test environment allows you to simulate payment flows without processing real money. It's identical to the live environment but uses test credentials and card numbers.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                <strong>Base URL for Test Environment:</strong> https://test-api.mayaexchange.co.in
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Card Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Use these test card numbers to simulate different payment scenarios:</p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-3">
                  <h4 className="font-semibold text-green-700">Successful Payment</h4>
                  <p className="font-mono text-sm">4111 1111 1111 1111</p>
                  <p className="text-xs text-gray-500">Visa</p>
                </div>
                <div className="border rounded-lg p-3">
                  <h4 className="font-semibold text-green-700">Successful Payment</h4>
                  <p className="font-mono text-sm">5555 5555 5555 4444</p>
                  <p className="text-xs text-gray-500">Mastercard</p>
                </div>
                <div className="border rounded-lg p-3">
                  <h4 className="font-semibold text-red-700">Declined Payment</h4>
                  <p className="font-mono text-sm">4000 0000 0000 0002</p>
                  <p className="text-xs text-gray-500">Visa - Declined</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Additional Test Details:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li><strong>Expiry Date:</strong> Any future date (e.g., 12/25)</li>
                  <li><strong>CVV:</strong> Any 3-digit number (e.g., 123)</li>
                  <li><strong>Name:</strong> Any name</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test UPI IDs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Use these test UPI IDs for testing UPI payments:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-green-700">Successful UPI</h4>
                <p className="font-mono text-sm">success@test</p>
              </div>
              <div className="border rounded-lg p-3">
                <h4 className="font-semibold text-red-700">Failed UPI</h4>
                <p className="font-mono text-sm">failure@test</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testing Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Test webhook notifications in your development environment:</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Webhook Testing Tools</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Use ngrok to expose your local server to the internet</li>
                  <li>Configure webhook URL in the test dashboard</li>
                  <li>Monitor webhook deliveries in real-time</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 text-white p-4 rounded-lg">
                <p className="text-sm mb-2">Example ngrok command:</p>
                <code className="text-green-400">ngrok http 3000</code>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test vs Live Environment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">Feature</th>
                    <th className="border border-gray-300 p-3 text-left">Test Environment</th>
                    <th className="border border-gray-300 p-3 text-left">Live Environment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Payment Processing</td>
                    <td className="border border-gray-300 p-3">Simulated</td>
                    <td className="border border-gray-300 p-3">Real money</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">API Response</td>
                    <td className="border border-gray-300 p-3">Identical to live</td>
                    <td className="border border-gray-300 p-3">Real responses</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Webhooks</td>
                    <td className="border border-gray-300 p-3">Test notifications</td>
                    <td className="border border-gray-300 p-3">Real notifications</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/getting-started/first-transaction')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: First Transaction
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/getting-started/api-keys')}>
            Previous: API Keys
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default TestEnvironment;
