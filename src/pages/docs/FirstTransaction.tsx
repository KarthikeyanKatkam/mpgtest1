
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const FirstTransaction = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="First Transaction" 
      description="Complete guide to processing your first payment with Maya Payments Gateway"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Create a Payment Intent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Start by creating a payment intent to initialize the payment process:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
              <pre className="text-sm">
{`curl -X POST https://api.mayaexchange.co.in/payment-intents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "currency": "INR",
    "customer": {
      "email": "customer@example.com",
      "name": "John Doe"
    },
    "payment_methods": ["card", "upi", "wallet"],
    "metadata": {
      "order_id": "order_123",
      "description": "Product purchase"
    }
  }'`}
              </pre>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Response:</h4>
              <pre className="text-sm text-green-800 overflow-x-auto">
{`{
  "id": "pi_1234567890",
  "amount": 1000,
  "currency": "INR",
  "status": "requires_payment_method",
  "client_secret": "pi_1234567890_secret_abcd",
  "created": 1640995200
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 2: Collect Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Use our secure payment form to collect customer payment details:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Initialize Maya Payments SDK
const maya = MayaPayments('YOUR_PUBLISHABLE_KEY');

// Create payment form
const paymentForm = maya.elements();
const cardElement = paymentForm.create('card');
cardElement.mount('#card-element');

// Handle form submission
document.getElementById('payment-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const {error, paymentMethod} = await maya.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: {
      name: 'John Doe',
      email: 'customer@example.com',
    },
  });
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('PaymentMethod:', paymentMethod);
    // Proceed to confirm payment
  }
});`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 3: Confirm Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Confirm the payment using the payment method created in step 2:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`curl -X POST https://api.mayaexchange.co.in/payment-intents/pi_1234567890/confirm \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "payment_method": "pm_1234567890",
    "return_url": "https://yoursite.com/payment/complete"
  }'`}
              </pre>
            </div>
            <div className="bg-green-50 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-green-900 mb-2">Successful Response:</h4>
              <pre className="text-sm text-green-800 overflow-x-auto">
{`{
  "id": "pi_1234567890",
  "amount": 1000,
  "currency": "INR",
  "status": "succeeded",
  "payment_method": "pm_1234567890",
  "charges": {
    "data": [{
      "id": "ch_1234567890",
      "amount": 1000,
      "paid": true,
      "status": "succeeded"
    }]
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Step 4: Handle Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Different payment statuses require different handling:</p>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">succeeded</h4>
                <p className="text-sm text-gray-600">Payment completed successfully. Deliver the product/service.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700">requires_action</h4>
                <p className="text-sm text-gray-600">Additional authentication required (3D Secure). Follow next_action instructions.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">payment_failed</h4>
                <p className="text-sm text-gray-600">Payment failed. Show error message to customer.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complete Example (Node.js)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`const maya = require('maya-payments-node');
maya.setApiKey('YOUR_SECRET_KEY');

// Create payment intent
const paymentIntent = await maya.paymentIntents.create({
  amount: 1000,
  currency: 'INR',
  customer: {
    email: 'customer@example.com',
    name: 'John Doe'
  }
});

console.log('Payment Intent:', paymentIntent.id);
console.log('Client Secret:', paymentIntent.client_secret);

// On your frontend, use the client_secret to complete the payment
// The payment will be automatically confirmed once successful`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testing Your Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Use these test scenarios to verify your integration:</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Successful card payment</span>
                <code className="text-sm">4111 1111 1111 1111</code>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Card declined</span>
                <code className="text-sm">4000 0000 0000 0002</code>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Requires authentication</span>
                <code className="text-sm">4000 0025 0000 3155</code>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/api-reference/payment-apis')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Payment APIs
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/getting-started/test-environment')}>
            Previous: Test Environment
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default FirstTransaction;
