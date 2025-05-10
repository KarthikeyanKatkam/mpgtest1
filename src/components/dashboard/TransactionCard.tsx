import React from 'react';
import { Transaction as TransactionType } from '../../types';
import Card, { CardBody } from '../ui/Card';
import { ArrowDownRight, ArrowUpRight, Clock } from 'lucide-react';

interface TransactionCardProps {
  transaction: TransactionType;
  walletId?: string; // Optional: to determine if inbound/outbound
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, walletId }) => {
  // Determine if transaction is inbound (receiving) or outbound (sending)
  const isInbound = walletId ? transaction.toWalletId === walletId : false;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <Card className="mb-3 transition-all duration-200 hover:shadow-md">
      <CardBody className="p-4">
        <div className="flex items-center">
          <div className={`rounded-full p-2 mr-4 ${isInbound ? 'bg-green-100' : 'bg-blue-100'}`}>
            {isInbound ? (
              <ArrowDownRight size={20} className="text-green-500" />
            ) : (
              <ArrowUpRight size={20} className="text-blue-500" />
            )}
          </div>
          
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {isInbound ? 'Received' : 'Sent'} {transaction.currency}
                </h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  {transaction.status === 'pending' ? (
                    <Clock size={14} className="inline mr-1 text-yellow-500" />
                  ) : null}
                  <span>{formatDate(transaction.timestamp)}</span>
                </p>
              </div>
              
              <div className="text-right">
                <p className={`text-lg font-semibold ${isInbound ? 'text-green-600' : 'text-gray-900'}`}>
                  {isInbound ? '+' : '-'}{transaction.amount.toFixed(8)} {transaction.currency}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Fee: {transaction.fee.toFixed(8)} {transaction.currency}
                </p>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
              <div className="text-xs font-mono text-gray-500 truncate max-w-xs">
                {transaction.hash || 'Processing...'}
              </div>
              <div className={`text-xs font-medium ${getStatusColor(transaction.status)}`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TransactionCard;