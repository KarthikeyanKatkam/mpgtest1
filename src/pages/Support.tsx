
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Mail, Phone, Book, Clock, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      action: "Start Chat"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions or issues",
      availability: "Response within 4 hours",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our technical team",
      availability: "Mon-Fri, 9 AM - 6 PM IST",
      action: "Call Now"
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Browse our comprehensive guides",
      availability: "Always available",
      action: "View Docs"
    }
  ];

  const faqs = [
    {
      question: "How do I get API keys?",
      answer: "You can generate API keys from your dashboard after completing account verification."
    },
    {
      question: "What payment methods are supported?",
      answer: "We support 20+ card providers, UPI, NEFT, RTGS, IMPS, and various cryptocurrencies."
    },
    {
      question: "How long does settlement take?",
      answer: "Settlements are processed within 24-48 hours for most payment methods."
    },
    {
      question: "Is there a transaction limit?",
      answer: "Transaction limits vary based on your account type and verification level."
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

      {/* Support Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Support Center
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get the help you need, when you need it. Our support team is here to assist you.
            </p>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <option.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">{option.availability}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                  <div>
                    <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                    <a 
                      href="mailto:sales@mayaexchange.co.in" 
                      className="text-blue-600 hover:text-blue-700"
                    >
                      sales@mayaexchange.co.in
                    </a>
                  </div>
                  <div>
                    <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                    <a 
                      href="tel:+917981703460" 
                      className="text-blue-600 hover:text-blue-700"
                    >
                      +91 79817 03460
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-6 w-6 text-blue-600" />
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 pl-9">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="text-center">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Additional Resources</h3>
                <p className="text-gray-600 mb-6">
                  Explore our knowledge base and community for more help and discussions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/documentation')} variant="outline">
                    Documentation
                  </Button>
                  <Button onClick={() => navigate('/api-reference')} variant="outline">
                    API Reference
                  </Button>
                  <Button variant="outline">
                    Community Forum
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

export default Support;
