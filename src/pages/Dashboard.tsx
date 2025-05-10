import React, { useState } from 'react';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHome from '../pages/dashboard/DashboardHome';
import WalletsPage from '../pages/dashboard/WalletsPage';
import TransactionsPage from '../pages/dashboard/TransactionsPage';
import PaymentPage from '../pages/dashboard/PaymentPage';
import SettingsPage from '../pages/dashboard/SettingsPage';

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  
  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'wallets':
        return <WalletsPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'payment':
        return <PaymentPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome />;
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} onChangePage={setActivePage} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;