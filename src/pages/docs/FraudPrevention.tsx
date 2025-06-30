
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const FraudPrevention = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Fraud Prevention" 
      description="Advanced fraud detection and prevention mechanisms to protect your business"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Fraud Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Machine Learning Models</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Real-time transaction scoring</li>
                  <li>• Behavioral pattern analysis</li>
                  <li>• Device fingerprinting</li>
                  <li>• Velocity checks</li>
                  <li>• Geolocation verification</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Risk Assessment</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Low Risk</Badge>
                    <span className="text-sm">Score: 0-30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                    <span className="text-sm">Score: 31-70</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-red-100 text-red-800">High Risk</Badge>
                    <span className="text-sm">Score: 71-100</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3D Secure Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Enhanced security for card payments with 3D Secure 2.0 authentication, providing liability shift and reduced chargebacks.
            </p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// 3D Secure Configuration
{
  "payment_intent": "pi_1234567890",
  "three_d_secure": {
    "enabled": true,
    "challenge_preference": "automatic",
    "exemption_types": ["low_value", "trusted_merchant"],
    "soft_decline_handling": true
  },
  "authentication_data": {
    "cardholder_name": "John Doe",
    "billing_address": {
      "line1": "123 Main St",
      "city": "Mumbai",
      "postal_code": "400001",
      "country": "IN"
    }
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fraud Rules Engine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                Configure custom fraud rules to automatically block, review, or allow transactions based on your business requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Velocity Rules</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Transaction count limits</li>
                    <li>• Amount thresholds</li>
                    <li>• Time-based restrictions</li>
                    <li>• Customer-specific limits</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Blacklist Management</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Email address blocking</li>
                    <li>• IP address filtering</li>
                    <li>• Card BIN restrictions</li>
                    <li>• Device fingerprint blocking</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Fraud Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Receive real-time notifications about suspicious activities and fraud attempts.
            </p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`{
  "id": "evt_fraud_alert",
  "type": "fraud.detected",
  "created": 1640995200,
  "data": {
    "object": {
      "id": "pi_1234567890",
      "fraud_score": 85,
      "risk_level": "high",
      "detected_patterns": [
        "unusual_velocity",
        "suspicious_location",
        "device_mismatch"
      ],
      "recommended_action": "block"
    }
  }
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/security/data-protection')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Data Protection
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/security/encryption')}>
            Previous: Encryption
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default FraudPrevention;
