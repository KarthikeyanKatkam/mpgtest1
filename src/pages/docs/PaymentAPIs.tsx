
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const PaymentAPIs = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Payment APIs" 
      description="Complete reference for all payment-related API endpoints"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Payment Intent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Create a new payment intent to start the payment process.</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
              <pre className="text-sm">
{`POST /payment-intents
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "amount": 1000,
  "currency": "INR",
  "customer": {
    "email": "customer@example.com",
    "name": "John Doe"
  },
  "payment_methods": ["card", "upi", "wallet"]
}`}
              </pre>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Response:</h4>
              <pre className="text-sm text-green-800">
{`{
  "id": "pi_1234567890",
  "amount": 1000,
  "currency": "INR",
  "status": "requires_payment_method",
  "client_secret": "pi_1234567890_secret_abcd"
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confirm Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Confirm a payment intent with a payment method.</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`POST /payment-intents/{id}/confirm
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "payment_method": "pm_1234567890",
  "return_url": "https://yoursite.com/payment/complete"
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Retrieve Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Retrieve the details of a payment intent.</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`GET /payment-intents/{id}
Authorization: Bearer YOUR_API_KEY`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/api-reference/webhook-events')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Webhook Events
          </Button>
          <Button variant="outline" onClick={() => navigate('/documentation')}>
            Back to Documentation
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default PaymentAPIs;
