/**
 * Stripe Payment Service for FindX Employer Platform
 */

import { loadStripe } from '@stripe/stripe-js';
import CONFIG from '../../config/config';
import api from './api';

// Initialize Stripe
const stripePromise = loadStripe(CONFIG.stripePublishableKey || import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Pricing configuration
export const PRICING_CONFIG = {
    STANDARD: {
        id: 'Standard',
        name: 'Standard Listing',
        price: 4900, // $49.00 in cents (early bird)
        regularPrice: 19900, // $199.00 in cents
    },
    NOTIFICATION_PACKAGES: {
        Boosted100App: { id: 'Boosted100App', name: 'Boosted 100 - App Only', price: 4900 },
        Boosted100Email: { id: 'Boosted100Email', name: 'Boosted 100 - Email Only', price: 4900 },
        Boosted100Both: { id: 'Boosted100Both', name: 'Boosted 100 - Both', price: 6900, savings: 2900 },
        Boosted250App: { id: 'Boosted250App', name: 'Boosted 250 - App Only', price: 9900 },
        Boosted250Email: { id: 'Boosted250Email', name: 'Boosted 250 - Email Only', price: 9900 },
        Boosted250Both: { id: 'Boosted250Both', name: 'Boosted 250 - Both', price: 12900, savings: 6900 },
        Boosted500App: { id: 'Boosted500App', name: 'Boosted 500 - App Only', price: 14900 },
        Boosted500Email: { id: 'Boosted500Email', name: 'Boosted 500 - Email Only', price: 14900 },
        Boosted500Both: { id: 'Boosted500Both', name: 'Boosted 500 - Both', price: 18900, savings: 10900 },
        Boosted750App: { id: 'Boosted750App', name: 'Boosted 750 - App Only', price: 19900 },
        Boosted750Email: { id: 'Boosted750Email', name: 'Boosted 750 - Email Only', price: 19900 },
        Boosted750Both: { id: 'Boosted750Both', name: 'Boosted 750 - Both', price: 24900, savings: 14900 },
        Boosted1000App: { id: 'Boosted1000App', name: 'Boosted 1000 - App Only', price: 24900 },
        Boosted1000Email: { id: 'Boosted1000Email', name: 'Boosted 1000 - Email Only', price: 24900 },
        Boosted1000Both: { id: 'Boosted1000Both', name: 'Boosted 1000 - Both', price: 29900, savings: 19900 }
    }
};

class PaymentService {
    constructor() {
        this.stripe = null;
        this.init();
    }

    async init() {
        try {
            this.stripe = await stripePromise;
        } catch (error) {
            console.error('Failed to initialize Stripe:', error);
        }
    }

    async getStripe() {
        if (!this.stripe) {
            await this.init();
        }
        return this.stripe;
    }

    // Create payment intent for job posting
    async createJobPostingPayment(paymentData) {
        try {
            const response = await api.post('/payments/create-job-posting-payment', {
                planId: paymentData.planId,
                amount: paymentData.amount,
                currency: paymentData.currency || 'aud',
                employerId: paymentData.employerId,
                jobData: paymentData.jobData,
                addOns: paymentData.addOns || []
            });

            return response.data;
        } catch (error) {
            console.error('Error creating job posting payment:', error);
            throw error.response?.data || error.message;
        }
    }

    // Handle payment success
    async handlePaymentSuccess(paymentIntentId) {
        try {
            const response = await api.post('/payments/confirm-success', {
                paymentIntentId
            });

            return response.data;
        } catch (error) {
            console.error('Error handling payment success:', error);
            throw error.response?.data || error.message;
        }
    }

    // Handle payment failure
    async handlePaymentFailure(paymentIntentId, errorMessage) {
        try {
            const response = await api.post('/payments/handle-failure', {
                paymentIntentId,
                errorMessage
            });

            return response.data;
        } catch (error) {
            console.error('Error handling payment failure:', error);
            throw error.response?.data || error.message;
        }
    }
}

// Create singleton instance
const paymentService = new PaymentService();

// Export utility functions
export const PaymentUtils = {
    getPlanDetails: (planId) => {
        if (planId === 'Standard') {
            return PRICING_CONFIG.STANDARD;
        }
        return PRICING_CONFIG.NOTIFICATION_PACKAGES[planId] || null;
    },
    
    formatCurrency: (amount, currency = 'AUD') => {
        return new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: currency
        }).format(amount / 100);
    }
};

export default paymentService; 