"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Key, 
  Copy, 
  Eye, 
  EyeOff, 
  Plus, 
  Trash2,
  RefreshCw,
  Code,
  Book,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import DashboardLayout from '@/components/dashboard-layout';
import { toast } from 'sonner';

interface APIKey {
  id: string;
  name: string;
  publicKey: string;
  secretKey: string;
  status: 'active' | 'disabled';
  lastUsed: Date | null;
  createdAt: Date;
  permissions: string[];
}

// Mock API keys
const mockAPIKeys: APIKey[] = [
  {
    id: 'KEY-001',
    name: 'Production API Key',
    publicKey: 'pk_live_51234567890abcdef',
    secretKey: 'sk_live_98765432109876543',
    status: 'active',
    lastUsed: new Date('2024-01-15T10:30:00'),
    createdAt: new Date('2024-01-01T10:30:00'),
    permissions: ['payments:read', 'payments:write', 'webhooks:read']
  },
  {
    id: 'KEY-002',
    name: 'Development API Key',
    publicKey: 'pk_test_51234567890abcdef',
    secretKey: 'sk_test_98765432109876543',
    status: 'active',
    lastUsed: new Date('2024-01-14T16:45:00'),
    createdAt: new Date('2024-01-05T14:20:00'),
    permissions: ['payments:read', 'payments:write']
  }
];

export default function APIKeysPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [apiKeys, setAPIKeys] = useState<APIKey[]>(mockAPIKeys);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [newKeyName, setNewKeyName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const generateAPIKey = () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for your API key');
      return;
    }

    const newKey: APIKey = {
      id: `KEY-${String(apiKeys.length + 1).padStart(3, '0')}`,
      name: newKeyName,
      publicKey: `pk_live_${Math.random().toString(36).substring(2, 20)}`,
      secretKey: `sk_live_${Math.random().toString(36).substring(2, 30)}`,
      status: 'active',
      lastUsed: null,
      createdAt: new Date(),
      permissions: ['payments:read', 'payments:write']
    };

    setAPIKeys([newKey, ...apiKeys]);
    setNewKeyName('');
    setShowCreateForm(false);
    toast.success('API key created successfully! Please save the secret key securely.');
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const toggleSecretVisibility = (keyId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const deleteAPIKey = (keyId: string) => {
    setAPIKeys(apiKeys.filter(key => key.id !== keyId));
    toast.success('API key deleted successfully');
  };

  const regenerateAPIKey = (keyId: string) => {
    setAPIKeys(apiKeys.map(key => 
      key.id === keyId 
        ? {
            ...key,
            secretKey: `sk_live_${Math.random().toString(36).substring(2, 30)}`,
            publicKey: `pk_live_${Math.random().toString(36).substring(2, 20)}`
          }
        : key
    ));
    toast.success('API key regenerated successfully');
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
            <p className="text-gray-600">Manage your API keys for integration</p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="maya-gradient text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create API Key
          </Button>
        </div>

        {/* Create API Key Form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New API Key</CardTitle>
              <CardDescription>
                Generate a new API key pair for your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="keyName">API Key Name</Label>
                  <Input
                    id="keyName"
                    placeholder="e.g., Production API Key"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button onClick={generateAPIKey} className="maya-gradient text-white">
                    <Key className="w-4 h-4 mr-2" />
                    Generate API Key
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Keys List */}
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <Card key={apiKey.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Key className="w-5 h-5" />
                      <span>{apiKey.name}</span>
                    </CardTitle>
                    <CardDescription>
                      Created {apiKey.createdAt.toLocaleDateString()} • 
                      Last used {apiKey.lastUsed ? apiKey.lastUsed.toLocaleDateString() : 'Never'}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                      {apiKey.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => regenerateAPIKey(apiKey.id)}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAPIKey(apiKey.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Public Key */}
                <div className="space-y-2">
                  <Label>Public Key (Publishable)</Label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm">
                      {apiKey.publicKey}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey.publicKey, 'Public key')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Secret Key */}
                <div className="space-y-2">
                  <Label>Secret Key (Keep Private)</Label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm">
                      {showSecrets[apiKey.id] 
                        ? apiKey.secretKey 
                        : '••••••••••••••••••••••••••••••'
                      }
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSecretVisibility(apiKey.id)}
                    >
                      {showSecrets[apiKey.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(apiKey.secretKey, 'Secret key')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Permissions */}
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="flex flex-wrap gap-2">
                    {apiKey.permissions.map((permission) => (
                      <Badge key={permission} variant="outline">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {apiKeys.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No API Keys</h3>
                <p className="text-gray-600 mb-4">
                  Create your first API key to start integrating with Maya Payments
                </p>
                <Button 
                  onClick={() => setShowCreateForm(true)}
                  className="maya-gradient text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First API Key
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Documentation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Quick Start</span>
              </CardTitle>
              <CardDescription>
                Get started with Maya Payments API integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                  <div className="text-green-400 mb-2"># Install the Maya SDK</div>
                  <div>npm install maya-payments</div>
                  <div className="mt-3 text-green-400"># Initialize with your keys</div>
                  <div>const maya = new Maya('YOUR_PUBLIC_KEY');</div>
                </div>
                <Button variant="outline" className="w-full">
                  <Book className="w-4 h-4 mr-2" />
                  View Full Documentation
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Best Practices</CardTitle>
              <CardDescription>
                Keep your API keys secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Never expose secret keys in client-side code</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Store keys securely using environment variables</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Rotate keys regularly for enhanced security</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Use different keys for testing and production</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}