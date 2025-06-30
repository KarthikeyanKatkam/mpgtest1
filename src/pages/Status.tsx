
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Status = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "Payment Processing",
      status: "operational",
      uptime: "99.9%",
      description: "Core payment processing services"
    },
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.8%",
      description: "REST API endpoints and authentication"
    },
    {
      name: "Webhook Delivery",
      status: "operational",
      uptime: "99.7%",
      description: "Real-time event notifications"
    },
    {
      name: "Dashboard",
      status: "operational",
      uptime: "99.9%",
      description: "Web dashboard and user interface"
    },
    {
      name: "Settlement System",
      status: "maintenance",
      uptime: "99.5%",
      description: "Automated settlement processing"
    }
  ];

  const incidents = [
    {
      date: "2025-01-15",
      title: "Scheduled Maintenance - Settlement System",
      status: "ongoing",
      description: "We are performing routine maintenance on our settlement system. No impact on payment processing expected."
    },
    {
      date: "2025-01-10",
      title: "API Latency Issues Resolved",
      status: "resolved",
      description: "We experienced elevated API response times between 2:00 PM and 2:30 PM IST. The issue has been resolved."
    },
    {
      date: "2025-01-05",
      title: "Dashboard Login Issues",
      status: "resolved",
      description: "Some users experienced difficulty logging into the dashboard. The issue was resolved within 15 minutes."
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'maintenance':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'issues':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800">Operational</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case 'issues':
        return <Badge className="bg-red-100 text-red-800">Issues</Badge>;
      case 'ongoing':
        return <Badge className="bg-blue-100 text-blue-800">Ongoing</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

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

      {/* Status Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                System Status
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time status and uptime monitoring for all Maya Payments Gateway services.
            </p>
          </div>

          {/* Overall Status */}
          <div className="mb-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">All Systems Operational</h2>
                    <p className="text-gray-600">Last updated: {new Date().toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Maya Payments Gateway is operating normally. One service is under scheduled maintenance.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Service Status */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Service Status</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(service.status)}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(service.status)}
                        <p className="text-sm text-gray-500 mt-1">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Incident History */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Incidents</h2>
            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{incident.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(incident.status)}
                        <span className="text-sm text-gray-500">{incident.date}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{incident.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">99.9%</h3>
                <p className="text-gray-600">Overall Uptime</p>
                <p className="text-sm text-gray-500 mt-2">Last 30 days</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-green-600 mb-2">120ms</h3>
                <p className="text-gray-600">Avg Response Time</p>
                <p className="text-sm text-gray-500 mt-2">API endpoints</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-indigo-600 mb-2">99.8%</h3>
                <p className="text-gray-600">Success Rate</p>
                <p className="text-sm text-gray-500 mt-2">Payment processing</p>
              </CardContent>
            </Card>
          </div>

          {/* Subscribe to Updates */}
          <div className="text-center">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stay Updated</h3>
                <p className="text-gray-600 mb-6">
                  Subscribe to receive real-time notifications about system status and planned maintenance.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  Subscribe to Status Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Status;
