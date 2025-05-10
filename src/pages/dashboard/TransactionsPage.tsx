import React, { useState } from 'react';
import { useTransaction } from '../../contexts/TransactionContext';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import TransactionCard from '../../components/dashboard/TransactionCard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { ArrowDownUp, Filter, Download } from 'lucide-react';
import { Transaction } from '../../types';

const TransactionsPage: React.FC = () => {
  const { transactions, isLoading } = useTransaction();
  const [filter, setFilter] = useState('all'); // all, sent, received
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'sent' && tx.fromWalletId.startsWith('wallet')) ||
      (filter === 'received' && tx.toWalletId.startsWith('wallet'));
    
    const matchesSearch = 
      searchTerm === '' ||
      tx.hash?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  // Export transactions as CSV
  const exportTransactions = () => {
    const headers = ['Date', 'Type', 'Amount', 'Currency', 'Status', 'Transaction Hash'];
    const csvContent = [
      headers.join(','),
      ...sortedTransactions.map(tx => {
        const date = new Date(tx.timestamp).toISOString();
        const type = tx.fromWalletId.startsWith('wallet') ? 'Sent' : 'Received';
        const amount = tx.amount.toString();
        const currency = tx.currency;
        const status = tx.status;
        const hash = tx.hash || 'Pending';
        return [date, type, amount, currency, status, hash].join(',');
      })
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
        <Button 
          variant="outline"
          onClick={exportTransactions}
          disabled={sortedTransactions.length === 0}
          className="flex items-center"
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardBody className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  placeholder="Search by transaction hash or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant={filter === 'all' ? 'primary' : 'outline'}
                  onClick={() => setFilter('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filter === 'sent' ? 'primary' : 'outline'}
                  onClick={() => setFilter('sent')}
                  size="sm"
                >
                  Sent
                </Button>
                <Button
                  variant={filter === 'received' ? 'primary' : 'outline'}
                  onClick={() => setFilter('received')}
                  size="sm"
                >
                  Received
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Transactions</h3>
            <div className="text-sm text-gray-500">
              {sortedTransactions.length} transactions found
            </div>
          </div>
        </CardHeader>
        
        <CardBody className="p-4">
          {isLoading ? (
            <div className="text-center py-6">
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          ) : sortedTransactions.length === 0 ? (
            <div className="text-center py-10">
              <ArrowDownUp size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No transactions found</p>
              <p className="text-sm text-gray-400 mt-1">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Your transaction history will appear here'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedTransactions.map(transaction => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default TransactionsPage;