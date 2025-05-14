import React, { useState, useEffect } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useTransaction } from '../../contexts/TransactionContext';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { CryptoCurrency } from '../../types';

const PaymentPage: React.FC = () => {
  const { hotWallets } = useWallet();
  const { createTransaction, isLoading } = useTransaction();
  
  const [selectedWalletId, setSelectedWalletId] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<CryptoCurrency>('BTC');
  const [errors, setErrors] = useState<{
    wallet?: string;
    address?: string;
    amount?: string;
  }>({});
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  // Set default wallet if available
  useEffect(() => {
    if (hotWallets.length > 0 && !selectedWalletId) {
      setSelectedWalletId(hotWallets[0].id);
      setCurrency(hotWallets[0].currency);
    }
  }, [hotWallets, selectedWalletId]);
  
  const validateForm = () => {
    const newErrors: {
      wallet?: string;
      address?: string;
      amount?: string;
    } = {};
    let isValid = true;
    
    if (!selectedWalletId) {
      newErrors.wallet = 'Please select a wallet';
      isValid = false;
    }
    
    if (!recipientAddress) {
      newErrors.address = 'Recipient address is required';
      isValid = false;
    } else if (recipientAddress.length < 26) {
      newErrors.address = 'Invalid wallet address';
      isValid = false;
    }
    
    const numAmount = parseFloat(amount);
    if (!amount) {
      newErrors.amount = 'Amount is required';
      isValid = false;
    } else if (isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
      isValid = false;
    } else {
      // Check if user has enough balance
      const selectedWallet = hotWallets.find(wallet => wallet.id === selectedWalletId);
      if (selectedWallet && numAmount > selectedWallet.balance) {
        newErrors.amount = 'Insufficient balance';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await createTransaction(
        selectedWalletId,
        recipientAddress,
        parseFloat(amount),
        currency
      );
      
      setTransactionSuccess(true);
      setRecipientAddress('');
      setAmount('');
      setShowQR(false);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setTransactionSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };
  
  const getSelectedWallet = () => {
    return hotWallets.find(wallet => wallet.id === selectedWalletId);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };
  
  const getNetworkFee = () => {
    const baseAmount = parseFloat(amount) || 0;
    const feePercentage = 0.005; // 0.5%
    return baseAmount * feePercentage;
  };

  const getTotal = () => {
    const baseAmount = parseFloat(amount) || 0;
    return baseAmount + getNetworkFee();
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Send Payment</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Create Transaction</h3>
            </CardHeader>
            <CardBody className="p-6">
              {transactionSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Transaction Initiated!</h3>
                  <p className="text-gray-600 mb-6">
                    Your transaction has been successfully submitted and is being processed.
                  </p>
                  <Button
                    onClick={() => setTransactionSuccess(false)}
                  >
                    Send Another Payment
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Source Wallet
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {hotWallets.map(wallet => (
                        <div
                          key={wallet.id}
                          onClick={() => {
                            setSelectedWalletId(wallet.id);
                            setCurrency(wallet.currency);
                          }}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedWalletId === wallet.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{wallet.currency} Wallet</p>
                              <p className="text-sm text-gray-500 mt-1">
                                Balance: {wallet.balance.toFixed(8)} {wallet.currency}
                              </p>
                            </div>
                            <div className={`w-4 h-4 rounded-full ${
                              selectedWalletId === wallet.id
                                ? 'bg-blue-500'
                                : 'border border-gray-300'
                            }`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.wallet && (
                      <p className="mt-1 text-sm text-red-600">{errors.wallet}</p>
                    )}
                  </div>
                  
                  <div>
                    <Input
                      label="Recipient Address"
                      placeholder="Enter wallet address"
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      error={errors.address}
                    />
                    <div className="mt-2 flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowQR(!showQR)}
                      >
                        {showQR ? 'Hide QR Code' : 'Show QR Code'}
                      </Button>
                    </div>
                    {showQR && recipientAddress && (
                      <div className="mt-4 flex justify-center">
                        <div className="p-4 bg-white rounded-lg shadow-md">
                          <QRCodeSVG
                            value={recipientAddress}
                            size={200}
                            level="H"
                            includeMargin={true}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="flex-grow">
                      <Input
                        label="Amount"
                        type="number"
                        step="0.00000001"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        error={errors.amount}
                      />
                    </div>
                    <div className="w-1/3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <div className="relative">
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value as CryptoCurrency)}
                          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          disabled={!!selectedWalletId}
                        >
                          {['BTC', 'ETH', 'LTC', 'XRP', 'USDT'].map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Transaction Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">{amount || '0'} {currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Network Fee (0.5%):</span>
                        <span className="font-medium">{getNetworkFee().toFixed(8)} {currency}</span>
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-medium">
                          {getTotal().toFixed(8)} {currency}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                    disabled={!selectedWalletId || !recipientAddress || !amount}
                  >
                    Send Transaction
                  </Button>
                </form>
              )}
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-900">Payment Information</h3>
            </CardHeader>
            <CardBody className="p-6">
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Selected Wallet</h4>
                {getSelectedWallet() ? (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-medium">{getSelectedWallet()?.currency} Wallet</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Balance: {getSelectedWallet()?.balance.toFixed(8)} {getSelectedWallet()?.currency}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <p className="text-xs font-mono text-gray-500 truncate">
                        {getSelectedWallet()?.address}
                      </p>
                      <button
                        onClick={() => copyToClipboard(getSelectedWallet()?.address || '')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy size={14} />
                      </button>
                      <a
                        href={`https://example.com/explorer/${getSelectedWallet()?.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No wallet selected</p>
                )}
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Transaction Times</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">BTC:</span>
                    <span>~10-60 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ETH:</span>
                    <span>~15 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">LTC:</span>
                    <span>~2.5 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">XRP:</span>
                    <span>~3-5 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">USDT:</span>
                    <span>~2-5 minutes</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  If you need assistance with your transaction, please contact our support team.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                >
                  Contact Support
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;