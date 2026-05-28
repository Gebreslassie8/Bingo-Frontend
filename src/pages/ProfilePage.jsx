import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
    User,
    Mail,
    Calendar,
    Wallet,
    Edit,
    Lock,
    Award,
    TrendingUp,
    Shield,
    Star,
    LogOut,
    Camera,
    X,
    Check,
    AlertCircle
} from 'lucide-react';

const ProfilePage = () => {
    const { user, updateUserProfile } = useAuth();
    const [activeModal, setActiveModal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Form states
    const [editForm, setEditForm] = useState({
        username: user?.username || '',
        email: user?.email || ''
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const stats = [
        { label: 'Games Played', value: user?.stats?.gamesPlayed || 0, icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
        { label: 'Games Won', value: user?.stats?.gamesWon || 0, icon: Award, color: 'from-green-500 to-emerald-500' },
        { label: 'Win Rate', value: `${user?.stats?.gamesPlayed > 0 ? ((user.stats.gamesWon / user.stats.gamesPlayed) * 100).toFixed(1) : 0}%`, icon: Star, color: 'from-yellow-500 to-orange-500' },
        { label: 'Total Winnings', value: `${user?.stats?.totalWinnings || 0} 💰`, icon: Wallet, color: 'from-purple-500 to-pink-500' },
    ];

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Update user profile logic here
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            setActiveModal(null);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            return;
        }
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            setActiveModal(null);
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to change password' });
        } finally {
            setLoading(false);
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Profile</h1>
                <p className="text-slate-400">Manage your account information and preferences</p>
            </div>

            {/* Message Alert */}
            <AnimatePresence>
                {message.text && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 'bg-red-500/20 border border-red-500/50 text-red-400'
                            }`}
                    >
                        {message.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span>{message.text}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Profile Header Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 mb-6 shadow-xl"
            >
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl">
                            <span className="text-5xl md:text-6xl text-white font-bold">
                                {user?.username?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <button className="absolute bottom-0 right-0 bg-slate-700 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-500">
                            <Camera className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{user?.username}</h2>
                        <p className="text-slate-400 mb-2">{user?.email}</p>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <span className="inline-flex items-center gap-1 text-sm text-slate-400">
                                <Calendar className="w-4 h-4" />
                                Member since {new Date(user?.createdAt).toLocaleDateString()}
                            </span>
                            <span className="inline-flex items-center gap-1 text-sm text-slate-400">
                                <Shield className="w-4 h-4" />
                                {user?.role === 'admin' ? 'Administrator' : 'Player'}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setActiveModal('edit')}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all hover:scale-105"
                        >
                            <Edit className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit Profile</span>
                        </button>
                        <button
                            onClick={() => setActiveModal('password')}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all hover:scale-105"
                        >
                            <Lock className="w-4 h-4" />
                            <span className="hidden sm:inline">Change Password</span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 shadow-lg`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className="w-6 h-6 text-white opacity-80" />
                            <span className="text-white/60 text-xs">Stats</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-white/80 text-sm">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Account Information Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-800 rounded-2xl p-6 shadow-xl"
            >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-400" />
                    Account Information
                </h3>
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-slate-700">
                        <span className="text-slate-400 flex items-center gap-2">
                            <User className="w-4 h-4" /> Username
                        </span>
                        <span className="text-white font-medium">{user?.username}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-slate-700">
                        <span className="text-slate-400 flex items-center gap-2">
                            <Mail className="w-4 h-4" /> Email
                        </span>
                        <span className="text-white font-medium">{user?.email}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between py-3 border-b border-slate-700">
                        <span className="text-slate-400 flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Account Type
                        </span>
                        <span className="text-white font-medium capitalize">{user?.role}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between py-3">
                        <span className="text-slate-400 flex items-center gap-2">
                            <Wallet className="w-4 h-4" /> Wallet Balance
                        </span>
                        <span className="text-yellow-400 font-bold text-lg">{user?.wallet?.balance} 💰</span>
                    </div>
                </div>
            </motion.div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {activeModal === 'edit' && (
                    <>
                        <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                            onClick={() => setActiveModal(null)}
                        />
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                        >
                            <div className="bg-slate-800 rounded-2xl shadow-2xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
                                    <button
                                        onClick={() => setActiveModal(null)}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleEditProfile}>
                                    <div className="mb-4">
                                        <label className="block text-slate-300 mb-2 text-sm">Username</label>
                                        <input
                                            type="text"
                                            value={editForm.username}
                                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                            className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-slate-300 mb-2 text-sm">Email</label>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all disabled:opacity-50"
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveModal(null)}
                                            className="flex-1 bg-slate-700 text-white py-2 rounded-lg font-semibold hover:bg-slate-600 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Change Password Modal */}
            <AnimatePresence>
                {activeModal === 'password' && (
                    <>
                        <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                            onClick={() => setActiveModal(null)}
                        />
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                        >
                            <div className="bg-slate-800 rounded-2xl shadow-2xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-white">Change Password</h3>
                                    <button
                                        onClick={() => setActiveModal(null)}
                                        className="text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleChangePassword}>
                                    <div className="mb-4">
                                        <label className="block text-slate-300 mb-2 text-sm">Current Password</label>
                                        <input
                                            type="password"
                                            value={passwordForm.currentPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                            className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-slate-300 mb-2 text-sm">New Password</label>
                                        <input
                                            type="password"
                                            value={passwordForm.newPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                            className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                            minLength="6"
                                        />
                                        <p className="text-slate-500 text-xs mt-1">Minimum 6 characters</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-slate-300 mb-2 text-sm">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={passwordForm.confirmPassword}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                            className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-all disabled:opacity-50"
                                        >
                                            {loading ? 'Changing...' : 'Change Password'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveModal(null)}
                                            className="flex-1 bg-slate-700 text-white py-2 rounded-lg font-semibold hover:bg-slate-600 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfilePage;