import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    CreditCard,
    Gift,
    ArrowUpRight,
    ArrowDownLeft,
    Search,
    Filter,
    Download,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    RefreshCw,
    Plus,
    Minus,
    ChevronDown,
    ChevronUp,
    Calendar,
    FileText,
    Printer,
    Mail,
    X,
    User,
    Target,
    Zap,
    Shield,
    Crown,
    History,
    BarChart3,
    PieChart,
    Award
} from 'lucide-react';
import * as XLSX from 'xlsx';

const WalletManagement = () => {
    const { user: currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showAllTransactionsModal, setShowAllTransactionsModal] = useState(false);
    const [transactionType, setTransactionType] = useState('credit');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterTransactionType, setFilterTransactionType] = useState('all');
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [viewMode, setViewMode] = useState('users'); // 'users' | 'transactions'

    // Sample users with wallet data
    const sampleUsers = [
        {
            id: 1,
            username: 'player1',
            email: 'player1@email.com',
            credits: 2500,
            totalDeposited: 3000,
            totalWithdrawn: 500,
            transactions: [
                { id: 1, type: 'credit', amount: 500, description: 'Daily bonus', date: '2024-03-24 10:30', status: 'completed' },
                { id: 2, type: 'debit', amount: 100, description: 'Game entry fee', date: '2024-03-24 09:15', status: 'completed' },
                { id: 3, type: 'credit', amount: 1000, description: 'Deposit', date: '2024-03-23 14:20', status: 'completed' },
            ],
            joined: '2024-01-15',
            status: 'active'
        },
        {
            id: 2,
            username: 'player2',
            email: 'player2@email.com',
            credits: 1800,
            totalDeposited: 2000,
            totalWithdrawn: 200,
            transactions: [
                { id: 4, type: 'credit', amount: 200, description: 'Referral bonus', date: '2024-03-24 08:00', status: 'completed' },
                { id: 5, type: 'debit', amount: 50, description: 'Game entry fee', date: '2024-03-23 20:30', status: 'pending' },
            ],
            joined: '2024-02-01',
            status: 'active'
        },
        {
            id: 3,
            username: 'player3',
            email: 'player3@email.com',
            credits: 450,
            totalDeposited: 500,
            totalWithdrawn: 50,
            transactions: [
                { id: 6, type: 'credit', amount: 500, description: 'Deposit', date: '2024-03-22 16:45', status: 'completed' },
                { id: 7, type: 'debit', amount: 50, description: 'Withdrawal', date: '2024-03-23 11:00', status: 'failed' },
            ],
            joined: '2024-03-01',
            status: 'inactive'
        },
        {
            id: 4,
            username: 'player4',
            email: 'player4@email.com',
            credits: 3200,
            totalDeposited: 4000,
            totalWithdrawn: 800,
            transactions: [
                { id: 8, type: 'credit', amount: 2000, description: 'Deposit', date: '2024-03-20 12:00', status: 'completed' },
                { id: 9, type: 'credit', amount: 500, description: 'Tournament win', date: '2024-03-21 18:30', status: 'completed' },
                { id: 10, type: 'debit', amount: 300, description: 'Withdrawal', date: '2024-03-22 09:00', status: 'completed' },
            ],
            joined: '2023-11-20',
            status: 'active'
        },
        {
            id: 5,
            username: 'player5',
            email: 'player5@email.com',
            credits: 0,
            totalDeposited: 100,
            totalWithdrawn: 100,
            transactions: [
                { id: 11, type: 'credit', amount: 100, description: 'Deposit', date: '2024-03-15 10:00', status: 'completed' },
                { id: 12, type: 'debit', amount: 100, description: 'Withdrawal', date: '2024-03-16 14:30', status: 'completed' },
            ],
            joined: '2024-01-28',
            status: 'suspended'
        },
        {
            id: 6,
            username: 'admin_user',
            email: 'admin@bingo.com',
            credits: 10000,
            totalDeposited: 15000,
            totalWithdrawn: 5000,
            transactions: [
                { id: 13, type: 'credit', amount: 5000, description: 'Admin allocation', date: '2024-03-01 09:00', status: 'completed' },
                { id: 14, type: 'debit', amount: 1000, description: 'Promotion expense', date: '2024-03-10 15:00', status: 'completed' },
            ],
            joined: '2023-12-10',
            status: 'active'
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setUsers(sampleUsers);
            setLoading(false);
        }, 500);
    }, []);

    const showToast = (message) => {
        setToastMessage(message);
        setShowSuccessToast(true);
        setTimeout(() => {
            setShowSuccessToast(false);
        }, 3000);
    };

    const handleTransaction = () => {
        if (!amount || parseFloat(amount) <= 0) {
            showToast('Please enter a valid amount');
            return;
        }

        const updatedUsers = users.map(u => {
            if (u.id === selectedUser.id) {
                const newCredits = transactionType === 'credit'
                    ? u.credits + parseFloat(amount)
                    : u.credits - parseFloat(amount);

                const newTransaction = {
                    id: Date.now(),
                    type: transactionType,
                    amount: parseFloat(amount),
                    description: description || (transactionType === 'credit' ? 'Admin credit' : 'Admin debit'),
                    date: new Date().toISOString().replace('T', ' ').slice(0, 16),
                    status: 'completed'
                };

                return {
                    ...u,
                    credits: newCredits,
                    totalDeposited: transactionType === 'credit' ? u.totalDeposited + parseFloat(amount) : u.totalDeposited,
                    totalWithdrawn: transactionType === 'debit' ? u.totalWithdrawn + parseFloat(amount) : u.totalWithdrawn,
                    transactions: [newTransaction, ...u.transactions]
                };
            }
            return u;
        });

        setUsers(updatedUsers);
        setShowTransactionModal(false);
        setAmount('');
        setDescription('');
        showToast(`Successfully ${transactionType === 'credit' ? 'added' : 'deducted'} ${amount} credits`);
    };

    const handleBulkAction = (type) => {
        const selectedUsers = users.filter(u => u.status === 'active');
        const bonusAmount = 100;

        const updatedUsers = users.map(u => {
            if (selectedUsers.some(su => su.id === u.id)) {
                const newTransaction = {
                    id: Date.now() + u.id,
                    type: 'credit',
                    amount: bonusAmount,
                    description: `Bulk ${type} bonus`,
                    date: new Date().toISOString().replace('T', ' ').slice(0, 16),
                    status: 'completed'
                };

                return {
                    ...u,
                    credits: u.credits + bonusAmount,
                    totalDeposited: u.totalDeposited + bonusAmount,
                    transactions: [newTransaction, ...u.transactions]
                };
            }
            return u;
        });

        setUsers(updatedUsers);
        showToast(`Bulk ${type} bonus of ${bonusAmount} credits sent to all active users!`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'pending': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'failed': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="w-4 h-4" />;
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'failed': return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    // Get all transactions from all users
    const getAllTransactions = () => {
        let allTxs = [];
        users.forEach(u => {
            u.transactions.forEach(t => {
                allTxs.push({
                    ...t,
                    username: u.username,
                    email: u.email,
                    userId: u.id
                });
            });
        });
        return allTxs;
    };

    // Filter transactions
    const getFilteredTransactions = () => {
        let txs = getAllTransactions();

        // Filter by type
        if (filterTransactionType !== 'all') {
            txs = txs.filter(t => t.type === filterTransactionType);
        }

        // Filter by date range
        if (dateRange.start) {
            txs = txs.filter(t => t.date >= dateRange.start);
        }
        if (dateRange.end) {
            txs = txs.filter(t => t.date <= dateRange.end + ' 23:59');
        }

        // Sort by date (newest first)
        txs.sort((a, b) => new Date(b.date) - new Date(a.date));

        return txs;
    };

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTransactions = getFilteredTransactions();

    const stats = {
        totalUsers: users.length,
        totalCredits: users.reduce((sum, u) => sum + u.credits, 0),
        totalDeposited: users.reduce((sum, u) => sum + u.totalDeposited, 0),
        totalWithdrawn: users.reduce((sum, u) => sum + u.totalWithdrawn, 0),
        activeUsers: users.filter(u => u.status === 'active').length,
        totalTransactions: getAllTransactions().length,
        totalCompleted: getAllTransactions().filter(t => t.status === 'completed').length,
        totalPending: getAllTransactions().filter(t => t.status === 'pending').length,
        totalFailed: getAllTransactions().filter(t => t.status === 'failed').length
    };

    const exportTransactions = () => {
        const allTransactions = users.flatMap(u =>
            u.transactions.map(t => ({
                Username: u.username,
                Email: u.email,
                Type: t.type,
                Amount: t.amount,
                Description: t.description,
                Date: t.date,
                Status: t.status
            }))
        );

        const ws = XLSX.utils.json_to_sheet(allTransactions);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
        XLSX.writeFile(wb, `wallet_transactions_${new Date().toISOString().split('T')[0]}.xlsx`);
        showToast('Transactions exported successfully!');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400">Loading wallet data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Toast Notification */}
                <AnimatePresence>
                    {showSuccessToast && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="fixed top-20 right-4 z-50 bg-teal-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-xl border border-teal-400/30 flex items-center gap-2"
                        >
                            <CheckCircle className="w-5 h-5" />
                            {toastMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                            Wallet Management
                        </h1>
                        <p className="text-slate-400">Manage user wallets and transactions</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={() => handleBulkAction('daily')}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25"
                        >
                            <Gift className="w-4 h-4" />
                            <span>Bulk Bonus</span>
                        </button>
                        <button
                            onClick={exportTransactions}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/25"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-white rounded-lg hover:bg-slate-600/50 hover:border-teal-500/30 transition-all duration-300"
                        >
                            <RefreshCw className="w-4 h-4 text-teal-400" />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* View Mode Tabs */}
                <div className="flex gap-2 border-b border-teal-500/20 pb-4">
                    <button
                        onClick={() => setViewMode('users')}
                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${viewMode === 'users'
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                    >
                        <Users className="w-4 h-4" />
                        Users
                    </button>
                    <button
                        onClick={() => setViewMode('transactions')}
                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${viewMode === 'transactions'
                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                    >
                        <History className="w-4 h-4" />
                        All Transactions
                        <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                            {stats.totalTransactions}
                        </span>
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-teal-500/20">
                        <div className="flex items-center gap-2 text-teal-400 mb-1">
                            <Users className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Total Users</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
                        <div className="text-xs text-emerald-400 mt-1">{stats.activeUsers} active</div>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
                        <div className="flex items-center gap-2 text-cyan-400 mb-1">
                            <Wallet className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Total Credits</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{stats.totalCredits.toLocaleString()}</div>
                        <div className="text-xs text-slate-400 mt-1">circulating</div>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
                        <div className="flex items-center gap-2 text-emerald-400 mb-1">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Total Deposited</span>
                        </div>
                        <div className="text-2xl font-bold text-white">${stats.totalDeposited.toLocaleString()}</div>
                        <div className="text-xs text-emerald-400 mt-1">+12% this month</div>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20">
                        <div className="flex items-center gap-2 text-amber-400 mb-1">
                            <TrendingDown className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Total Withdrawn</span>
                        </div>
                        <div className="text-2xl font-bold text-white">${stats.totalWithdrawn.toLocaleString()}</div>
                        <div className="text-xs text-amber-400 mt-1">-8% this month</div>
                    </div>
                </div>

                {/* Users View */}
                {viewMode === 'users' && (
                    <>
                        {/* Search and Filter */}
                        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-teal-500/20">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 cursor-pointer"
                                    >
                                        <option value="all">All Users</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-teal-500/20">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-700/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden md:table-cell">Status</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider">Balance</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden lg:table-cell">Deposited</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden lg:table-cell">Withdrawn</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden xl:table-cell">Transactions</th>
                                            <th className="px-6 py-3 text-right text-slate-300 text-xs uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user, index) => (
                                            <motion.tr
                                                key={user.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.03 }}
                                                className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20">
                                                            {user.username.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{user.username}</p>
                                                            <p className="text-slate-400 text-sm">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 hidden md:table-cell">
                                                    <span className={`px-2 py-1 rounded-full text-xs border ${user.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                                        user.status === 'suspended' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                                            'bg-slate-500/20 text-slate-400 border-slate-500/30'
                                                        }`}>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`font-bold ${user.credits > 1000 ? 'text-emerald-400' : user.credits > 0 ? 'text-white' : 'text-red-400'}`}>
                                                        {user.credits.toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 hidden lg:table-cell text-emerald-400">
                                                    ${user.totalDeposited.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 hidden lg:table-cell text-amber-400">
                                                    ${user.totalWithdrawn.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 hidden xl:table-cell">
                                                    <span className="text-slate-300">{user.transactions.length}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => { setSelectedUser(user); setShowUserModal(true); }}
                                                            className="p-2 hover:bg-teal-500/20 rounded-lg transition-colors text-slate-400 hover:text-teal-400"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => { setSelectedUser(user); setShowTransactionModal(true); }}
                                                            className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors text-slate-400 hover:text-cyan-400"
                                                            title="Manage Wallet"
                                                        >
                                                            <Wallet className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 border-t border-slate-700/50 flex justify-between items-center">
                                <p className="text-sm text-slate-400">
                                    Showing {filteredUsers.length} of {users.length} users
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Transactions View */}
                {viewMode === 'transactions' && (
                    <>
                        {/* Transaction Filters */}
                        <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-teal-500/20">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search transactions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                                    />
                                </div>
                                <select
                                    value={filterTransactionType}
                                    onChange={(e) => setFilterTransactionType(e.target.value)}
                                    className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 cursor-pointer"
                                >
                                    <option value="all">All Types</option>
                                    <option value="credit">Credits</option>
                                    <option value="debit">Debits</option>
                                </select>
                                <input
                                    type="date"
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                    className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                                    placeholder="Start Date"
                                />
                                <input
                                    type="date"
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                    className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                                    placeholder="End Date"
                                />
                            </div>
                        </div>

                        {/* Transaction Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
                                <div className="text-emerald-400 text-sm font-medium">Completed</div>
                                <div className="text-2xl font-bold text-white">{stats.totalCompleted}</div>
                            </div>
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
                                <div className="text-yellow-400 text-sm font-medium">Pending</div>
                                <div className="text-2xl font-bold text-white">{stats.totalPending}</div>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                                <div className="text-red-400 text-sm font-medium">Failed</div>
                                <div className="text-2xl font-bold text-white">{stats.totalFailed}</div>
                            </div>
                        </div>

                        {/* Transactions Table */}
                        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-teal-500/20">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-700/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden md:table-cell">Description</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
                                            <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTransactions.map((t, index) => (
                                            <motion.tr
                                                key={t.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.02 }}
                                                className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                            {t.username.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="text-white text-sm">{t.username}</p>
                                                            <p className="text-slate-400 text-xs hidden sm:block">{t.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs border ${t.type === 'credit' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                                                        {t.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`font-bold ${t.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        {t.type === 'credit' ? '+' : '-'}{t.amount}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 hidden md:table-cell text-slate-300 text-sm">
                                                    {t.description}
                                                </td>
                                                <td className="px-6 py-4 hidden lg:table-cell text-slate-400 text-sm">
                                                    {t.date}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(t.status)}`}>
                                                        {getStatusIcon(t.status)}
                                                        {t.status}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 border-t border-slate-700/50 flex justify-between items-center">
                                <p className="text-sm text-slate-400">
                                    Showing {filteredTransactions.length} of {stats.totalTransactions} transactions
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Transaction Modal */}
                <AnimatePresence>
                    {showTransactionModal && selectedUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                                onClick={() => setShowTransactionModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full border border-teal-500/20"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Wallet className="w-6 h-6 text-teal-400" />
                                        Manage Wallet
                                    </h3>
                                    <button onClick={() => setShowTransactionModal(false)} className="text-slate-400 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="mb-4 p-3 bg-slate-700/30 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {selectedUser.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{selectedUser.username}</p>
                                            <p className="text-slate-400 text-sm">Current Balance: <span className="text-teal-400 font-bold">{selectedUser.credits.toLocaleString()}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setTransactionType('credit')}
                                            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${transactionType === 'credit'
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                                                : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
                                                }`}
                                        >
                                            <Plus className="w-4 h-4 inline mr-1" />
                                            Credit
                                        </button>
                                        <button
                                            onClick={() => setTransactionType('debit')}
                                            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${transactionType === 'debit'
                                                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25'
                                                : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
                                                }`}
                                        >
                                            <Minus className="w-4 h-4 inline mr-1" />
                                            Debit
                                        </button>
                                    </div>

                                    <div>
                                        <label className="text-slate-300 text-sm font-medium block mb-1">Amount</label>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Enter amount"
                                            className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-slate-300 text-sm font-medium block mb-1">Description (Optional)</label>
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Add a note..."
                                            className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() => setShowTransactionModal(false)}
                                            className="flex-1 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleTransaction}
                                            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 ${transactionType === 'credit'
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                                                : 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25'
                                                }`}
                                        >
                                            {transactionType === 'credit' ? 'Add Credits' : 'Deduct Credits'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* User Details Modal */}
                <AnimatePresence>
                    {showUserModal && selectedUser && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                                onClick={() => setShowUserModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-2xl w-full border border-teal-500/20 max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-teal-500/20">
                                            {selectedUser.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{selectedUser.username}</h3>
                                            <p className="text-slate-400 text-sm">{selectedUser.email}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded-full text-xs border ${selectedUser.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                                    selectedUser.status === 'suspended' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                                        'bg-slate-500/20 text-slate-400 border-slate-500/30'
                                                    }`}>
                                                    {selectedUser.status}
                                                </span>
                                                <span className="text-xs text-slate-400">Joined: {selectedUser.joined}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                        <p className="text-slate-400 text-xs">Balance</p>
                                        <p className={`text-lg font-bold ${selectedUser.credits > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                            {selectedUser.credits.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                        <p className="text-slate-400 text-xs">Deposited</p>
                                        <p className="text-lg font-bold text-emerald-400">${selectedUser.totalDeposited.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                        <p className="text-slate-400 text-xs">Withdrawn</p>
                                        <p className="text-lg font-bold text-amber-400">${selectedUser.totalWithdrawn.toLocaleString()}</p>
                                    </div>
                                </div>

                                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-teal-400" />
                                    Transaction History
                                </h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {selectedUser.transactions.map((t, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                {t.type === 'credit' ? (
                                                    <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
                                                ) : (
                                                    <ArrowUpRight className="w-5 h-5 text-red-400" />
                                                )}
                                                <div>
                                                    <p className="text-white text-sm">{t.description}</p>
                                                    <p className="text-slate-500 text-xs">{t.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-semibold ${t.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    {t.type === 'credit' ? '+' : '-'}{t.amount}
                                                </p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(t.status)}`}>
                                                    {t.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => { setShowUserModal(false); setShowTransactionModal(true); }}
                                        className="flex-1 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/25"
                                    >
                                        <Wallet className="w-4 h-4 inline mr-1" />
                                        Manage Wallet
                                    </button>
                                    <button
                                        onClick={() => setShowUserModal(false)}
                                        className="flex-1 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <style>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #14b8a6;
                        border-radius: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #06b6d4;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default WalletManagement;