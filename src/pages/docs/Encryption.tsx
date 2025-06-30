
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const Encryption = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Encryption" 
      description="Advanced encryption standards and data protection mechanisms"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Encryption Standards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Data in Transit</h4>
                <div className="space-y-2">
                  <Badge variant="secondary">TLS 1.3</Badge>
                  <p className="text-sm text-gray-600">
                    All API communications use TLS 1.3 with perfect forward secrecy and strong cipher suites.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Data at Rest</h4>
                <div className="space-y-2">
                  <Badge variant="secondary">AES-256</Badge>
                  <p className="text-sm text-gray-600">
                    All stored data is encrypted using AES-256 encryption with regularly rotated keys.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Hardware Security Modules (HSM)</h4>
                <p className="text-sm text-blue-800">
                  All encryption keys are generated, stored, and managed using FIPS 140-2 Level 3 certified HSMs.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Key Generation</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• True random number generation</li>
                    <li>• Cryptographically secure keys</li>
                    <li>• Regular key rotation</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Key Storage</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Hardware-based key storage</li>
                    <li>• Multi-party access control</li>
                    <li>• Tamper-resistant modules</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tokenization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Sensitive payment data is replaced with non-sensitive tokens, eliminating the risk of data exposure.
            </p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Example: Card tokenization flow
{
  "card_number": "4111111111111111",
  "expiry_month": "12",
  "expiry_year": "2025",
  "cvv": "123"
}

// Becomes secure token
{
  "token": "tok_1234567890abcdef",
  "last_four": "1111",
  "brand": "visa",
  "expiry_month": "12",
  "expiry_year": "2025"
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Implementation Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-700">✓ Recommended</h4>
                <ul className="text-sm text-gray-600 space-y-1 mt-2">
                  <li>• Always use HTTPS for payment forms</li>
                  <li>• Implement certificate pinning</li>
                  <li>• Use Maya's tokenization service</li>
                  <li>• Validate SSL certificates</li>
                </ul>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-semibold text-red-700">✗ Avoid</h4>
                <ul className="text-sm text-gray-600 space-y-1 mt-2">
                  <li>• Storing raw card data</li>
                  <li>• Using weak encryption algorithms</li>
                  <li>• Hardcoding encryption keys</li>
                  <li>• Transmitting data over HTTP</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/security/fraud-prevention')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Fraud Prevention
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/security/pci-compliance')}>
            Previous: PCI Compliance
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default Encryption;
