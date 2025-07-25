import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useEmployerStore } from '../store/employer.store';
import api from '../services/api';
import { CreditCard, Download, Eye, Calendar, Filter, Search, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const PaymentHistory = () => {
    const navigate = useNavigate();
    const { employer } = useEmployerStore();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({});
    const [summary, setSummary] = useState({});
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        page: 1,
        limit: 10
    });

    useEffect(() => {
        fetchPaymentHistory();
    }, [filters]);

    const fetchPaymentHistory = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams();
            
            Object.entries(filters).forEach(([key, value]) => {
                if (value) queryParams.append(key, value);
            });

            const response = await api.get(`/payments/history/${employer._id}?${queryParams}`);
            
            if (response.data.success) {
                setPayments(response.data.payments);
                setPagination(response.data.pagination);
                setSummary(response.data.summary);
            }
        } catch (error) {
            console.error('Error fetching payment history:', error);
            toast.error('Failed to load payment history');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            minimumFractionDigits: 2
        }).format(amount / 100);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'failed': return 'bg-red-100 text-red-800';
            case 'cancelled': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'job_posting': return 'Job Posting';
            case 'notification_package': return 'Notification Package';
            case 'subscription': return 'Subscription';
            default: return type;
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1 // Reset to first page when filtering
        }));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({
            ...prev,
            page: newPage
        }));
    };

    const viewInvoice = async (paymentId) => {
        try {
            const response = await api.get(`/payments/invoice/${paymentId}`);
            if (response.data.success) {
                // Here you could open a modal or navigate to an invoice page
                console.log('Invoice data:', response.data.invoice);
                toast.info('Invoice details logged to console');
            }
        } catch (error) {
            console.error('Error fetching invoice:', error);
            toast.error('Failed to load invoice');
        }
    };

    if (!employer) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-poppins">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => navigate('/employer-dashboard')}
                                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
                                <p className="text-gray-600">Track your payment transactions and invoices</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <CreditCard size={32} className="text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(summary.totalSpent || 0)}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                        <p className="text-2xl font-bold text-green-600">
                            {summary.statusCounts?.completed || 0}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                        <p className="text-2xl font-bold text-yellow-600">
                            {summary.statusCounts?.pending || 0}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm font-medium text-gray-500">Failed</h3>
                        <p className="text-2xl font-bold text-red-600">
                            {summary.statusCounts?.failed || 0}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center">
                            <Filter size={16} className="mr-2 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Filters:</span>
                        </div>
                        
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        <select
                            value={filters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Types</option>
                            <option value="job_posting">Job Posting</option>
                            <option value="notification_package">Notification Package</option>
                            <option value="subscription">Subscription</option>
                        </select>

                        <button
                            onClick={() => setFilters({ status: '', type: '', page: 1, limit: 10 })}
                            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Payment Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : payments.length === 0 ? (
                        <div className="text-center py-12">
                            <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                            <p className="text-gray-600">You haven't made any payments yet.</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Plan/Package
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {payments.map((payment) => (
                                            <tr key={payment._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatDate(payment.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {getTypeLabel(payment.type)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {formatCurrency(payment.amount)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                                                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {payment.planId || payment.packageId || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => viewInvoice(payment._id)}
                                                        className="text-blue-600 hover:text-blue-900 flex items-center"
                                                    >
                                                        <Eye size={16} className="mr-1" />
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {pagination.pages > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Showing {((pagination.current - 1) * pagination.limit) + 1} to{' '}
                                            {Math.min(pagination.current * pagination.limit, pagination.total)} of{' '}
                                            {pagination.total} results
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handlePageChange(pagination.current - 1)}
                                                disabled={pagination.current === 1}
                                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Previous
                                            </button>
                                            <span className="px-3 py-2 text-sm">
                                                {pagination.current} of {pagination.pages}
                                            </span>
                                            <button
                                                onClick={() => handlePageChange(pagination.current + 1)}
                                                disabled={pagination.current === pagination.pages}
                                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory; 