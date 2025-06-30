
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const RateLimits = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Rate Limits" 
      description="Understanding and handling API rate limits in Maya Payments Gateway"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Rate Limit Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Rate limits help ensure fair usage and maintain system stability. All API requests are subject to rate limiting.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Default Limits:</h4>
              <ul className="list-disc list-inside space-y-1 text-yellow-800">
                <li><strong>Standard API:</strong> 100 requests per minute</li>
                <li><strong>Payment Processing:</strong> 50 requests per minute</li>
                <li><strong>Webhook Delivery:</strong> 500 requests per minute</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rate Limit Headers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Every API response includes rate limit information in the headers:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
X-RateLimit-Window: 60`}
              </pre>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>X-RateLimit-Limit:</strong> Maximum requests allowed in the time window</p>
              <p><strong>X-RateLimit-Remaining:</strong> Number of requests remaining in the current window</p>
              <p><strong>X-RateLimit-Reset:</strong> Unix timestamp when the rate limit resets</p>
              <p><strong>X-RateLimit-Window:</strong> Time window in seconds</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rate Limit Exceeded Response</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">When you exceed the rate limit, you'll receive a 429 status code:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`HTTP/1.1 429 Too Many Requests
{
  "error": {
    "type": "rate_limit_error",
    "code": "rate_limit_exceeded",
    "message": "Too many requests. Please wait before making more requests.",
    "retry_after": 30
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Implement Exponential Backoff</h4>
                <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function makeRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after') || (2 ** i);
        await delay(retryAfter * 1000);
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(2 ** i * 1000);
    }
  }
}`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">2. Monitor Rate Limit Headers</h4>
                <p className="text-gray-600">Always check the rate limit headers in responses to avoid hitting limits.</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">3. Batch Operations</h4>
                <p className="text-gray-600">Combine multiple operations into single API calls when possible.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Higher limits are available for enterprise customers:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">Plan</th>
                    <th className="border border-gray-300 p-3 text-left">API Requests/min</th>
                    <th className="border border-gray-300 p-3 text-left">Payment Processing/min</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Standard</td>
                    <td className="border border-gray-300 p-3">100</td>
                    <td className="border border-gray-300 p-3">50</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Pro</td>
                    <td className="border border-gray-300 p-3">500</td>
                    <td className="border border-gray-300 p-3">250</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Enterprise</td>
                    <td className="border border-gray-300 p-3">Custom</td>
                    <td className="border border-gray-300 p-3">Custom</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/integration/web-integration')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Web Integration
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/api-reference/error-codes')}>
            Previous: Error Codes
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default RateLimits;
