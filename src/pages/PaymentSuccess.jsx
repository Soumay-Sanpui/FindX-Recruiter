import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import paymentService from '../services/paymentService';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const paymentIntentId = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');

    useEffect(() => {
        const confirmPayment = async () => {
            if (paymentIntentId) {
                try {
                    const response = await paymentService.handlePaymentSuccess(paymentIntentId);
                    if (response.success) {
                        setPaymentDetails(response);
                    } else {
                        setError('Payment confirmation failed');
                    }
                } catch (err) {
                    console.error('Error confirming payment:', err);
                    setError('Failed to confirm payment status');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('No payment information found');
                setLoading(false);
            }
        };

        confirmPayment();
    }, [paymentIntentId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Confirming your payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="text-red-500 mb-4">
                        <CheckCircle size={64} className="mx-auto" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Error</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link
                        to="/employer-dashboard"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                    >
                        Return to Dashboard
                        <ArrowRight size={16} className="ml-2" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {/* Success Icon */}
                <div className="text-green-500 mb-6">
                    <CheckCircle size={64} className="mx-auto" />
                </div>

                {/* Success Message */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase. Your job posting is now live and ready to attract top candidates.
                </p>

                {/* Payment Details */}
                {paymentDetails && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Transaction ID:</span>
                                <span className="font-mono text-xs">{paymentIntentId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status:</span>
                                <span className="text-green-600 font-medium">Completed</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link
                        to="/my-jobs"
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                    >
                        View My Jobs
                        <ArrowRight size={16} className="ml-2" />
                    </Link>
                    
                    <Link
                        to="/post-job"
                        className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
                    >
                        Post Another Job
                    </Link>
                    
                    <Link
                        to="/employer-dashboard"
                        className="w-full text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Return to Dashboard
                    </Link>
                </div>

                {/* Receipt Note */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                        A receipt has been sent to your email address. If you need any assistance, please contact our support team.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess; 