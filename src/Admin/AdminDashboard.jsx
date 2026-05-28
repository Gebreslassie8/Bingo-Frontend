import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import {
    Users,
    DollarSign,
    TrendingUp,
    Award,
    Calendar,
    ArrowUp,
    ArrowDown,
    Activity,
    UserPlus,
    Gamepad2,
    Gift,
    Shield,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const { users } = useAuth();
    const [selectedPeriod, setSelectedPeriod] = useState('weekly');
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 1000);
        return () => clearTimeout(timer);
    }, [users]);

    // Calculate statistics
    const totalPlayers = users.filter(u => u.role === 'player').length;
    const activePlayers = users.filter(u => u.isActive && u.role === 'player').length;
    const suspendedPlayers = totalPlayers - activePlayers;
    const totalRevenue = users.reduce((sum, u) => sum + (u.wallet?.totalSpent || 0), 0);
    const totalPayouts = users.reduce((sum, u) => sum + (u.stats?.totalWinnings || 0), 0);
    const netProfit = totalRevenue - totalPayouts;
    const totalGames = users.reduce((sum, u) => sum + (u.stats?.gamesPlayed || 0), 0);
    const totalWins = users.reduce((sum, u) => sum + (u.stats?.gamesWon || 0), 0);
    const winRate = totalGames > 0 ? ((totalWins / totalGames) * 100).toFixed(1) : 0;

    // Mock data for charts (in real app, this would come from your backend)
    const revenueData = [
        { name: 'Mon', revenue: 12500, payouts: 8500, profit: 4000 },
        { name: 'Tue', revenue: 14800, payouts: 9200, profit: 5600 },
        { name: 'Wed', revenue: 18200, payouts: 10500, profit: 7700 },
        { name: 'Thu', revenue: 16900, payouts: 9800, profit: 7100 },
        { name: 'Fri', revenue: 21500, payouts: 12400, profit: 9100 },
        { name: 'Sat', revenue: 28900, payouts: 15600, profit: 13300 },
        { name: 'Sun', revenue: 26700, payouts: 14800, profit: 11900 },
    ];

    const monthlyData = [
        { name: 'Jan', revenue: 125000, payouts: 85000, profit: 40000 },
        { name: 'Feb', revenue: 148000, payouts: 92000, profit: 56000 },
        { name: 'Mar', revenue: 182000, payouts: 105000, profit: 77000 },
        { name: 'Apr', revenue: 169000, payouts: 98000, profit: 71000 },
        { name: 'May', revenue: 215000, payouts: 124000, profit: 91000 },
        { name: 'Jun', revenue: 289000, payouts: 156000, profit: 133000 },
    ];

    const userActivityData = [
        { name: 'Mon', newUsers: 45, active: 320 },
        { name: 'Tue', newUsers: 52, active: 345 },
        { name: 'Wed', newUsers: 48, active: 368 },
        { name: 'Thu', newUsers: 61, active: 392 },
        { name: 'Fri', newUsers: 73, active: 421 },
        { name: 'Sat', newUsers: 89, active: 456 },
        { name: 'Sun', newUsers: 67, active: 434 },
    ];

    const gameDistribution = [
        { name: 'Classic Bingo', value: 45, color: '#8b5cf6' },
        { name: 'Speed Bingo', value: 28, color: '#ec489a' },
        { name: 'Blackout', value: 17, color: '#10b981' },
        { name: 'Pattern', value: 10, color: '#f59e0b' },
    ];

    const playerStatusData = [
        { name: 'Active', value: activePlayers, color: '#10b981' },
        { name: 'Suspended', value: suspendedPlayers, color: '#ef4444' },
    ];

    const statsCards = [
        {
            title: 'Total Players',
            value: totalPlayers,
            icon: Users,
            color: 'from-blue-500 to-indigo-600',
            change: '+12%',
            changeType: 'up',
            detail: `${activePlayers} active`
        },
        {
            title: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'from-green-500 to-emerald-600',
            change: '+23%',
            changeType: 'up',
            detail: 'This month'
        },
        {
            title: 'Total Payouts',
            value: `$${totalPayouts.toLocaleString()}`,
            icon: Award,
            color: 'from-yellow-500 to-orange-500',
            change: '+15%',
            changeType: 'up',
            detail: 'To players'
        },
        {
            title: 'Net Profit',
            value: `$${netProfit.toLocaleString()}`,
            icon: TrendingUp,
            color: 'from-purple-500 to-pink-500',
            change: netProfit > 0 ? '+32%' : '-5%',
            changeType: netProfit > 0 ? 'up' : 'down',
            detail: 'Platform earnings'
        },
        {
            title: 'Total Games',
            value: totalGames.toLocaleString(),
            icon: Gamepad2,
            color: 'from-cyan-500 to-blue-500',
            change: '+28%',
            changeType: 'up',
            detail: `${totalWins} wins`
        },
        {
            title: 'Win Rate',
            value: `${winRate}%`,
            icon: Activity,
            color: 'from-pink-500 to-rose-500',
            change: '+5%',
            changeType: 'up',
            detail: 'Player success rate'
        },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl">
                    <p className="text-white text-sm font-semibold mb-1">{label}</p>
                    {payload.map((item, index) => (
                        <p key={index} className="text-sm" style={{ color: item.color }}>
                            {item.name}: ${item.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-slate-400">Welcome back! Here's your business overview</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedPeriod('weekly')}
                        className={`px-4 py-2 rounded-lg transition-all ${selectedPeriod === 'weekly' ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => setSelectedPeriod('monthly')}
                        className={`px-4 py-2 rounded-lg transition-all ${selectedPeriod === 'monthly' ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {statsCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer group`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <stat.icon className="w-8 h-8 text-white opacity-80 group-hover:scale-110 transition-transform" />
                            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-white/20 ${stat.changeType === 'up' ? 'text-green-300' : 'text-red-300'}`}>
                                {stat.changeType === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-white/80 text-sm font-medium">{stat.title}</div>
                        <div className="text-white/60 text-xs mt-1">{stat.detail}</div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-800 rounded-2xl p-6 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white text-lg font-semibold">Revenue Overview</h3>
                            <p className="text-slate-400 text-sm">Revenue vs Payouts</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-slate-400 text-xs">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                                <span className="text-slate-400 text-xs">Payouts</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={selectedPeriod === 'weekly' ? revenueData : monthlyData}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="payoutGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ec489a" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ec489a" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fill="url(#revenueGradient)" strokeWidth={2} />
                            <Area type="monotone" dataKey="payouts" stroke="#ec489a" fill="url(#payoutGradient)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* User Activity Chart */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-800 rounded-2xl p-6 shadow-xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white text-lg font-semibold">User Activity</h3>
                            <p className="text-slate-400 text-sm">New users vs Active users</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-slate-400 text-xs">New Users</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-slate-400 text-xs">Active Users</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={userActivityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="newUsers" fill="#10b981" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="active" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Game Distribution Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800 rounded-2xl p-6 shadow-xl"
                >
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-2">Game Distribution</h3>
                        <p className="text-slate-400 text-sm mb-4">Most popular game modes</p>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={gameDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                            >
                                {gameDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="#1e293b" />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Player Status Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-800 rounded-2xl p-6 shadow-xl"
                >
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-2">Player Status</h3>
                        <p className="text-slate-400 text-sm mb-4">Active vs Suspended players</p>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={playerStatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                            >
                                {playerStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="#1e293b" />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                        <div className="bg-green-500/10 rounded-lg p-2">
                            <div className="text-green-400 text-2xl font-bold">{activePlayers}</div>
                            <div className="text-slate-400 text-xs">Active Players</div>
                        </div>
                        <div className="bg-red-500/10 rounded-lg p-2">
                            <div className="text-red-400 text-2xl font-bold">{suspendedPlayers}</div>
                            <div className="text-slate-400 text-xs">Suspended Players</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Recent Players Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl"
            >
                <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Recent Players</h2>
                        <p className="text-slate-400 text-sm">Latest registered players</p>
                    </div>
                    <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                        View All →
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm font-semibold">Username</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm font-semibold">Email</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm font-semibold">Balance</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm font-semibold">Games</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm font-semibold">Wins</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm font-semibold">Win Rate</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.filter(u => u.role === 'player').slice(0, 5).map((user, index) => {
                                const winRate = user.stats?.gamesPlayed > 0
                                    ? ((user.stats.gamesWon / user.stats.gamesPlayed) * 100).toFixed(1)
                                    : 0;
                                return (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-white font-medium">{user.username}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-yellow-400 font-bold">{user.wallet?.balance || 0} 💰</span>
                                        </td>
                                        <td className="px-6 py-4 text-white">{user.stats?.gamesPlayed || 0}</td>
                                        <td className="px-6 py-4 text-green-400">{user.stats?.gamesWon || 0}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 bg-slate-600 rounded-full h-1.5 w-16">
                                                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${winRate}%` }}></div>
                                                </div>
                                                <span className="text-slate-300 text-sm">{winRate}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {user.isActive ? 'Active' : 'Suspended'}
                                            </span>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;