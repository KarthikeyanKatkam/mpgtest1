
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CustomSolutions = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Custom Solutions" 
      description="Tailored payment solutions for enterprise and custom requirements"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Enterprise Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">White Label Solutions</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Custom branding and UI</li>
                  <li>• Dedicated infrastructure</li>
                  <li>• Custom domain setup</li>
                  <li>• Advanced reporting</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">API Customization</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Custom endpoints</li>
                  <li>• Extended webhook events</li>
                  <li>• Custom payment flows</li>
                  <li>• Advanced authentication</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketplace Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Build multi-vendor marketplaces with split payments, escrow services, and automated disbursements.
            </p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Marketplace Payment Example
{
  "amount": 10000,
  "currency": "INR",
  "marketplace_fee": 500,
  "transfers": [
    {
      "vendor_id": "vendor_123",
      "amount": 9000,
      "description": "Product sale to John Doe"
    },
    {
      "vendor_id": "platform",
      "amount": 500,
      "description": "Platform commission"
    }
  ],
  "escrow": {
    "enabled": true,
    "release_condition": "delivery_confirmed"
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription & Recurring Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Advanced subscription management with flexible billing cycles and dunning management.
            </p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Subscription Setup
{
  "plan_id": "premium_monthly",
  "customer_id": "cust_123",
  "billing_cycle": "monthly",
  "amount": 2999,
  "trial_period_days": 14,
  "dunning_settings": {
    "retry_attempts": 3,
    "retry_interval": "daily"
  },
  "proration": true
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started with Custom Solutions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Our team will work with you to design and implement a payment solution that fits your specific business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => window.open('https://calendly.com/founder-mayaexchange/maya-intern-call', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                Schedule Consultation
              </Button>
              <Button variant="outline" onClick={() => navigate('/contact')}>
                Contact Sales Team
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/security/pci-compliance')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Security & Compliance
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/integration/ecommerce-plugins')}>
            Previous: E-commerce Plugins
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default CustomSolutions;
