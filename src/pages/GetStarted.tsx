
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Calendar, Rocket, Shield, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Users,
      title: "Create Your Account",
      description: "Sign up with your business details and get verified quickly."
    },
    {
      icon: Shield,
      title: "Complete KYC",
      description: "Upload your documents for compliance and security verification."
    },
    {
      icon: Rocket,
      title: "Integrate & Go Live",
      description: "Use our APIs or payment links to start accepting payments immediately."
    },
    {
      icon: TrendingUp,
      title: "Scale Your Business",
      description: "Grow with our advanced features and dedicated support."
    }
  ];

  const features = [
    "Accept payments in 50+ currencies",
    "Automated invoice generation",
    "Real-time transaction monitoring",
    "Advanced fraud protection",
    "24/7 technical support",
    "White-label solutions available"
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
                Get Started with Maya Payments
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of businesses already using our secure, scalable payment solutions.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.open('https://calendly.com/founder-mayaexchange/maya-pg-collaboration', '_blank')}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Integration Call
              </Button>
            </div>
          </div>

          {/* Getting Started Steps */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How to Get Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="text-sm text-blue-600 font-medium mb-2">Step {index + 1}</div>
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-gray-50 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                What You Get
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Options Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Help Getting Started?
              </h2>
              <p className="text-xl text-gray-600">
                Our team is here to help you integrate and go live quickly.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Contact Our Team</CardTitle>
                  <CardDescription>
                    Get personalized assistance with your integration
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/contact')}
                    className="w-full"
                  >
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Schedule Integration Call</CardTitle>
                  <CardDescription>
                    Book a 30-minute session with our integration experts
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    size="lg"
                    onClick={() => window.open('https://calendly.com/founder-mayaexchange/maya-pg-collaboration', '_blank')}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="border-0 shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Transform Your Payments?</CardTitle>
                <CardDescription className="text-lg">
                  Get started today or schedule a call with our team to learn more.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <Button 
                    size="lg"
                    onClick={() => navigate('/login')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => window.open('https://calendly.com/founder-mayaexchange/maya-pg-collaboration', '_blank')}
                    className="flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Integration Call
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  No setup fees • Start accepting payments in minutes • 24/7 support
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GetStarted;
