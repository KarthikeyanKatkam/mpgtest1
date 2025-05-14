import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Lock, Bell, Shield, Eye, EyeOff } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'security', label: 'Security', icon: <Lock size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'advanced', label: 'Advanced', icon: <Shield size={16} /> },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h3>
            
            <form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  label="Username"
                  defaultValue={user?.username}
                  fullWidth
                />
                <Input
                  label="Email Address"
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  fullWidth
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <User size={24} />
                  </div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="UTC"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time (EST)</option>
                  <option value="CST">Central Time (CST)</option>
                  <option value="PST">Pacific Time (PST)</option>
                </select>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </>
        );
      
      case 'security':
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h3>
            
            <form className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Change Password</h4>
                
                <div className="relative">
                  <Input
                    label="Current Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                <Input
                  label="New Password"
                  type="password"
                  fullWidth
                />
                
                <Input
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                />
              </div>
              
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Use an authenticator app to generate verification codes
                    </p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Receive a verification code via SMS
                    </p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Set up
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </>
        );
      
      case 'notifications':
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h3>
            
            <form className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Transaction Updates</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Receive emails when your transactions are processed
                    </p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Receive emails for security-related events
                    </p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Updates</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Receive emails about new features and promotions
                    </p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900">Push Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Push Notifications</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Receive notifications on your device
                    </p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <Button type="submit">
                  Save Preferences
                </Button>
              </div>
            </form>
          </>
        );
      
      case 'advanced':
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Advanced Settings</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">API Access</h4>
                <p className="text-sm text-gray-600">
                  Generate API keys to integrate with Maya Payment Gateway
                </p>
                
                <Button variant="outline">
                  Manage API Keys
                </Button>
              </div>
              
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h4 className="font-medium text-gray-900">Data Export</h4>
                <p className="text-sm text-gray-600">
                  Export your transaction history and account data
                </p>
                
                <div className="flex space-x-3">
                  <Button variant="outline">
                    Export Transactions
                  </Button>
                  <Button variant="outline">
                    Export Account Data
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <h4 className="font-medium text-red-600">Danger Zone</h4>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="font-medium text-red-800">Delete Account</p>
                  <p className="text-sm text-red-600 mt-1 mb-3">
                    Once you delete your account, all of your data will be permanently removed.
                  </p>
                  <Button variant="danger" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardBody className="p-0">
              <ul>
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardBody className="p-6">
              {renderTabContent()}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;