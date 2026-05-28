import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserDashboard = () => {
    const { user } = useAuth();

    const quickActions = [
        { icon: '🎮', title: 'Play Game', description: 'Start playing and win credits', link: '/game', color: 'from-purple-500 to-pink-500' },
        { icon: '🛒', title: 'Shop', description: 'Buy more credits', link: '/shop', color: 'from-green-500 to-emerald-600' },
        { icon: '💰', title: 'Wallet', description: 'View transaction history', link: '/wallet', color: 'from-blue-500 to-indigo-600' },
    ];

    return (
        <div>
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.username}! 👋
                </h1>
                <p className="text-white opacity-90">Ready to play and win today?</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-800 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Wallet Balance</div>
                    <div className="text-3xl font-bold text-yellow-400">{user?.wallet?.balance || 0} 💰</div>
                </div>
                <div className="bg-slate-800 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Games Played</div>
                    <div className="text-3xl font-bold text-white">{user?.stats?.gamesPlayed || 0}</div>
                </div>
                <div className="bg-slate-800 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Games Won</div>
                    <div className="text-3xl font-bold text-green-400">{user?.stats?.gamesWon || 0}</div>
                </div>
                <div className="bg-slate-800 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Total Winnings</div>
                    <div className="text-3xl font-bold text-green-400">{user?.stats?.totalWinnings || 0} 💰</div>
                </div>
            </div>

            {/* Quick Actions */}
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {quickActions.map((action, index) => (
                    <Link
                        key={index}
                        to={action.link}
                        className={`bg-gradient-to-br ${action.color} p-6 rounded-2xl text-center hover:scale-105 transition-all shadow-xl`}
                    >
                        <div className="text-5xl mb-3">{action.icon}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
                        <p className="text-white text-sm opacity-90">{action.description}</p>
                    </Link>
                ))}
            </div>

            {/* Stats */}
            <div className="bg-slate-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">📊 Your Stats</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300">Total Deposited</span>
                        <span className="text-white font-bold">{user?.wallet?.totalDeposited || 0} 💰</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300">Total Spent on Games</span>
                        <span className="text-white font-bold">{user?.stats?.totalSpent || 0} 💰</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300">Win Rate</span>
                        <span className="text-green-400 font-bold">
                            {user?.stats?.gamesPlayed > 0
                                ? ((user.stats.gamesWon / user.stats.gamesPlayed) * 100).toFixed(1)
                                : 0}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;