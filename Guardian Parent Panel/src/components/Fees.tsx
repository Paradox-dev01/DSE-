import { useState } from 'react';
import { CreditCard, Download, CheckCircle, AlertCircle, Receipt, X } from 'lucide-react';
import { mockFees } from '../data/mockData';

interface FeesProps {
  childId: string;
}

export function Fees({ childId }: FeesProps) {
  const fees = mockFees[childId] || [];
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'mobile'>('card');
  const [paymentAmount, setPaymentAmount] = useState<'full' | 'partial'>('full');

  const pendingFees = fees.filter(f => f.status === 'pending');
  const paidFees = fees.filter(f => f.status === 'paid');
  const totalDue = pendingFees.reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = paidFees.reduce((sum, f) => sum + (f.paidAmount || 0), 0);

  const handlePayNow = (fee: any) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    // Mock payment processing
    alert('Payment processed successfully!');
    setShowPaymentModal(false);
    setSelectedFee(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">Fees & Payments</h1>
        <p className="text-neutral-600 dark:text-neutral-500 mt-1">Manage your child's fee payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">Total Due</p>
          <p className="text-3xl font-bold mt-1">${totalDue.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-2">{pendingFees.length} pending payment{pendingFees.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">Total Paid</p>
          <p className="text-3xl font-bold mt-1">${totalPaid.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-2">This academic year</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">Payment Status</p>
          <p className="text-3xl font-bold mt-1">{pendingFees.length === 0 ? 'Clear' : 'Pending'}</p>
          <p className="text-xs opacity-75 mt-2">
            {pendingFees.length === 0 ? 'All payments up to date' : 'Action required'}
          </p>
        </div>
      </div>

      {/* Pending Fees */}
      {pendingFees.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Pending Payments</h2>
            <button 
              onClick={() => handlePayNow(pendingFees[0])}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Pay All
            </button>
          </div>
          <div className="space-y-3">
            {pendingFees.map((fee) => (
              <div key={fee.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">{fee.type}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-neutral-900 dark:text-white">${fee.amount}</p>
                  </div>
                  <button 
                    onClick={() => handlePayNow(fee)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment History */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Payment History</h2>
        <div className="space-y-3">
          {paidFees.length > 0 ? (
            paidFees.map((fee) => (
              <div key={fee.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">{fee.type}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">Paid on: {new Date(fee.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">${fee.paidAmount}</p>
                  </div>
                  <button className="p-2 text-neutral-600 dark:text-neutral-500 hover:text-neutral-900 transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-neutral-500 py-8">No payment history yet</p>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Pay Fee</h2>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fee Details */}
            <div className="bg-neutral-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-neutral-900">{selectedFee.type}</h3>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-500">Amount</span>
                  <span className="font-semibold text-neutral-900">${selectedFee.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-500">Due Date</span>
                  <span className="font-semibold text-neutral-900">{new Date(selectedFee.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Amount */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">Payment Amount</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentAmount('full')}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    paymentAmount === 'full'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <p className="font-semibold text-neutral-900">Full Amount</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">${selectedFee.amount}</p>
                </button>
                <button
                  onClick={() => setPaymentAmount('partial')}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    paymentAmount === 'partial'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <p className="font-semibold text-neutral-900">Partial</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-500 mt-1">Custom amount</p>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-3">Payment Method</label>
              <div className="space-y-2">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-xl border-2 transition-colors flex items-center gap-3 ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-neutral-600 dark:text-neutral-500" />
                  <span className="font-medium text-neutral-900">Credit / Debit Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`w-full p-4 rounded-xl border-2 transition-colors flex items-center gap-3 ${
                    paymentMethod === 'bank'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Receipt className="w-5 h-5 text-neutral-600 dark:text-neutral-500" />
                  <span className="font-medium text-neutral-900">Bank Transfer</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('mobile')}
                  className={`w-full p-4 rounded-xl border-2 transition-colors flex items-center gap-3 ${
                    paymentMethod === 'mobile'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-neutral-600 dark:text-neutral-500" />
                  <span className="font-medium text-neutral-900">Mobile Banking</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-3 border border-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
