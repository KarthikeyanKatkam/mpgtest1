import React, { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import WalletCard from '../../components/dashboard/WalletCard';
import Button from '../../components/ui/Button';
import { Plus, Wallet as WalletIcon } from 'lucide-react';
import { CryptoCurrency } from '../../types';

const WalletsPage: React.FC = () => {
  const { hotWallets, coldWallets, isLoading, error, createWallet } = useWallet();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CryptoCurrency>('BTC');
  const [isCreating, setIsCreating] = useState(false);
  
  const handleCreateWallet = async () => {
    setIsCreating(true);
    await createWallet(selectedCurrency);
    setIsCreating(false);
    setShowCreateModal(false);
  };
  
  const currencies: CryptoCurrency[] = ['BTC', 'ETH', 'USDT'];

  // Filter valid wallets
  const validHotWallets = hotWallets.filter(wallet => 
    wallet && 
    typeof wallet === 'object' && 
    wallet.type && 
    wallet.currency && 
    typeof wallet.balance === 'number' && 
    wallet.address
  );
  
  const validColdWallets = coldWallets.filter(wallet => 
    wallet && 
    typeof wallet === 'object' && 
    wallet.type && 
    wallet.currency && 
    typeof wallet.balance === 'number' && 
    wallet.address
  );
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Wallets</h2>
        <Button 
          onClick={() => setShowCreateModal(true)}
          size="sm"
          className="flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Create New Wallet
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-6">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">Hot Wallets</h3>
            <p className="text-sm text-gray-500 mt-1">
              These wallets are connected to your account for daily transactions
            </p>
          </CardHeader>
          <CardBody className="p-4">
            {isLoading ? (
              <div className="text-center py-6">
                <p className="text-gray-500">Loading wallets...</p>
              </div>
            ) : validHotWallets.length === 0 ? (
              <div className="text-center py-10">
                <WalletIcon size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No hot wallets yet</p>
                <Button 
                  onClick={() => setShowCreateModal(true)}
                  className="mt-3"
                  variant="secondary"
                  size="sm"
                >
                  Create Wallet
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {validHotWallets.map(wallet => (
                  <WalletCard 
                    key={wallet.id} 
                    wallet={wallet} 
                  />
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-900">Company Cold Wallets</h3>
            <p className="text-sm text-gray-500 mt-1">
              Secure storage wallets managed by Maya Payment Gateway
            </p>
          </CardHeader>
          <CardBody className="p-4">
            {isLoading ? (
              <div className="text-center py-6">
                <p className="text-gray-500">Loading wallets...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {validColdWallets.map(wallet => (
                  <WalletCard 
                    key={wallet.id} 
                    wallet={wallet} 
                  />
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      
      {/* Create Wallet Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Create New Wallet</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Cryptocurrency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {currencies.map(currency => (
                  <button
                    key={currency}
                    type="button"
                    onClick={() => setSelectedCurrency(currency)}
                    className={`p-3 rounded-md text-center transition-colors ${
                      selectedCurrency === currency
                        ? 'bg-blue-100 border-2 border-blue-500 text-blue-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowCreateModal(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                onClick={handleCreateWallet}
                isLoading={isCreating}
              >
                Create Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletsPage;