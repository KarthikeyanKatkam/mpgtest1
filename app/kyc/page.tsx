"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import DashboardLayout from '@/components/dashboard-layout';
import { toast } from 'sonner';

interface KYCDocument {
  id: string;
  type: 'identity' | 'business' | 'address' | 'bank';
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: Date;
  fileName: string;
  fileSize: string;
  rejectionReason?: string;
}

// Mock KYC documents
const mockDocuments: KYCDocument[] = [
  {
    id: 'DOC-001',
    type: 'identity',
    name: 'Government ID',
    status: 'approved',
    uploadedAt: new Date('2024-01-10T10:30:00'),
    fileName: 'passport.pdf',
    fileSize: '2.3 MB'
  },
  {
    id: 'DOC-002',
    type: 'business',
    name: 'Business Registration',
    status: 'pending',
    uploadedAt: new Date('2024-01-12T14:20:00'),
    fileName: 'business_registration.pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'DOC-003',
    type: 'address',
    name: 'Address Proof',
    status: 'rejected',
    uploadedAt: new Date('2024-01-08T09:15:00'),
    fileName: 'utility_bill.pdf',
    fileSize: '1.2 MB',
    rejectionReason: 'Document is older than 3 months. Please upload a recent utility bill.'
  }
];

const documentTypes = [
  {
    type: 'identity',
    name: 'Identity Verification',
    description: 'Government-issued ID (Passport, Driver\'s License, etc.)',
    required: true
  },
  {
    type: 'business',
    name: 'Business Registration',
    description: 'Business license or incorporation documents',
    required: true
  },
  {
    type: 'address',
    name: 'Address Proof',
    description: 'Utility bill or bank statement (within 3 months)',
    required: true
  },
  {
    type: 'bank',
    name: 'Bank Details',
    description: 'Bank account verification documents',
    required: false
  }
];

export default function KYCPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<KYCDocument[]>(mockDocuments);
  const [selectedType, setSelectedType] = useState('');
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadingFile || !selectedType) {
      toast.error('Please select a document type and file');
      return;
    }

    const newDocument: KYCDocument = {
      id: `DOC-${String(documents.length + 1).padStart(3, '0')}`,
      type: selectedType as any,
      name: documentTypes.find(dt => dt.type === selectedType)?.name || 'Document',
      status: 'pending',
      uploadedAt: new Date(),
      fileName: uploadingFile.name,
      fileSize: `${(uploadingFile.size / (1024 * 1024)).toFixed(1)} MB`
    };

    setDocuments([newDocument, ...documents]);
    setUploadingFile(null);
    setSelectedType('');
    
    toast.success('Document uploaded successfully! It will be reviewed within 24-48 hours.');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const getCompletionPercentage = () => {
    const requiredDocs = documentTypes.filter(dt => dt.required);
    if (requiredDocs.length === 0) return 0;
    const approvedDocs = documents.filter(doc => 
      doc.status === 'approved' && requiredDocs.some(req => req.type === doc.type)
    );
    return Math.round((approvedDocs.length / requiredDocs.length) * 100);
  };

  const completionPercentage = Math.max(0, Math.min(100, getCompletionPercentage()));

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">KYC Verification</h1>
            <p className="text-gray-600">Complete your Know Your Customer verification</p>
          </div>
          <Badge variant={user.kycStatus === 'verified' ? 'default' : 'secondary'}>
            KYC: {user.kycStatus}
          </Badge>
        </div>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Verification Progress</span>
              <Badge variant="outline">{completionPercentage}% Complete</Badge>
            </CardTitle>
            <CardDescription>
              Complete all required documents to activate full payment processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={completionPercentage} max={100} className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {documentTypes.map((docType) => {
                const userDoc = documents.find(doc => doc.type === docType.type);
                return (
                  <div key={docType.type} className="flex items-center space-x-3 p-3 border rounded-lg">
                    {getStatusIcon(userDoc?.status || 'pending')}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{docType.name}</p>
                      <p className="text-xs text-gray-500">
                        {docType.required ? 'Required' : 'Optional'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Upload your KYC documents for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="docType">Document Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((docType) => (
                        <SelectItem key={docType.type} value={docType.type}>
                          {docType.name} {docType.required && '*'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedType && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      {documentTypes.find(dt => dt.type === selectedType)?.description}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setUploadingFile(e.target.files?.[0] || null)}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Supported formats: PDF, JPG, PNG (Max 10MB)
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full maya-gradient text-white"
                  disabled={!selectedType || !uploadingFile}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Document Status */}
          <Card>
            <CardHeader>
              <CardTitle>Document Status</CardTitle>
              <CardDescription>
                Track the status of your uploaded documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <p className="text-sm text-gray-500">{doc.fileName}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>Size: {doc.fileSize}</span>
                      <span>Uploaded: {doc.uploadedAt.toLocaleDateString()}</span>
                    </div>

                    {doc.status === 'rejected' && doc.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">Rejection Reason</p>
                            <p className="text-sm text-red-700">{doc.rejectionReason}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      {doc.status === 'rejected' && (
                        <Button variant="outline" size="sm" className="text-blue-600">
                          <Upload className="w-4 h-4 mr-1" />
                          Re-upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {documents.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No documents uploaded yet. Start by uploading your identity verification.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Common questions about KYC verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">What documents do I need?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Government-issued photo ID</li>
                  <li>• Business registration documents</li>
                  <li>• Proof of address (utility bill)</li>
                  <li>• Bank account details (optional)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">How long does verification take?</h3>
                <p className="text-sm text-gray-600">
                  Most documents are reviewed within 24-48 hours. You'll receive an email 
                  notification once your documents are processed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}