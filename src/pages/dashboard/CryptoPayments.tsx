
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Bitcoin, 
  Plus, 
  CheckCircle, 
  Copy,
  QrCode,
  Edit,
  Trash2,
  Wallet,
  AlertCircle
} from 'lucide-react';

const CryptoPayments = () => {
  const [enabledChains, setEnabledChains] = useState({
    ethereum: true,
    bitcoin: true,
    binance: false,
    solana: true,
    polygon: true
  });

  const [showAddWallet, setShowAddWallet] = useState(false);

  const wallets = [
    {
      id: 1,
      chain: 'Ethereum',
      address: '0x742d35Cc6754C9532c5d0b3cA5e8f8D2B9f8E9a1',
      tokens: ['ETH', 'USDT', 'USDC'],
      status: 'active',
      icon: '⟠'
    },
    {
      id: 2,
      chain: 'Bitcoin',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      tokens: ['BTC'],
      status: 'active',
      icon: '₿'
    },
    {
      id: 3,
      chain: 'Solana',
      address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
      tokens: ['SOL', 'USDC'],
      status: 'active',
      icon: '◎'
    },
    {
      id: 4,
      chain: 'Polygon',
      address: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC',
      tokens: ['MATIC', 'USDT'],
      status: 'active',
      icon: '⬢'
    }
  ];

  const supportedTokens = [
    { symbol: 'BTC', name: 'Bitcoin', chain: 'Bitcoin', enabled: true },
    { symbol: 'ETH', name: 'Ethereum', chain: 'Ethereum', enabled: true },
    { symbol: 'USDT', name: 'Tether', chain: 'Multiple', enabled: true },
    { symbol: 'USDC', name: 'USD Coin', chain: 'Multiple', enabled: true },
    { symbol: 'SOL', name: 'Solana', chain: 'Solana', enabled: true },
    { symbol: 'MATIC', name: 'Polygon', chain: 'Polygon', enabled: false },
    { symbol: 'BNB', name: 'Binance Coin', chain: 'BSC', enabled: false },
    { symbol: 'ADA', name: 'Cardano', chain: 'Cardano', enabled: false }
  ];

  const toggleChain = (chain: string) => {
    setEnabledChains(prev => ({
      ...prev,
      [chain]: !prev[chain]
    }));
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crypto Payments Setup</h1>
          <p className="text-gray-600 mt-1">Configure cryptocurrency wallets and payment methods</p>
        </div>
        <Button onClick={() => setShowAddWallet(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Wallet
        </Button>
      </div>

      {/* Blockchain Networks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bitcoin className="h-5 w-5" />
            <span>Supported Networks</span>
          </CardTitle>
          <CardDescription>Enable or disable blockchain networks for accepting payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'ethereum', label: 'Ethereum', desc: 'ETH, USDT, USDC', icon: '⟠' },
              { key: 'bitcoin', label: 'Bitcoin', desc: 'BTC payments', icon: '₿' },
              { key: 'binance', label: 'Binance Smart Chain', desc: 'BNB, BUSD', icon: '🔶' },
              { key: 'solana', label: 'Solana', desc: 'SOL, SPL tokens', icon: '◎' },
              { key: 'polygon', label: 'Polygon', desc: 'MATIC, tokens', icon: '⬢' }
            ].map((network) => (
              <div key={network.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{network.icon}</span>
                  <div>
                    <h3 className="font-medium">{network.label}</h3>
                    <p className="text-sm text-gray-600">{network.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={enabledChains[network.key as keyof typeof enabledChains]}
                  onCheckedChange={() => toggleChain(network.key)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wallet Addresses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Wallet Addresses</span>
          </CardTitle>
          <CardDescription>Manage your cryptocurrency wallet addresses for receiving payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wallets.map((wallet) => (
              <div key={wallet.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">
                    {wallet.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{wallet.chain}</p>
                      <div className="flex space-x-1">
                        {wallet.tokens.map((token) => (
                          <Badge key={token} variant="outline" className="text-xs">
                            {token}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {truncateAddress(wallet.address)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyAddress(wallet.address)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {wallet.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <QrCode className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full" onClick={() => setShowAddWallet(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Wallet Address
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Add Wallet Form */}
      {showAddWallet && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Wallet</CardTitle>
            <CardDescription>Enter your wallet address for receiving crypto payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="blockchain">Blockchain Network</Label>
                <Input id="blockchain" placeholder="Select blockchain" />
              </div>
              <div>
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input id="walletAddress" placeholder="Enter wallet address" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="label">Wallet Label (Optional)</Label>
                <Input id="label" placeholder="e.g., Main Ethereum Wallet" />
              </div>
            </div>
            <div className="flex space-x-3">
              <Button>Add Wallet</Button>
              <Button variant="outline" onClick={() => setShowAddWallet(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supported Tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Cryptocurrencies</CardTitle>
          <CardDescription>Enable specific tokens for payment acceptance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportedTokens.map((token) => (
              <div key={token.symbol} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Bitcoin className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">{token.symbol}</p>
                    <p className="text-xs text-gray-600">{token.name}</p>
                    <p className="text-xs text-gray-500">{token.chain}</p>
                  </div>
                </div>
                <Switch checked={token.enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <span>Security Notice</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">Important Security Guidelines</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Always verify wallet addresses before saving them</li>
              <li>• Use hardware wallets for enhanced security</li>
              <li>• Never share your private keys or seed phrases</li>
              <li>• Monitor transactions regularly for any unauthorized activity</li>
              <li>• Enable notifications for all incoming transactions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoPayments;
