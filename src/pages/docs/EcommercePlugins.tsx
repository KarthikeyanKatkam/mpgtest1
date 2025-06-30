
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const EcommercePlugins = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="E-commerce Plugins" 
      description="Ready-to-use plugins for popular e-commerce platforms"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Supported Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 text-center">
                <Badge variant="secondary" className="mb-3">WordPress</Badge>
                <h3 className="text-lg font-semibold mb-2">WooCommerce</h3>
                <p className="text-gray-600 text-sm mb-4">Official plugin for WooCommerce</p>
                <Button size="sm" className="w-full">Download Plugin</Button>
              </div>
              <div className="border rounded-lg p-6 text-center">
                <Badge variant="secondary" className="mb-3">Magento</Badge>
                <h3 className="text-lg font-semibold mb-2">Magento 2</h3>
                <p className="text-gray-600 text-sm mb-4">Native Magento 2 extension</p>
                <Button size="sm" className="w-full">Download Extension</Button>
              </div>
              <div className="border rounded-lg p-6 text-center">
                <Badge variant="secondary" className="mb-3">Shopify</Badge>
                <h3 className="text-lg font-semibold mb-2">Shopify App</h3>
                <p className="text-gray-600 text-sm mb-4">Available on Shopify App Store</p>
                <Button size="sm" className="w-full">Install App</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>WooCommerce Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Step 1: Install Plugin</h4>
                <p className="text-sm text-gray-600">Download and install the Maya Payments Gateway plugin from the WordPress repository.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Step 2: Configure Settings</h4>
                <p className="text-sm text-gray-600">Navigate to WooCommerce → Settings → Payments and configure your API keys.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Step 3: Test Integration</h4>
                <p className="text-sm text-gray-600">Enable test mode and process a test transaction to verify the setup.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuration Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// WooCommerce Plugin Configuration
add_filter('woocommerce_payment_gateways', 'add_maya_gateway_class');

function add_maya_gateway_class($gateways) {
    $gateways[] = 'WC_Maya_Gateway';
    return $gateways;
}

class WC_Maya_Gateway extends WC_Payment_Gateway {
    public function __construct() {
        $this->id = 'maya_payments';
        $this->title = 'Maya Payments Gateway';
        $this->description = 'Pay securely with cards, UPI, and more';
        $this->has_fields = false;
        
        $this->init_form_fields();
        $this->init_settings();
        
        $this->api_key = $this->get_option('api_key');
        $this->test_mode = $this->get_option('testmode');
    }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/integration/custom-solutions')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Custom Solutions
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/integration/mobile-sdks')}>
            Previous: Mobile SDKs
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default EcommercePlugins;
