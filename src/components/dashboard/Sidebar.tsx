import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Wallet, Home, CreditCard, History, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onChangePage }) => {
  const { logout } = useAuth();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'wallets', label: 'My Wallets', icon: <Wallet size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <History size={20} /> },
    { id: 'payment', label: 'Pay & Send', icon: <CreditCard size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <div className="min-h-screen bg-blue-900 text-white w-64 flex flex-col transition-all duration-300">
      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center space-x-2">
          <Wallet className="h-8 w-8 text-blue-300" />
          <h1 className="text-xl font-bold">Maya Gateway</h1>
        </div>
      </div>
      
      <nav className="flex-1 py-6 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onChangePage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activePage === item.id
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-300 hover:bg-blue-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-blue-800">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-300 hover:bg-blue-800 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;