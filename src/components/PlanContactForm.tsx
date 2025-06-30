
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PlanContactFormProps {
  selectedPlan: string;
  isOpen: boolean;
  onClose: () => void;
}

const PlanContactForm = ({ selectedPlan, isOpen, onClose }: PlanContactFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    monthlyVolume: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Request Submitted!",
        description: "Our team will contact you within 24 hours to discuss your requirements."
      });
      
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        website: '',
        monthlyVolume: '',
        message: ''
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl">Get Started with {selectedPlan}</CardTitle>
          <CardDescription>
            Fill out your details and our team will contact you to set up your payment gateway.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Business Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@company.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your company name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyVolume">Expected Monthly Volume</Label>
                <Input
                  id="monthlyVolume"
                  value={formData.monthlyVolume}
                  onChange={(e) => handleInputChange('monthlyVolume', e.target.value)}
                  placeholder="e.g., ₹10,00,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Requirements</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Tell us about your specific requirements, integration needs, or any questions..."
                rows={4}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Selected Plan: {selectedPlan}</h4>
              <p className="text-sm text-blue-700">
                Our team will customize the setup based on your selected plan and specific requirements.
              </p>
            </div>

            <div className="flex space-x-4">
              <Button 
                type="submit" 
                className="flex-1" 
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => window.open('https://calendly.com/founder-mayaexchange/maya-pg-collaboration', '_blank')}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanContactForm;
