import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    Filter,
    Download,
    UserPlus,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    ChevronDown,
    ChevronUp,
    CheckCircle,
    XCircle,
    Clock,
    Shield,
    Crown,
    UserCheck,
    UserX,
    Mail,
    Phone,
    Calendar,
    Award,
    Star,
    Target,
    Zap,
    RefreshCw,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import * as XLSX from 'xlsx';

const UsersPage = () => {
    const { users: authUsers = [] } = useAuth() || {};
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortField, setSortField] = useState('username');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Sample users data with more fields
    const sampleUsers = [
        {
            id: 1,
            username: 'admin_user',
            email: 'admin@bingo.com',
            role: 'admin',
            status: 'active',
            credits: 10000,
            gamesPlayed: 145,
            wins: 28,
            joined: '2024-01-15',
            lastActive: '2 minutes ago',
            phone: '+1 234 567 890',
            avatar: null
        },
        {
            id: 2,
            username: 'player1',
            email: 'player1@email.com',
            role: 'player',
            status: 'active',
            credits: 2500,
            gamesPlayed: 342,
            wins: 45,
            joined: '2024-02-01',
            lastActive: '1 hour ago',
            phone: '+1 234 567 891',
            avatar: null
        },
        {
            id: 3,
            username: 'player2',
            email: 'player2@email.com',
            role: 'player',
            status: 'active',
            credits: 1800,
            gamesPlayed: 189,
            wins: 23,
            joined: '2024-02-15',
            lastActive: '3 hours ago',
            phone: '+1 234 567 892',
            avatar: null
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
            joined: '2024-03-01',
            lastActive: '2 weeks ago',
            phone: '+1 234 567 893',
            avatar: null
        },
        {
            id: 5,
            username: 'player4',
            email: 'player4@email.com',
            role: 'player',
            status: 'active',
            credits: 3200,
            gamesPlayed: 401,
            wins: 67,
            joined: '2023-11-20',
            lastActive: '5 hours ago',
            phone: '+1 234 567 894',
            avatar: null
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
            lastActive: '3 days ago',
            phone: '+1 234 567 895',
            avatar: null
        },
        {
            id: 7,
            username: 'player6',
            email: 'player6@email.com',
            role: 'player',
            status: 'active',
            credits: 5600,
            gamesPlayed: 278,
            wins: 34,
            joined: '2024-02-20',
            lastActive: '30 minutes ago',
            phone: '+1 234 567 896',
            avatar: null
        },
        {
            id: 8,
            username: 'player7',
            email: 'player7@email.com',
            role: 'player',
            status: 'inactive',
            credits: 120,
            gamesPlayed: 12,
            wins: 0,
            joined: '2024-03-15',
            lastActive: '1 month ago',
            phone: '+1 234 567 897',
            avatar: null
        },
        {
            id: 9,
            username: 'player8',
            email: 'player8@email.com',
            role: 'player',
            status: 'active',
            credits: 8900,
            gamesPlayed: 512,
            wins: 89,
            joined: '2023-10-05',
            lastActive: '15 minutes ago',
            phone: '+1 234 567 898',
            avatar: null
        },
        {
            id: 10,
            username: 'player9',
            email: 'player9@email.com',
            role: 'player',
            status: 'suspended',
            credits: 0,
            gamesPlayed: 45,
            wins: 3,
            joined: '2024-01-10',
            lastActive: '5 days ago',
            phone: '+1 234 567 899',
            avatar: null
        },
    ];

    useEffect(() => {
        // Use auth users if available, otherwise use sample data
        const userData = authUsers && authUsers.length > 0 ? authUsers : sampleUsers;
        setUsers(userData);
        setLoading(false);
    }, [authUsers]);

    const showToast = (message) => {
        setToastMessage(message);
        setShowSuccessToast(true);
        setTimeout(() => {
            setShowSuccessToast(false);
        }, 3000);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'inactive': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
            case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const getRoleBadge = (role) => {
        if (role === 'admin') {
            return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs border border-yellow-500/30 flex items-center gap-1"><Crown className="w-3 h-3" /> Admin</span>;
        }
        return <span className="px-2 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs border border-teal-500/30 flex items-center gap-1"><Users className="w-3 h-3" /> Player</span>;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
            case 'inactive': return <Clock className="w-4 h-4 text-slate-400" />;
            case 'suspended': return <XCircle className="w-4 h-4 text-red-400" />;
            default: return <Clock className="w-4 h-4 text-slate-400" />;
        }
    };

    // Filter and sort users
    const filteredUsers = users
        .filter(user => {
            const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = filterRole === 'all' || user.role === filterRole;
            const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
            return matchesSearch && matchesRole && matchesStatus;
        })
        .sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            if (sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter(u => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
        showToast(`User ${userToDelete.username} deleted successfully!`);
    };

    const handleExport = () => {
        const exportData = users.map(u => ({
            Username: u.username,
            Email: u.email,
            Role: u.role,
            Status: u.status,
            Credits: u.credits,
            'Games Played': u.gamesPlayed,
            Wins: u.wins,
            Joined: u.joined,
            'Last Active': u.lastActive
        }));
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        XLSX.writeFile(wb, `users_${new Date().toISOString().split('T')[0]}.xlsx`);
        showToast('Users exported successfully!');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Success Toast */}
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
                            User Management
                        </h1>
                        <p className="text-slate-400">Manage all users and their activities</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-white rounded-lg hover:bg-slate-600/50 hover:border-teal-500/30 transition-all duration-300"
                        >
                            <RefreshCw className="w-4 h-4 text-teal-400" />
                            <span>Refresh</span>
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/25"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25"
                        >
                            <UserPlus className="w-4 h-4" />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-teal-500/20">
                        <div className="flex items-center gap-2 text-teal-400 mb-1">
                            <Users className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Total</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{users.length}</div>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20">
                        <div className="flex items-center gap-2 text-emerald-400 mb-1">
                            <UserCheck className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Active</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{users.filter(u => u.status === 'active').length}</div>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
                        <div className="flex items-center gap-2 text-red-400 mb-1">
                            <UserX className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Suspended</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{users.filter(u => u.status === 'suspended').length}</div>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20">
                        <div className="flex items-center gap-2 text-amber-400 mb-1">
                            <Crown className="w-4 h-4" />
                            <span className="text-xs text-slate-400">Admins</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{users.filter(u => u.role === 'admin').length}</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-teal-500/20">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search users by username or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                            />
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 cursor-pointer"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admins</option>
                                <option value="player">Players</option>
                            </select>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 cursor-pointer"
                            >
                                <option value="all">All Status</option>
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
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('username')}>
                                        <div className="flex items-center gap-2">
                                            User
                                            {sortField === 'username' && (
                                                sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                            )}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden md:table-cell">Role</th>
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden sm:table-cell">Status</th>
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider cursor-pointer hover:text-white transition-colors hidden lg:table-cell" onClick={() => handleSort('credits')}>
                                        <div className="flex items-center gap-2">
                                            Credits
                                            {sortField === 'credits' && (
                                                sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                            )}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden xl:table-cell">Games</th>
                                    <th className="px-6 py-3 text-left text-slate-300 text-xs uppercase tracking-wider hidden lg:table-cell">Joined</th>
                                    <th className="px-6 py-3 text-right text-slate-300 text-xs uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
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
                                                        <p className="text-slate-400 text-sm flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                {getRoleBadge(user.role)}
                                            </td>
                                            <td className="px-6 py-4 hidden sm:table-cell">
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(user.status)}
                                                    <span className={`text-xs font-medium capitalize ${user.status === 'active' ? 'text-emerald-400' : user.status === 'suspended' ? 'text-red-400' : 'text-slate-400'}`}>
                                                        {user.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <span className="text-white font-semibold">{user.credits.toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-4 hidden xl:table-cell">
                                                <div className="flex items-center gap-2">
                                                    <Target className="w-3 h-3 text-slate-400" />
                                                    <span className="text-slate-300">{user.gamesPlayed}</span>
                                                    <span className="text-slate-500 text-xs">(W: {user.wins})</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell">
                                                <span className="text-slate-400 text-sm">{user.joined}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => { setSelectedUser(user); setShowUserModal(true); }}
                                                        className="p-2 hover:bg-teal-500/20 rounded-lg transition-colors text-slate-400 hover:text-teal-400"
                                                        title="View User"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors text-slate-400 hover:text-blue-400"
                                                        title="Edit User"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteUser(user)}
                                                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="w-12 h-12 text-slate-600" />
                                                <p>No users found matching your filters</p>
                                                <button
                                                    onClick={() => { setSearchTerm(''); setFilterRole('all'); setFilterStatus('all'); }}
                                                    className="text-teal-400 hover:text-teal-300 text-sm"
                                                >
                                                    Clear filters
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-3">
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

                {/* Delete Modal */}
                <AnimatePresence>
                    {showDeleteModal && userToDelete && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                                onClick={() => setShowDeleteModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                            >
                                <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 border border-red-500/20">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Trash2 className="w-8 h-8 text-red-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">Delete User</h3>
                                        <p className="text-slate-400 mt-2">
                                            Are you sure you want to delete <span className="text-white font-semibold">{userToDelete.username}</span>? This action cannot be undone.
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowDeleteModal(false)}
                                            className="flex-1 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-all duration-300"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmDelete}
                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:scale-105 transition-all duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* User Detail Modal */}
                <AnimatePresence>
                    {showUserModal && selectedUser && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                                onClick={() => setShowUserModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                            >
                                <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 border border-teal-500/20">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-teal-500/20">
                                                {selectedUser.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{selectedUser.username}</h3>
                                                <p className="text-slate-400 text-sm">{selectedUser.email}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setShowUserModal(false)} className="text-slate-400 hover:text-white transition-colors">
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                            <p className="text-slate-400 text-xs">Role</p>
                                            <div className="flex items-center justify-center gap-1 mt-1">
                                                {selectedUser.role === 'admin' ? <Crown className="w-4 h-4 text-yellow-400" /> : <Users className="w-4 h-4 text-teal-400" />}
                                                <span className="text-white font-medium capitalize">{selectedUser.role}</span>
                                            </div>
                                        </div>
                                        <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                            <p className="text-slate-400 text-xs">Status</p>
                                            <div className="flex items-center justify-center gap-1 mt-1">
                                                {getStatusIcon(selectedUser.status)}
                                                <span className="text-white font-medium capitalize">{selectedUser.status}</span>
                                            </div>
                                        </div>
                                        <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                            <p className="text-slate-400 text-xs">Credits</p>
                                            <p className="text-white font-bold">{selectedUser.credits.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                                            <p className="text-slate-400 text-xs">Games Played</p>
                                            <p className="text-white font-bold">{selectedUser.gamesPlayed}</p>
                                            <p className="text-slate-500 text-xs">Wins: {selectedUser.wins}</p>
                                        </div>
                                        <div className="bg-slate-700/30 rounded-lg p-3 text-center col-span-2">
                                            <p className="text-slate-400 text-xs">Joined</p>
                                            <p className="text-white font-medium">{selectedUser.joined}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowUserModal(false)}
                                        className="w-full py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/25"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default UsersPage;