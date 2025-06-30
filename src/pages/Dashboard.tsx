import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  BarChart3, 
  Shield, 
  CreditCard, 
  Bitcoin, 
  FileText, 
  History, 
  Key, 
  Settings,
  LogOut,
  User,
  Plus,
  Palette
} from 'lucide-react';
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: BarChart3, label: 'Overview', path: '/dashboard' },
    { icon: Shield, label: 'KYC Verification', path: '/dashboard/kyc' },
    { icon: CreditCard, label: 'Fiat Payments Setup', path: '/dashboard/fiat' },
    { icon: Bitcoin, label: 'Crypto Payments Setup', path: '/dashboard/crypto' },
    { icon: FileText, label: 'Invoices', path: '/dashboard/invoices' },
    { icon: Settings, label: 'Invoice Settings', path: '/dashboard/invoice-settings' },
    { icon: Key, label: 'Payment Links', path: '/dashboard/payment-links' },
    { icon: Palette, label: 'Merchant Branding', path: '/dashboard/merchant-branding' },
    { icon: History, label: 'Transactions', path: '/dashboard/transactions' },
    { icon: Key, label: 'API Keys', path: '/dashboard/api-keys' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:inset-0 lg:flex lg:flex-col"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/438cf714-65a7-4c46-80ee-f10fbd5afa0d.png" 
              alt="Maya Exchange" 
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Maya Gateway
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start mb-1 h-12",
                isActive(item.path) && "bg-blue-50 text-blue-700 hover:bg-blue-100"
              )}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-3 border-t border-gray-200 space-y-2">
          <Button
            onClick={() => {
              navigate('/dashboard/invoices/create');
              setSidebarOpen(false);
            }}
            className="w-full"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
          <Button
            onClick={() => {
              navigate('/dashboard/payment-links');
              setSidebarOpen(false);
            }}
            variant="outline"
            className="w-full"
            size="sm"
          >
            <Key className="h-4 w-4 mr-2" />
            Payment Links
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search transactions, customers..."
                  className="pl-10 w-64 hidden sm:block"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback>DM</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Demo Merchant</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        demo@maya.exchange
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/invoice-settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Invoice Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
