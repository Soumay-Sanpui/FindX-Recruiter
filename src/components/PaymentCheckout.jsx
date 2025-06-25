import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { useEmployerStore } from '../store/employer.store';
import paymentService, { PaymentUtils } from '../services/paymentService';
import { toast } from 'react-toastify';
import { CreditCard, Lock, Shield, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import CONFIG from '../../config/config';

// Load Stripe with error handling
let stripePromise;
try {
    const stripeKey = CONFIG.stripePublishableKey;
    if (!stripeKey || stripeKey === 'pk_test_your_stripe_publishable_key_here' || stripeKey === 'pk_test_placeholder_key_replace_with_real_stripe_key') {
        console.warn('⚠️ Stripe publishable key not configured properly');
        stripePromise = null;
    } else {
        stripePromise = loadStripe(stripeKey);
    }
} catch (error) {
    console.error('Failed to load Stripe:', error);
    stripePromise = null;
}

// Enhanced card element options with modern styling
const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#1f2937',
            fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '24px',
            '::placeholder': {
                color: '#9ca3af',
            },
        },
        invalid: {
            color: '#dc2626',
            iconColor: '#dc2626',
        },
        complete: {
            color: '#059669',
            iconColor: '#059669',
        },
    },
    hidePostalCode: false,
};

// Enhanced checkout form component
const CheckoutForm = ({ paymentData, onSuccess, onError, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { employer } = useEmployerStore();

    // Create payment intent when component mounts
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                setIsLoading(true);
                const response = await paymentService.createJobPostingPayment({
                    ...paymentData,
                    employerId: employer?._id
                });

                if (response.success) {
                    setClientSecret(response.client_secret);
                } else {
                    setPaymentError('Failed to initialize payment');
                }
            } catch (error) {
                console.error('Error creating payment intent:', error);
                setPaymentError(error.message || 'Failed to initialize payment');
            } finally {
                setIsLoading(false);
            }
        };

        if (employer?._id && paymentData) {
            createPaymentIntent();
        }
    }, [employer, paymentData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setIsProcessing(true);
        setPaymentError(null);

        const cardElement = elements.getElement(CardElement);

        // Confirm payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: employer?.companyName || 'Employer',
                    email: employer?.email,
                },
            }
        });

        if (error) {
            console.error('Payment failed:', error);
            setPaymentError(error.message);
            
            // Report failure to backend
            try {
                await paymentService.handlePaymentFailure(
                    paymentIntent?.id || 'unknown',
                    error.message
                );
            } catch (reportError) {
                console.error('Failed to report payment failure:', reportError);
            }
            
            onError?.(error);
        } else {
            // Payment succeeded
            console.log('Payment succeeded:', paymentIntent);
            
            // Confirm success with backend
            try {
                await paymentService.handlePaymentSuccess(paymentIntent.id);
                toast.success('Payment completed successfully!');
                onSuccess?.(paymentIntent);
            } catch (confirmError) {
                console.error('Failed to confirm payment:', confirmError);
                toast.warning('Payment processed but confirmation failed. Please contact support.');
                onSuccess?.(paymentIntent);
            }
        }

        setIsProcessing(false);
    };

    const calculateJobPostingAmount = () => {
        const addOnsTotal = paymentData?.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
        return (paymentData?.amount || 0) - addOnsTotal;
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 scale-100">
                {/* Header */}
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-8 rounded-t-3xl text-white">
                    <button
                        onClick={onCancel}
                        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                        disabled={isProcessing}
                    >
                        <X size={20} />
                    </button>
                    
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 rounded-2xl mb-4 backdrop-blur-sm">
                            <CreditCard size={28} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Secure Payment</h2>
                        <p className="text-blue-100 text-sm">
                            Complete your job posting payment
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader className="animate-spin text-blue-600 mb-4" size={32} />
                            <p className="text-gray-600">Initializing payment...</p>
                        </div>
                    ) : (
                        <>
                            {/* Payment Summary */}
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-6 mb-6 border border-gray-100">
                                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                                    <CheckCircle size={16} className="text-green-500 mr-2" />
                                    Payment Summary
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-sm">Job Posting Package</span>
                                        <span className="font-medium text-gray-800">
                                            {PaymentUtils.formatCurrency(calculateJobPostingAmount())}
                                        </span>
                                    </div>
                                    
                                    {paymentData?.addOns?.length > 0 && (
                                        <div className="space-y-2">
                                            {paymentData.addOns.map((addOn, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <span className="text-gray-600 text-sm flex items-center">
                                                        <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                                        {addOn.name}
                                                    </span>
                                                    <span className="text-gray-700 text-sm font-medium">
                                                        {PaymentUtils.formatCurrency(addOn.price)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <div className="border-t border-gray-200 pt-3 mt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-800">Total Amount</span>
                                            <span className="font-bold text-xl text-blue-600">
                                                {PaymentUtils.formatCurrency(paymentData?.amount || 0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Card Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Card Information
                                    </label>
                                    <div className="relative">
                                        <div className="border-2 border-gray-200 rounded-xl p-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-200 bg-white">
                                            <CardElement 
                                                options={CARD_ELEMENT_OPTIONS}
                                                onChange={(event) => {
                                                    setCardComplete(event.complete);
                                                    if (event.error) {
                                                        setPaymentError(event.error.message);
                                                    } else {
                                                        setPaymentError(null);
                                                    }
                                                }}
                                            />
                                        </div>
                                        {cardComplete && (
                                            <div className="absolute -top-2 -right-2">
                                                <CheckCircle size={20} className="text-green-500 bg-white rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Payment Error */}
                                {paymentError && (
                                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                                        <div className="flex items-start">
                                            <AlertCircle size={20} className="text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-red-800">Payment Error</p>
                                                <p className="text-sm text-red-700 mt-1">{paymentError}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Security Notice */}
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <div className="flex items-center text-sm">
                                        <Shield size={18} className="text-green-600 mr-3 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-green-800">Your payment is secure</p>
                                            <p className="text-green-700 mt-1">Protected by 256-bit SSL encryption</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={onCancel}
                                        className="flex-1 py-3.5 px-4 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
                                        disabled={isProcessing}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!stripe || isProcessing || !clientSecret || !cardComplete}
                                        className="flex-1 py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader className="animate-spin mr-2" size={18} />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={16} className="mr-2" />
                                                Pay {PaymentUtils.formatCurrency(paymentData?.amount || 0)}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-gray-50/50 rounded-b-3xl border-t border-gray-100">
                    <div className="flex items-center justify-center text-xs text-gray-500">
                        <Lock size={12} className="mr-2" />
                        <span>Powered by </span>
                        <span className="font-semibold text-blue-600 mx-1">Stripe</span>
                        <span>• Your data is encrypted and secure</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Enhanced main component with error handling
const PaymentCheckout = ({ paymentData, onSuccess, onError, onCancel }) => {
    // If Stripe is not configured, show enhanced error
    if (!stripePromise) {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300">
                    <div className="p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-6">
                            <AlertCircle size={32} className="text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Unavailable</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Payment processing is currently unavailable. Please configure your Stripe keys to enable payments.
                        </p>
                        <button
                            onClick={onCancel}
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm
                paymentData={paymentData}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onCancel}
            />
        </Elements>
    );
};

export default PaymentCheckout; 