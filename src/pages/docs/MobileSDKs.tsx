
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const MobileSDKs = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Mobile SDKs" 
      description="Native mobile SDK integration for iOS and Android applications"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Available SDKs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">iOS</Badge>
                  <h3 className="text-lg font-semibold">Swift SDK</h3>
                </div>
                <p className="text-gray-600 mb-4">Native iOS SDK for seamless payment integration</p>
                <div className="bg-gray-900 text-white p-4 rounded-lg text-sm">
                  <pre>pod 'MayaPaymentsSDK'</pre>
                </div>
              </div>
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary">Android</Badge>
                  <h3 className="text-lg font-semibold">Kotlin SDK</h3>
                </div>
                <p className="text-gray-600 mb-4">Native Android SDK with modern Kotlin support</p>
                <div className="bg-gray-900 text-white p-4 rounded-lg text-sm">
                  <pre>implementation 'com.maya:payments-sdk:1.0.0'</pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>iOS Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`import MayaPaymentsSDK

class PaymentViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let config = MayaConfig(
            apiKey: "your_api_key",
            environment: .sandbox
        )
        
        MayaPayments.initialize(config: config)
    }
    
    func processPayment() {
        let paymentIntent = PaymentIntent(
            amount: 1000,
            currency: "INR"
        )
        
        MayaPayments.presentPaymentSheet(
            paymentIntent: paymentIntent,
            presentingViewController: self
        ) { result in
            switch result {
            case .completed:
                print("Payment successful")
            case .canceled:
                print("Payment canceled")
            case .failed(let error):
                print("Payment failed: \\(error)")
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
            <CardTitle>Android Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`class MainActivity : AppCompatActivity() {
    private lateinit var mayaPayments: MayaPayments
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        mayaPayments = MayaPayments(
            context = this,
            apiKey = "your_api_key",
            environment = Environment.SANDBOX
        )
    }
    
    private fun processPayment() {
        val paymentIntent = PaymentIntent.Builder()
            .setAmount(1000)
            .setCurrency("INR")
            .build()
            
        mayaPayments.presentPaymentSheet(
            paymentIntent = paymentIntent,
            callback = object : PaymentResultCallback {
                override fun onSuccess(result: PaymentResult) {
                    Log.d("Payment", "Success: \${result.paymentIntentId}")
                }
                
                override fun onError(error: PaymentError) {
                    Log.e("Payment", "Error: \${error.message}")
                }
                
                override fun onCanceled() {
                    Log.d("Payment", "Canceled")
                }
            }
        )
    }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/integration/ecommerce-plugins')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: E-commerce Plugins
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/integration/web-integration')}>
            Previous: Web Integration
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default MobileSDKs;
