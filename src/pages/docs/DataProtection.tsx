
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, Users, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DataProtection = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Data Protection" 
      description="Comprehensive data protection and privacy compliance measures"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Globe className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">GDPR Compliance</h4>
                  <p className="text-sm text-gray-600">Full compliance with EU General Data Protection Regulation</p>
                  <Badge variant="secondary" className="mt-2">EU Certified</Badge>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">DPDP Act</h4>
                  <p className="text-sm text-gray-600">Compliance with India's Digital Personal Data Protection Act</p>
                  <Badge variant="secondary" className="mt-2">India Certified</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Handling Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Data Minimization</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Collect only necessary data</li>
                  <li>• Purpose limitation</li>
                  <li>• Retention period limits</li>
                  <li>• Automatic data deletion</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">User Rights</h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Right to access</li>
                  <li>• Right to rectification</li>
                  <li>• Right to erasure</li>
                  <li>• Data portability</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Processing Transparency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Data We Process</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Transaction Data</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Payment amount and currency</li>
                      <li>• Transaction timestamp</li>
                      <li>• Payment method details</li>
                      <li>• Merchant information</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Customer Data</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Name and email address</li>
                      <li>• Billing address</li>
                      <li>• Device information</li>
                      <li>• IP address (for fraud prevention)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Data We Don't Store</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Full card numbers (tokenized)</li>
                  <li>• CVV codes</li>
                  <li>• PIN numbers</li>
                  <li>• Sensitive authentication data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Subject Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              We provide APIs and tools to help you handle data subject requests efficiently.
            </p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Data Export Request
POST /data-subject/export
{
  "customer_id": "cust_123",
  "email": "customer@example.com",
  "request_type": "data_export"
}

// Data Deletion Request
POST /data-subject/delete
{
  "customer_id": "cust_123",
  "email": "customer@example.com",
  "request_type": "data_deletion",
  "retention_override": false
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h5 className="font-semibold mb-2">Privacy Policy</h5>
                <Button size="sm" variant="outline" className="w-full">
                  Download
                </Button>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h5 className="font-semibold mb-2">DPA Template</h5>
                <Button size="sm" variant="outline" className="w-full">
                  Download
                </Button>
              </div>
              <div className="border rounded-lg p-4 text-center">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h5 className="font-semibold mb-2">Security Audit</h5>
                <Button size="sm" variant="outline" className="w-full">
                  Request
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/documentation')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Back to Documentation
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/security/fraud-prevention')}>
            Previous: Fraud Prevention
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default DataProtection;
