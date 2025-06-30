
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Key, 
  Plus, 
  Copy, 
  Eye, 
  EyeOff,
  Trash2,
  Code,
  Shield,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';

const APIKeys = () => {
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<{ [key: string]: boolean }>({});

  const apiKeys = [
    {
      id: 'ak_live_1234567890abcdef',
      name: 'Production API Key',
      type: 'live',
      permissions: ['read', 'write'],
      created: '2024-01-01',
      lastUsed: '2024-01-15 14:30',
      status: 'active'
    },
    {
      id: 'ak_test_abcdef1234567890',
      name: 'Development API Key',
      type: 'test',
      permissions: ['read', 'write'],
      created: '2024-01-05',
      lastUsed: '2024-01-15 12:15',
      status: 'active'
    },
    {
      id: 'ak_live_fedcba0987654321',
      name: 'Mobile App API Key',
      type: 'live',
      permissions: ['read'],
      created: '2024-01-10',
      lastUsed: 'Never',
      status: 'inactive'
    }
  ];

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const maskApiKey = (key: string) => {
    return `${key.substring(0, 8)}${'*'.repeat(24)}${key.slice(-8)}`;
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    return type === 'live' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-600 mt-1">Manage your API keys for integrating with Maya Payments Gateway</p>
        </div>
        <Button onClick={() => setShowCreateKey(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Generate API Key
        </Button>
      </div>

      {/* Security Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-amber-600" />
            <span>Security Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-medium text-amber-800">Important Security Tips</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Never share your API keys in public repositories or client-side code</li>
                  <li>• Use test keys for development and live keys only in production</li>
                  <li>• Regularly rotate your API keys for enhanced security</li>
                  <li>• Monitor API usage and revoke unused keys immediately</li>
                  <li>• Implement proper error handling in your applications</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Your API Keys</span>
          </CardTitle>
          <CardDescription>Manage and monitor your API key usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium">{apiKey.name}</h3>
                    <Badge className={getTypeColor(apiKey.type)}>
                      {apiKey.type}
                    </Badge>
                    <Badge className={getStatusColor(apiKey.status)}>
                      {apiKey.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                      {visibleKeys[apiKey.id] ? apiKey.id : maskApiKey(apiKey.id)}
                    </code>
                    <span>Permissions: {apiKey.permissions.join(', ')}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                    <span>Created: {apiKey.created}</span>
                    <span>Last used: {apiKey.lastUsed}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                  >
                    {visibleKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(apiKey.id)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create API Key Form */}
      {showCreateKey && (
        <Card>
          <CardHeader>
            <CardTitle>Generate New API Key</CardTitle>
            <CardDescription>Create a new API key for your integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="keyName">Key Name</Label>
                <Input id="keyName" placeholder="e.g., Production API Key" />
              </div>
              <div>
                <Label htmlFor="keyType">Key Type</Label>
                <Input id="keyType" placeholder="live or test" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="permissions">Permissions</Label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Read</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked />
                    <span>Write</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button>Generate Key</Button>
              <Button variant="outline" onClick={() => setShowCreateKey(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>API Usage Statistics</CardTitle>
          <CardDescription>Monitor your API usage and limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2,847</div>
              <p className="text-sm text-gray-600">Requests Today</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">45ms</div>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Integration Examples</span>
          </CardTitle>
          <CardDescription>Sample code snippets for common integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* cURL Example */}
            <div>
              <h4 className="font-medium mb-2">cURL</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`curl -X POST https://api.maya.exchange/v1/payments \\
  -H "Authorization: Bearer ak_live_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000,
    "currency": "INR",
    "customer_email": "customer@example.com"
  }'`}
                </pre>
              </div>
            </div>

            {/* JavaScript Example */}
            <div>
              <h4 className="font-medium mb-2">JavaScript</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`const maya = require('maya-payments');
maya.setApiKey('ak_live_1234567890abcdef');

const payment = await maya.payments.create({
  amount: 1000,
  currency: 'INR',
  customer_email: 'customer@example.com'
});`}
                </pre>
              </div>
            </div>

            {/* Python Example */}
            <div>
              <h4 className="font-medium mb-2">Python</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`import maya

maya.api_key = "ak_live_1234567890abcdef"

payment = maya.Payment.create(
    amount=1000,
    currency='INR',
    customer_email='customer@example.com'
)`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeys;
