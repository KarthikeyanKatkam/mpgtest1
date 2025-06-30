
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const ErrorCodes = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Error Codes" 
      description="Complete reference for all API error codes and how to handle them"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Error Response Format</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">All API errors follow a consistent format:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`{
  "error": {
    "type": "card_error",
    "code": "card_declined",
    "message": "Your card was declined.",
    "param": "payment_method"
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HTTP Status Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">Status Code</th>
                    <th className="border border-gray-300 p-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">200</td>
                    <td className="border border-gray-300 p-3">Request successful</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">400</td>
                    <td className="border border-gray-300 p-3">Bad request - Invalid parameters</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">401</td>
                    <td className="border border-gray-300 p-3">Unauthorized - Invalid API key</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">402</td>
                    <td className="border border-gray-300 p-3">Payment required - Card declined</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">404</td>
                    <td className="border border-gray-300 p-3">Not found - Resource doesn't exist</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">429</td>
                    <td className="border border-gray-300 p-3">Too many requests - Rate limit exceeded</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">500</td>
                    <td className="border border-gray-300 p-3">Internal server error</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Error Codes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">card_declined</h4>
                <p className="text-sm text-gray-600">The card was declined by the issuing bank.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">insufficient_funds</h4>
                <p className="text-sm text-gray-600">The card has insufficient funds.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">expired_card</h4>
                <p className="text-sm text-gray-600">The card has expired.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">incorrect_cvc</h4>
                <p className="text-sm text-gray-600">The card's security code is incorrect.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700">authentication_required</h4>
                <p className="text-sm text-gray-600">Additional authentication is required.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Handling Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Recommendations:</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Always check the error type and code before displaying messages</li>
                <li>Provide user-friendly error messages</li>
                <li>Implement retry logic for transient errors</li>
                <li>Log errors for debugging purposes</li>
                <li>Handle rate limiting gracefully</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/api-reference/rate-limits')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Rate Limits
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/api-reference/webhook-events')}>
            Previous: Webhook Events
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default ErrorCodes;
