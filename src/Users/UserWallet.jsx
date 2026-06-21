import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    CreditCard,
    Gift,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    CheckCircle,
    XCircle,
    RefreshCw,
    Plus,
    Minus,
    Target,
    Zap,
    Crown,
    Shield,
    DollarSign,
    History,
    Award,
    Sparkles
} from 'lucide-react';

const UserWallet = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [stats, setStats] = useState({
        totalDeposited: 0,
        totalWithdrawn: 0,
        totalWon: 0
    });

    // Sample transaction data
    const sampleTransactions = [
        { id: 1, type: 'credit', amount: 500, description: 'Daily bonus', date: '2024-03-24 10:30', status: 'completed' },
        { id: 2, type: 'debit', amount: 100, description: 'Game entry fee - Classic Bingo', date: '2024-03-24 09:15', status: 'completed' },
        { id: 3, type: 'credit', amount: 1000, description: 'Deposit', date: '2024-03-23 14:20', status: 'completed' },
        { id: 4, type: 'credit', amount: 250, description: 'Tournament win', date: '2024-03-23 11:00', status: 'completed' },
        { id: 5, type: 'debit', amount: 200, description: 'Withdrawal', date: '2024-03-22 16:45', status: 'pending' },
        { id: 6, type: 'credit', amount: 100, description: 'Referral bonus', date: '2024-03-22 08:00', status: 'completed' },
        { id: 7, type: 'debit', amount: 50, description: 'Game entry fee - Speed Bingo', date: '2024-03-21 20:30', status: 'completed' },
        { id: 8, type: 'credit', amount: 750, description: 'Deposit', date: '2024-03-21 12:00', status: 'completed' },
        { id: 9, type: 'debit', amount: 300, description: 'Withdrawal', date: '2024-03-20 10:00', status: 'failed' },
        { id: 10, type: 'credit', amount: 150, description: 'Daily bonus', date: '2024-03-20 09:30', status: 'completed' },
    ];

    useEffect(() => {
        // In real app, fetch from API
        setTimeout(() => {
            setTransactions(sampleTransactions);
            setBalance(user?.credits || 2500);
            setStats({
                totalDeposited: 3750,
                totalWithdrawn: 500,
                totalWon: 1250
            });
            setLoading(false);
        }, 500);
    }, [user]);

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400">Loading wallet...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                            My Wallet
                        </h1>
                        <p className="text-slate-400">Manage your credits and transactions</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-white rounded-lg hover:bg-slate-600/50 hover:border-teal-500/30 transition-all duration-300"
                        >
                            <RefreshCw className="w-4 h-4 text-teal-400" />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Balance Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 rounded-2xl p-6 md:p-8 shadow-2xl shadow-teal-500/20"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <p className="text-white/80 text-sm font-medium">Available Balance</p>
                            <div className="flex items-center gap-3">
                                <Wallet className="w-8 h-8 text-white/80" />
                                <span className="text-4xl md:text-5xl font-bold text-white">
                                    {balance.toLocaleString()}
                                </span>
                                <span className="text-white/70 text-lg">credits</span>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all hover:scale-105 flex items-center justify-center gap-2">
                                <Plus className="w-5 h-5" />
                                Deposit
                            </button>
                            <button className="flex-1 md:flex-none px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all hover:scale-105 flex items-center justify-center gap-2">
                                <Minus className="w-5 h-5" />
                                Withdraw
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20"
                    >
                        <div className="flex items-center gap-2 text-emerald-400 mb-1">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Total Deposited</span>
                        </div>
                        <div className="text-2xl font-bold text-white">${stats.totalDeposited.toLocaleString()}</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20"
                    >
                        <div className="flex items-center gap-2 text-amber-400 mb-1">
                            <TrendingDown className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Total Withdrawn</span>
                        </div>
                        <div className="text-2xl font-bold text-white">${stats.totalWithdrawn.toLocaleString()}</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20"
                    >
                        <div className="flex items-center gap-2 text-purple-400 mb-1">
                            <Award className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Total Won</span>
                        </div>
                        <div className="text-2xl font-bold text-white">${stats.totalWon.toLocaleString()}</div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                    {[
                        { icon: Gift, label: 'Daily Bonus', color: 'from-teal-500 to-cyan-500', action: () => { } },
                        { icon: Target, label: 'Play Game', color: 'from-emerald-500 to-teal-500', action: () => { } },
                        { icon: Crown, label: 'VIP Rewards', color: 'from-amber-500 to-orange-500', action: () => { } },
                        { icon: History, label: 'History', color: 'from-purple-500 to-pink-500', action: () => { } },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            className={`bg-gradient-to-r ${item.color} p-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg`}
                        >
                            <item.icon className="w-6 h-6 mx-auto mb-2" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Transaction History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-teal-500/20"
                >
                    <div className="px-6 py-4 border-b border-teal-500/20 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <History className="w-5 h-5 text-teal-400" />
                            <h3 className="text-white font-semibold">Transaction History</h3>
                            <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full">
                                {transactions.length}
                            </span>
                        </div>
                        <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-700/50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider">Transaction</th>
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden sm:table-cell">Date</th>
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden md:table-cell">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <motion.tr
                                        key={transaction.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {transaction.type === 'credit' ? (
                                                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                                        <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                                        <ArrowUpRight className="w-5 h-5 text-red-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-white text-sm font-medium">{transaction.description}</p>
                                                    <p className="text-slate-400 text-xs sm:hidden">{formatDate(transaction.date)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell text-slate-400 text-sm">
                                            {formatDate(transaction.date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-semibold ${transaction.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(transaction.status)}`}>
                                                {getStatusIcon(transaction.status)}
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Footer */}
                <div className="text-center text-slate-500 text-sm">
                    <p>Secure wallet • All transactions are encrypted</p>
                </div>
            </div>
        </div>
    );
};

export default UserWallet;