
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PCICompliance = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="PCI Compliance" 
      description="Payment Card Industry Data Security Standard compliance and certification"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle>PCI DSS Level 1 Certified</CardTitle>
                <p className="text-gray-600">Maya Payments Gateway is fully PCI DSS Level 1 compliant</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Our Certifications</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">PCI DSS Level 1 Service Provider</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">SOC 2 Type II Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">ISO 27001 Certified</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Your Compliance</h4>
                <div className="space-y-2">
                  <Badge variant="secondary">PCI DSS SAQ A Eligible</Badge>
                  <p className="text-sm text-gray-600">
                    By using Maya Payments Gateway, your business can qualify for the simplest PCI compliance validation.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Measures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Data Protection</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• End-to-end encryption (TLS 1.3)</li>
                  <li>• AES-256 data encryption at rest</li>
                  <li>• Tokenization of sensitive data</li>
                  <li>• Zero card data storage</li>
                  <li>• Secure key management (HSM)</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Access Controls</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Multi-factor authentication</li>
                  <li>• Role-based access control</li>
                  <li>• IP whitelisting</li>
                  <li>• Session management</li>
                  <li>• Audit logging</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">SAQ A Requirements</h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>Simplified validation for businesses using Maya Payments Gateway:</strong>
                  </p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Use only Maya's hosted payment pages</li>
                    <li>• Never store, process, or transmit card data</li>
                    <li>• Maintain secure network infrastructure</li>
                    <li>• Complete annual SAQ A questionnaire</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Best Practices</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use HTTPS for all payment-related pages</li>
                    <li>• Implement proper session management</li>
                    <li>• Regular security assessments</li>
                    <li>• Keep systems updated and patched</li>
                    <li>• Train staff on security awareness</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/security/encryption')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Encryption
          </Button>
          <Button variant="outline" onClick={() => navigate('/documentation')}>
            Back to Documentation
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default PCICompliance;
