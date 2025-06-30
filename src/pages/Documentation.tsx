
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Zap, Shield, ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Documentation = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Quick start guide to integrate Maya Payments Gateway",
      items: [
        { name: "Account Setup", path: "/docs/getting-started/account-setup" },
        { name: "API Keys", path: "/docs/getting-started/api-keys" },
        { name: "Test Environment", path: "/docs/getting-started/test-environment" },
        { name: "First Transaction", path: "/docs/getting-started/first-transaction" }
      ]
    },
    {
      icon: Code,
      title: "API Reference",
      description: "Complete API documentation with examples",
      items: [
        { name: "Payment APIs", path: "/docs/api-reference/payment-apis" },
        { name: "Webhook Events", path: "/docs/api-reference/webhook-events" },
        { name: "Error Codes", path: "/docs/api-reference/error-codes" },
        { name: "Rate Limits", path: "/docs/api-reference/rate-limits" }
      ]
    },
    {
      icon: Zap,
      title: "Integration Guides",
      description: "Step-by-step integration for different platforms",
      items: [
        { name: "Web Integration", path: "/docs/integration/web-integration" },
        { name: "Mobile SDKs", path: "/docs/integration/mobile-sdks" },
        { name: "E-commerce Plugins", path: "/docs/integration/ecommerce-plugins" },
        { name: "Custom Solutions", path: "/docs/integration/custom-solutions" }
      ]
    },
    {
      icon: Shield,
      title: "Security",
      description: "Security best practices and compliance",
      items: [
        // Temporarily disabled PCI Compliance
        // { name: "PCI Compliance", path: "/docs/security/pci-compliance" },
        { name: "Encryption", path: "/docs/security/encryption" },
        { name: "Fraud Prevention", path: "/docs/security/fraud-prevention" },
        { name: "Data Protection", path: "/docs/security/data-protection" }
      ]
    }
  ];

  const popularTopics = [
    { name: "Payment Integration", path: "/docs/integration/web-integration" },
    { name: "Webhook Setup", path: "/docs/api-reference/webhook-events" },
    { name: "Error Handling", path: "/docs/api-reference/error-codes" },
    { name: "Testing Guide", path: "/docs/getting-started/test-environment" },
    { name: "Mobile SDK", path: "/docs/integration/mobile-sdks" },
    { name: "Security Best Practices", path: "/docs/security/pci-compliance" },
    { name: "Compliance", path: "/docs/security/pci-compliance" },
    { name: "Troubleshooting", path: "/docs/api-reference/error-codes" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to integrate and use Maya Payments Gateway effectively.
            </p>
          </div>

          <div className="mb-16">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
                <p className="text-blue-100 mb-6">
                  Get up and running with Maya Payments Gateway in just a few steps.
                </p>
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <code className="text-sm block">
                    curl -X POST https://api.mayaexchange.co.in/payments \<br />
                    &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY" \<br />
                    &nbsp;&nbsp;-H "Content-Type: application/json" \<br />
                    &nbsp;&nbsp;-d {JSON.stringify({amount: 1000, currency: "INR"})}
                  </code>
                </div>
                <Button 
                  variant="secondary" 
                  className="text-blue-600"
                  onClick={() => navigate('/docs/getting-started/first-transaction')}
                >
                  View Full Example
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <p className="text-gray-600 text-sm">{section.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex} 
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                          onClick={() => navigate(item.path)}
                        >
                          <span className="text-gray-700">{item.name}</span>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Popular Topics</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {popularTopics.map((topic, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm px-4 py-2 cursor-pointer hover:bg-blue-100"
                  onClick={() => navigate(topic.path)}
                >
                  {topic.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Contact Support
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://calendly.com/founder-mayaexchange/maya-intern-call', '_blank')}
                  >
                    Schedule Integration Call
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
