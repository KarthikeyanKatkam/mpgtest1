
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Globe, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

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
                About Maya Payments Gateway
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering businesses with seamless payment solutions that bridge traditional finance and digital currencies.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-16 border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                At Maya Payments Gateway, we're committed to democratizing financial technology by providing 
                businesses of all sizes with enterprise-grade payment infrastructure. We believe that every 
                business should have access to modern payment solutions that help them grow and serve their 
                customers better.
              </p>
            </CardContent>
          </Card>

          {/* Key Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Security First</CardTitle>
                <CardDescription>
                  Bank-grade security with PCI DSS compliance and end-to-end encryption.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Ultra-fast transaction processing with real-time settlement capabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Global Reach</CardTitle>
                <CardDescription>
                  Accept payments from customers worldwide with multi-currency support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Customer Centric</CardTitle>
                <CardDescription>
                  Dedicated support team available 24/7 to help you succeed.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Company Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2023, Maya Payments Gateway emerged from a simple observation: 
                  businesses needed a payment solution that could seamlessly handle both 
                  traditional and digital currencies without the complexity of managing 
                  multiple providers.
                </p>
                <p>
                  Our team of financial technology experts, blockchain developers, and 
                  payment industry veterans came together to create a unified platform 
                  that makes accepting payments as simple as sending an email.
                </p>
                <p>
                  Today, we serve thousands of businesses across the globe, from small 
                  startups to enterprise corporations, helping them accept payments 
                  in over 100 currencies and cryptocurrencies.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">By the Numbers</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Transactions Processed</span>
                  <span className="font-bold">₹50+ Crores</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Merchants</span>
                  <span className="font-bold">10,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Countries Served</span>
                  <span className="font-bold">50+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Uptime</span>
                  <span className="font-bold">99.9%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Meet Our Team</CardTitle>
              <CardDescription className="text-lg">
                Experienced professionals dedicated to your success
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-lg">Arjun Sharma</h4>
                <p className="text-gray-600">CEO & Founder</p>
                <p className="text-sm text-gray-500 mt-2">
                  Former fintech executive with 15+ years in payments
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-lg">Priya Patel</h4>
                <p className="text-gray-600">CTO</p>
                <p className="text-sm text-gray-500 mt-2">
                  Blockchain expert and former senior engineer at major tech companies
                </p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold text-lg">Rahul Gupta</h4>
                <p className="text-gray-600">Head of Business</p>
                <p className="text-sm text-gray-500 mt-2">
                  Strategic partnerships and business development specialist
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of businesses already using Maya Payments Gateway
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/login')}
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/contact')}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
