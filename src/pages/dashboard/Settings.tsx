
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Building, 
  Shield, 
  Bell, 
  Webhook,
  Save,
  Settings as SettingsIcon,
  Mail,
  Phone,
  Lock,
  Globe,
  CreditCard
} from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    webhook: true,
    marketing: false
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const toggleNotification = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences and business settings</p>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Business Information</span>
          </CardTitle>
          <CardDescription>Update your business details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" defaultValue="Maya Demo Merchant Pvt Ltd" />
            </div>
            <div>
              <Label htmlFor="businessType">Business Type</Label>
              <Input id="businessType" defaultValue="Private Limited Company" />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" defaultValue="India" />
            </div>
            <div>
              <Label htmlFor="baseCurrency">Base Currency</Label>
              <Input id="baseCurrency" defaultValue="INR" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input id="businessAddress" defaultValue="123 Business District, Mumbai, Maharashtra 400001" />
            </div>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Account Information</span>
          </CardTitle>
          <CardDescription>Manage your personal account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="Demo Merchant" />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="demo@maya.exchange" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+91 98765 43210" />
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="Asia/Kolkata" />
            </div>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Update Account
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security & Authentication</span>
          </CardTitle>
          <CardDescription>Manage your account security and authentication settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="space-y-4">
            <h4 className="font-medium">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <Button variant="outline">
              <Lock className="h-4 w-4 mr-2" />
              Update Password
            </Button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          {/* Login Sessions */}
          <div className="space-y-4">
            <h4 className="font-medium">Active Sessions</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-gray-600">Chrome on Windows • Mumbai, India</p>
                </div>
                <span className="text-sm text-green-600">Active now</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Mobile App</p>
                  <p className="text-sm text-gray-600">iOS App • Mumbai, India</p>
                </div>
                <Button variant="outline" size="sm">Revoke</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Preferences</span>
          </CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'email', icon: Mail, title: 'Email Notifications', desc: 'Receive updates via email' },
            { key: 'sms', icon: Phone, title: 'SMS Notifications', desc: 'Receive alerts via SMS' },
            { key: 'webhook', icon: Webhook, title: 'Webhook Notifications', desc: 'Send events to your server' },
            { key: 'marketing', icon: Globe, title: 'Marketing Communications', desc: 'Product updates and offers' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <notification.icon className="h-5 w-5 text-gray-600" />
                <div>
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.desc}</p>
                </div>
              </div>
              <Switch
                checked={notifications[notification.key as keyof typeof notifications]}
                onCheckedChange={() => toggleNotification(notification.key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Webhook className="h-5 w-5" />
            <span>Webhook Configuration</span>
          </CardTitle>
          <CardDescription>Configure webhooks for real-time event notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input id="webhookUrl" placeholder="https://your-server.com/webhook" />
            </div>
            <div>
              <Label htmlFor="webhookSecret">Webhook Secret</Label>
              <Input id="webhookSecret" placeholder="Your webhook secret" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Events to Subscribe</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['payment.completed', 'payment.failed', 'invoice.created', 'settlement.processed'].map((event) => (
                <label key={event} className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">{event}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button>Save Webhook</Button>
            <Button variant="outline">Test Webhook</Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Settings</span>
          </CardTitle>
          <CardDescription>Configure payment processing preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="settlementPeriod">Settlement Period</Label>
              <Input id="settlementPeriod" defaultValue="Daily" />
            </div>
            <div>
              <Label htmlFor="minimumSettlement">Minimum Settlement Amount</Label>
              <Input id="minimumSettlement" defaultValue="₹1,000" />
            </div>
            <div>
              <Label htmlFor="transactionLimit">Daily Transaction Limit</Label>
              <Input id="transactionLimit" defaultValue="₹10,00,000" />
            </div>
            <div>
              <Label htmlFor="refundPolicy">Auto Refund Policy</Label>
              <Input id="refundPolicy" defaultValue="7 days" />
            </div>
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Payment Settings
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
            <p className="text-sm text-red-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
