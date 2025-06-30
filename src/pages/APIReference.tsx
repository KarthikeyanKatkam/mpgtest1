
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const APIReference = () => {
  const navigate = useNavigate();

  const endpoints = [
    {
      method: "POST",
      path: "/payments",
      description: "Create a new payment",
      params: ["amount", "currency", "customer_id"]
    },
    {
      method: "GET",
      path: "/payments/{id}",
      description: "Retrieve payment details",
      params: ["id"]
    },
    {
      method: "POST",
      path: "/refunds",
      description: "Process a refund",
      params: ["payment_id", "amount", "reason"]
    },
    {
      method: "GET",
      path: "/transactions",
      description: "List all transactions",
      params: ["limit", "offset", "status"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <img 
                src="/lovable-uploads/438cf714-65a7-4c46-80ee-f10fbd5afa0d.png" 
                alt="Maya Exchange" 
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Maya Payments Gateway
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* API Reference Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                API Reference
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete reference for Maya Payments Gateway REST API with examples and code snippets.
            </p>
          </div>

          {/* Base URL */}
          <div className="mb-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Base URL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                  <code className="text-lg">https://api.mayaexchange.co.in</code>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Authentication */}
          <div className="mb-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  All API requests must include your API key in the Authorization header:
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API Endpoints */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Endpoints</h2>
            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant={endpoint.method === 'GET' ? 'secondary' : 'default'}
                        className={endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-lg">{endpoint.path}</code>
                    </div>
                    <p className="text-gray-600">{endpoint.description}</p>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="request" className="w-full">
                      <TabsList>
                        <TabsTrigger value="request">Request</TabsTrigger>
                        <TabsTrigger value="response">Response</TabsTrigger>
                        <TabsTrigger value="example">Example</TabsTrigger>
                      </TabsList>
                      <TabsContent value="request" className="mt-4">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Parameters:</h4>
                          <ul className="list-disc pl-6 text-gray-600">
                            {endpoint.params.map((param, paramIndex) => (
                              <li key={paramIndex}><code>{param}</code></li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                      <TabsContent value="response" className="mt-4">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
                          <code>
                            {JSON.stringify({
                              "status": "success",
                              "data": {
                                "id": "pay_123456789",
                                "amount": 1000,
                                "currency": "INR",
                                "status": "completed"
                              }
                            }, null, 2)}
                          </code>
                        </div>
                      </TabsContent>
                      <TabsContent value="example" className="mt-4">
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg">
                          <code>
                            {`curl -X ${endpoint.method} https://api.mayaexchange.co.in${endpoint.path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                          </code>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* SDKs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">SDKs & Libraries</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Node.js", status: "Available" },
                { name: "Python", status: "Available" },
                { name: "PHP", status: "Available" },
                { name: "Java", status: "Coming Soon" },
                { name: "Ruby", status: "Coming Soon" },
                { name: "Go", status: "Coming Soon" }
              ].map((sdk, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{sdk.name}</h3>
                    <Badge variant={sdk.status === 'Available' ? 'default' : 'secondary'}>
                      {sdk.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default APIReference;
