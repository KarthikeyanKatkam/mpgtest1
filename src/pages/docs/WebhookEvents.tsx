
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const WebhookEvents = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Webhook Events" 
      description="Learn how to handle webhook notifications from Maya Payments Gateway"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Webhook Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Webhooks allow Maya Payments Gateway to notify your application about events that happen in your account.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Key Benefits:</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>Real-time notifications about payment status changes</li>
                <li>Automatic order fulfillment</li>
                <li>Improved customer experience</li>
                <li>Reduced manual intervention</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">payment_intent.succeeded</h4>
                <p className="text-sm text-gray-600">Triggered when a payment is successfully completed.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">payment_intent.payment_failed</h4>
                <p className="text-sm text-gray-600">Triggered when a payment attempt fails.</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-yellow-700">payment_intent.requires_action</h4>
                <p className="text-sm text-gray-600">Triggered when additional customer action is required.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Payload Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`{
  "id": "evt_1234567890",
  "type": "payment_intent.succeeded",
  "created": 1640995200,
  "data": {
    "object": {
      "id": "pi_1234567890",
      "amount": 1000,
      "currency": "INR",
      "status": "succeeded",
      "customer": {
        "email": "customer@example.com",
        "name": "John Doe"
      }
    }
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Handling Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Example webhook handler in Node.js:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['maya-signature'];
  let event;

  try {
    event = maya.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log('Webhook signature verification failed.');
    return res.status(400).send('Webhook Error');
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded!', paymentIntent.id);
      // Fulfill the order
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed!');
      break;
    default:
      console.log('Unhandled event type');
  }

  res.json({received: true});
});`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/api-reference/error-codes')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Error Codes
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/api-reference/payment-apis')}>
            Previous: Payment APIs
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default WebhookEvents;
