
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  User,
  Building,
  CreditCard
} from 'lucide-react';

const KYCVerification = () => {
  const [uploadedDocs, setUploadedDocs] = useState({
    pan: false,
    aadhaar: false,
    passport: false,
    gst: false
  });

  const [verificationStep, setVerificationStep] = useState(2); // 0: Pending, 1: Under Review, 2: Approved

  const steps = [
    { id: 0, title: 'Document Upload', status: 'completed' },
    { id: 1, title: 'Under Review', status: 'completed' },
    { id: 2, title: 'Approved', status: 'current' },
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current': return <Clock className="h-5 w-5 text-blue-600" />;
      default: return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const handleFileUpload = (docType: string) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: true }));
  };

  const progress = Object.values(uploadedDocs).filter(Boolean).length * 25;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
        <p className="text-gray-600 mt-1">Complete your identity verification to access all features</p>
      </div>

      {/* Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Verification Progress</span>
          </CardTitle>
          <CardDescription>Track your KYC verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  {getStepIcon(step.status)}
                  <span className="text-sm font-medium mt-2">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-24 h-0.5 bg-gray-300 mx-4" />
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Verification Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-800">Verified</Badge>
            <span className="text-sm text-gray-600">Your account has been successfully verified</span>
          </div>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              🎉 Congratulations! Your KYC verification is complete. You can now access all payment features including crypto transactions and higher transaction limits.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Business Information</span>
          </CardTitle>
          <CardDescription>Your verified business details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" value="Maya Demo Merchant Pvt Ltd" readOnly className="bg-gray-50" />
            </div>
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Input id="businessType" value="Private Limited Company" readOnly className="bg-gray-50" />
            </div>
            <div>
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input id="gstNumber" value="29AABCU9603R1ZX" readOnly className="bg-gray-50" />
            </div>
            <div>
              <Label htmlFor="pan">PAN Number</Label>
              <Input id="pan" value="AABCU****X" readOnly className="bg-gray-50" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Document Verification</span>
          </CardTitle>
          <CardDescription>All required documents have been verified</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'pan', label: 'PAN Card', required: true },
              { key: 'aadhaar', label: 'Aadhaar Card', required: true },
              { key: 'gst', label: 'GST Certificate', required: true },
              { key: 'passport', label: 'Passport', required: false }
            ].map((doc) => (
              <div key={doc.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium">{doc.label}</p>
                    <p className="text-sm text-gray-600">
                      {doc.required ? 'Required' : 'Optional'}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Verified contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value="demo@maya.exchange" readOnly className="bg-gray-50" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value="+91 98765 43210" readOnly className="bg-gray-50" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Business Address</Label>
              <Input id="address" value="123 Business District, Mumbai, Maharashtra 400001" readOnly className="bg-gray-50" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCVerification;
