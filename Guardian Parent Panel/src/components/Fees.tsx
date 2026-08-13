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

  const digitalServiceFee = {
    id: 'digital-service',
    type: 'Digital Services',
    amount: 15,       // set the price here
    dueDate: new Date().toISOString(),
    status: 'pending'
  };

  const schoolPendingFees = fees.filter(f => f.status === 'pending');
  const pendingFees = [...schoolPendingFees, digitalServiceFee];
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
        <h1 className="text-2xl font-semibold md:text-3xl text-neutral-900 dark:text-white">Fees & Payments</h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-500">Manage your child's fee payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-6 text-white shadow-lg bg-gradient-to-br from-red-500 to-red-600 rounded-2xl">
          <p className="text-sm opacity-90">Total Due</p>
          <p className="mt-1 text-3xl font-bold">${totalDue.toLocaleString()}</p>
          <p className="mt-2 text-xs opacity-75">{pendingFees.length} pending payment{pendingFees.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="p-6 text-white shadow-lg bg-gradient-to-br from-green-500 to-green-600 rounded-2xl">
          <p className="text-sm opacity-90">Total Paid</p>
          <p className="mt-1 text-3xl font-bold">${totalPaid.toLocaleString()}</p>
          <p className="mt-2 text-xs opacity-75">This academic year</p>
        </div>

        <div className="p-6 text-white shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
          <p className="text-sm opacity-90">Payment Status</p>
          <p className="mt-1 text-3xl font-bold">{pendingFees.length === 0 ? 'Clear' : 'Pending'}</p>
          <p className="mt-2 text-xs opacity-75">
            {pendingFees.length === 0 ? 'All payments up to date' : 'Action required'}
          </p>
        </div>
      </div>

      {/* Pending Fees */}
      {pendingFees.length > 0 && (
        <div className="p-6 bg-white border shadow-sm rounded-2xl border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Pending Payments</h2>
            <button 
              onClick={() => handlePayNow(pendingFees[0])}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Pay All
            </button>
          </div>
          <div className="space-y-3">
            {pendingFees.map((fee) => (
              <div key={fee.id} className="flex items-center justify-between p-4 transition-colors border border-neutral-200 rounded-xl hover:bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">{fee.type}</h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-500">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-neutral-900 dark:text-white">${fee.amount}</p>
                  </div>
                  <button 
                    onClick={() => handlePayNow(fee)}
                    className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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
      <div className="p-6 bg-white border shadow-sm rounded-2xl border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">Payment History</h2>
        <div className="space-y-3">
          {paidFees.length > 0 ? (
            paidFees.map((fee) => (
              <div key={fee.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">{fee.type}</h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-500">Paid on: {new Date(fee.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">${fee.paidAmount}</p>
                  </div>
                  <button className="p-2 transition-colors text-neutral-600 dark:text-neutral-500 hover:text-neutral-900">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-neutral-500">No payment history yet</p>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Pay Fee</h2>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-2 transition-colors rounded-lg hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fee Details */}
            <div className="p-4 mb-6 bg-neutral-50 rounded-xl">
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
              <label className="block mb-3 text-sm font-medium text-neutral-700">Payment Amount</label>
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
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-500">${selectedFee.amount}</p>
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
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-500">Custom amount</p>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block mb-3 text-sm font-medium text-neutral-700">Payment Method</label>
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
                className="flex-1 px-4 py-3 font-medium transition-colors border rounded-lg border-neutral-200 text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 px-4 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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
