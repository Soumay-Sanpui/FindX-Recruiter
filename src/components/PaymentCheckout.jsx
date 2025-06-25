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
import { CreditCard, Lock, Check, Shield, X } from 'lucide-react';
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
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            lineHeight: '24px',
            '::placeholder': {
                color: '#9ca3af',
            },
        },
        invalid: {
            color: '#ef4444',
            iconColor: '#ef4444',
        },
        complete: {
            color: '#059669',
            iconColor: '#059669',
        },
    },
    hidePostalCode: false,
};

// Main checkout form component with enhanced design
const CheckoutForm = ({ paymentData, onSuccess, onError, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const { employer } = useEmployerStore();

    // Create payment intent when component mounts
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
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

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl text-white relative">
                    <button
                        onClick={onCancel}
                        className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                        disabled={isProcessing}
                    >
                        <X size={24} />
                    </button>
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                            <CreditCard size={32} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-2">Secure Payment</h2>
                    <p className="text-blue-100 text-center">
                        Complete your job posting payment
                    </p>
                </div>

                {/* Payment Summary */}
                <div className="p-6 border-b border-gray-200">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Payment Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Job Posting Package</span>
                                <span className="font-medium">{PaymentUtils.formatCurrency((paymentData?.amount || 0) - (paymentData?.addOnsTotal || 0))}</span>
                            </div>
                            {paymentData?.addOns?.length > 0 && (
                                <>
                                    {paymentData.addOns.map((addOn, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-600">• {addOn.name}</span>
                                            <span>{PaymentUtils.formatCurrency(addOn.price)}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span className="text-blue-600">{PaymentUtils.formatCurrency(paymentData?.amount || 0)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Card Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Information
                            </label>
                            <div className="border-2 border-gray-200 rounded-lg p-4 focus-within:border-blue-500 transition-colors">
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
                        </div>

                        {/* Payment Error */}
                        {paymentError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                                <div className="flex-shrink-0 mt-0.5">
                                    <X size={16} className="text-red-500" />
                                </div>
                                <div className="ml-2">
                                    <p className="text-sm font-medium">Payment Error</p>
                                    <p className="text-sm">{paymentError}</p>
                                </div>
                            </div>
                        )}

                        {/* Security Notice */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center text-sm text-green-700">
                                <Shield size={16} className="mr-2 flex-shrink-0" />
                                <div>
                                    <p className="font-medium">Your payment is secure</p>
                                    <p className="text-green-600">Protected by 256-bit SSL encryption</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                                disabled={isProcessing}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!stripe || isProcessing || !clientSecret || !cardComplete}
                                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
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
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
                    <div className="flex items-center justify-center text-xs text-gray-500">
                        <Lock size={12} className="mr-1" />
                        Powered by Stripe • Your data is encrypted and secure
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main component with Stripe Elements provider
const PaymentCheckout = ({ paymentData, onSuccess, onError, onCancel }) => {
    // If Stripe is not configured, show error
    if (!stripePromise) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
                    <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <X size={32} className="text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Unavailable</h2>
                    <p className="text-gray-600 mb-6">
                        Payment processing is currently unavailable. Please configure your Stripe keys to enable payments.
                    </p>
                    <button
                        onClick={onCancel}
                        className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                        Close
                    </button>
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