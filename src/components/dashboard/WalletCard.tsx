import React from 'react';
import { Wallet as WalletType } from '../../types';
import Card, { CardBody } from '../ui/Card';
import { ExternalLink, Copy } from 'lucide-react';

interface WalletCardProps {
  wallet: WalletType;
  onClick?: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet, onClick }) => {
  // Early return if wallet is invalid
  if (!wallet || typeof wallet !== 'object' || !wallet.type || !wallet.currency || typeof wallet.balance !== 'number' || !wallet.address) {
    return null;
  }

  const getCurrencyColor = (currency: string) => {
    switch (currency) {
      case 'BTC':
        return 'from-orange-400 to-orange-600';
      case 'ETH':
        return 'from-purple-400 to-purple-600';
      case 'LTC':
        return 'from-gray-400 to-gray-600';
      case 'XRP':
        return 'from-blue-400 to-blue-600';
      case 'USDT':
        return 'from-green-400 to-green-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };
  
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'BTC':
        return '₿';
      case 'ETH':
        return 'Ξ';
      case 'LTC':
        return 'Ł';
      case 'XRP':
        return 'XRP';
      case 'USDT':
        return '₮';
      default:
        return '$';
    }
  };
  
  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  const copyToClipboard = (text: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };
  
  return (
    <Card 
      className="overflow-hidden transition-transform duration-300 hover:transform hover:scale-105" 
      hover={true}
      onClick={onClick}
    >
      <div className={`bg-gradient-to-r ${getCurrencyColor(wallet.currency)} p-4 text-white relative overflow-hidden h-32`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{wallet.currency}</h3>
            <div className="mt-1 opacity-70 text-sm">{wallet.type.toUpperCase()} WALLET</div>
          </div>
          <div className="text-3xl font-bold opacity-20 absolute top-4 right-4">
            {getCurrencySymbol(wallet.currency)}
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-2xl font-bold tracking-wide mt-6">
            {wallet.balance.toFixed(8)}
          </div>
        </div>
      </div>
      
      <CardBody className="py-3">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Address:</span>
            <span className="font-mono">{truncateAddress(wallet.address)}</span>
            <button 
              onClick={(e) => copyToClipboard(wallet.address, e)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Copy size={14} />
            </button>
          </div>
          <a
            href={`https://example.com/explorer/${wallet.address}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-500 hover:text-blue-700 transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </CardBody>
    </Card>
  );
};

export default WalletCard;