import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    TrendingUp,
    DollarSign,
    Activity,
    Search,
    Filter,
    Download,
    Eye,
    MoreVertical,
    ArrowUp,
    ArrowDown,
    Crown,
    Target,
    Zap,
    Shield,
    BarChart3,
    PieChart,
    Calendar,
    Clock,
    Award,
    Gift,
    Star,
    UserCheck,
    UserX,
    RefreshCw,
    ChevronDown
} from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Stats data
    const stats = [
        {
            label: 'Total Users',
            value: '1,284',
            change: '+12%',
            icon: Users,
            color: 'from-teal-500 to-cyan-500',
            changeUp: true
        },
        {
            label: 'Active Games',
            value: '47',
            change: '+8%',
            icon: Target,
            color: 'from-cyan-500 to-blue-500',
            changeUp: true
        },
        {
            label: 'Revenue',
            value: '$3,421',
            change: '+23%',
            icon: DollarSign,
            color: 'from-emerald-500 to-teal-500',
            changeUp: true
        },
        {
            label: 'Credits Won',
            value: '25.8K',
            change: '-3%',
            icon: TrendingUp,
            color: 'from-amber-500 to-orange-500',
            changeUp: false
        },
    ];

    // Sample users data
    const sampleUsers = [
        {
            id: 1,
            username: 'player1',
            email: 'player1@email.com',
            role: 'player',
            status: 'active',
            credits: 2500,
            gamesPlayed: 142,
            wins: 23,
            joined: '2024-01-15',
            lastActive: '2 hours ago'
        },
        {
            id: 2,
            username: 'player2',
            email: 'player2@email.com',
            role: 'player',
            status: 'active',
            credits: 1800,
            gamesPlayed: 89,
            wins: 12,
            joined: '2024-02-01',
            lastActive: '1 day ago'
        },
        {
            id: 3,
            username: 'admin_user',
            email: 'admin@bingo.com',
            role: 'admin',
            status: 'active',
            credits: 10000,
            gamesPlayed: 45,
            wins: 8,
            joined: '2023-12-10',
            lastActive: '30 minutes ago'
        },
        {
            id: 4,
            username: 'player3',
            email: 'player3@email.com',
            role: 'player',
            status: 'inactive',
            credits: 450,
            gamesPlayed: 34,
            wins: 2,
            joined: '2024-03-05',
            lastActive: '2 weeks ago'
        },
        {
            id: 5,
            username: 'player4',
            email: 'player4@email.com',
            role: 'player',
            status: 'active',
            credits: 3200,
            gamesPlayed: 201,
            wins: 45,
            joined: '2023-11-20',
            lastActive: '5 hours ago'
        },
        {
            id: 6,
            username: 'player5',
            email: 'player5@email.com',
            role: 'player',
            status: 'suspended',
            credits: 0,
            gamesPlayed: 67,
            wins: 5,
            joined: '2024-01-28',
            lastActive: '3 days ago'
        },
    ];

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            setUsers(sampleUsers);
            setLoading(false);
        }, 500);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'inactive': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
            case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const getRoleIcon = (role) => {
        return role === 'admin' ? <Crown className="w-4 h-4 text-yellow-400" /> : <Users className="w-4 h-4 text-teal-400" />;
    };

    // Filter users
    const filteredUsers = users.filter(u => {
        if (filter === 'all') return true;
        if (filter === 'active') return u.status === 'active';
        if (filter === 'inactive') return u.status === 'inactive';
        if (filter === 'suspended') return u.status === 'suspended';
        if (filter === 'admin') return u.role === 'admin';
        if (filter === 'player') return u.role === 'player';
        return true;
    }).filter(u => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return u.username.toLowerCase().includes(search) ||
            u.email.toLowerCase().includes(search);
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-slate-400 mt-1">Welcome back, {user?.username || 'Admin'}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-lg text-teal-400 hover:bg-teal-500/20 transition-all duration-300 flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg text-white hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-teal-500/25">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`bg-gradient-to-br ${stat.color} p-6 rounded-xl border border-white/10 shadow-xl`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-white/70 text-sm">{stat.label}</p>
                                        <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 mt-2">
                                    {stat.changeUp ? (
                                        <ArrowUp className="w-3 h-3 text-green-400" />
                                    ) : (
                                        <ArrowDown className="w-3 h-3 text-red-400" />
                                    )}
                                    <span className={`text-xs ${stat.changeUp ? 'text-green-400' : 'text-red-400'}`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-white/50 text-xs ml-1">vs last month</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Users Table */}
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-teal-500/20 shadow-xl overflow-hidden">
                    {/* Table Header */}
                    <div className="p-6 border-b border-slate-700/50">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <Users className="w-6 h-6 text-teal-400" />
                                <h2 className="text-xl font-bold text-white">User Management</h2>
                                <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-full">
                                    {filteredUsers.length} users
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                                <div className="relative flex-1 sm:w-48">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="appearance-none pl-4 pr-10 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 cursor-pointer"
                                    >
                                        <option value="all">All Users</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                        <option value="admin">Admins</option>
                                        <option value="player">Players</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-700/30">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Credits</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Games</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Joined</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/30">
                                {filteredUsers.map((u, index) => (
                                    <motion.tr
                                        key={u.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-slate-700/20 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20">
                                                    {u.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{u.username}</p>
                                                    <p className="text-slate-400 text-sm">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <div className="flex items-center gap-2">
                                                {getRoleIcon(u.role)}
                                                <span className="text-white text-sm capitalize">{u.role}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(u.status)}`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <span className="text-white font-semibold">{u.credits.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="text-slate-300">{u.gamesPlayed}</span>
                                            <span className="text-slate-500 text-xs ml-1">(W: {u.wins})</span>
                                        </td>
                                        <td className="px-6 py-4 hidden lg:table-cell">
                                            <span className="text-slate-400 text-sm">{u.joined}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedUser(u)}
                                                    className="p-2 hover:bg-teal-500/20 rounded-lg transition-colors text-slate-400 hover:text-teal-400"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors text-slate-400 hover:text-white">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="px-6 py-4 border-t border-slate-700/50 flex justify-between items-center">
                        <p className="text-sm text-slate-400">
                            Showing {filteredUsers.length} of {users.length} users
                        </p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-400 hover:bg-slate-600/50 transition-colors text-sm">
                                Previous
                            </button>
                            <button className="px-3 py-1 bg-teal-500/20 rounded-lg text-teal-400 text-sm">
                                1
                            </button>
                            <button className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-400 hover:bg-slate-600/50 transition-colors text-sm">
                                2
                            </button>
                            <button className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-400 hover:bg-slate-600/50 transition-colors text-sm">
                                3
                            </button>
                            <button className="px-3 py-1 bg-slate-700/50 rounded-lg text-slate-400 hover:bg-slate-600/50 transition-colors text-sm">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                {/* User Detail Modal */}
                <AnimatePresence>
                    {selectedUser && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={() => setSelectedUser(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-teal-500/20 shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-teal-500/20">
                                        {selectedUser.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{selectedUser.username}</h3>
                                        <p className="text-slate-400 text-sm">{selectedUser.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                        <p className="text-slate-400 text-xs">Credits</p>
                                        <p className="text-white font-bold">{selectedUser.credits.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                        <p className="text-slate-400 text-xs">Status</p>
                                        <span className={`px-2 py-0.5 rounded-full text-xs border ${getStatusColor(selectedUser.status)}`}>
                                            {selectedUser.status}
                                        </span>
                                    </div>
                                    <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                        <p className="text-slate-400 text-xs">Games Played</p>
                                        <p className="text-white font-bold">{selectedUser.gamesPlayed}</p>
                                    </div>
                                    <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                        <p className="text-slate-400 text-xs">Wins</p>
                                        <p className="text-white font-bold">{selectedUser.wins}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="w-full py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/25"
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminDashboard;