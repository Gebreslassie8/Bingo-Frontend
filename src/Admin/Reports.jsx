import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Download,
    Calendar,
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Gamepad2,
    Award,
    PieChart,
    BarChart3,
    LineChart,
    FileText,
    Printer,
    Mail,
    Filter,
    X,
    Check,
    AlertCircle,
    Copy,
    Share2
} from 'lucide-react';
import {
    LineChart as ReLineChart,
    Line,
    BarChart as ReBarChart,
    Bar,
    PieChart as RePieChart,
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
import * as XLSX from 'xlsx';

const Reports = () => {
    const { users } = useAuth();
    const [reportType, setReportType] = useState('overview');
    const [dateRange, setDateRange] = useState('week');
    const [loading, setLoading] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedMetrics, setSelectedMetrics] = useState(['revenue', 'players', 'games']);
    const [filters, setFilters] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        minGames: '',
        minWinnings: ''
    });

    // Mock data - in real app, this would come from your API
    const revenueData = [
        { date: '2024-03-18', revenue: 12500, payouts: 8500, profit: 4000, players: 245, games: 1250 },
        { date: '2024-03-19', revenue: 14800, payouts: 9200, profit: 5600, players: 268, games: 1420 },
        { date: '2024-03-20', revenue: 18200, payouts: 10500, profit: 7700, players: 312, games: 1680 },
        { date: '2024-03-21', revenue: 16900, payouts: 9800, profit: 7100, players: 289, games: 1550 },
        { date: '2024-03-22', revenue: 21500, payouts: 12400, profit: 9100, players: 356, games: 1890 },
        { date: '2024-03-23', revenue: 28900, payouts: 15600, profit: 13300, players: 421, games: 2340 },
        { date: '2024-03-24', revenue: 26700, payouts: 14800, profit: 11900, players: 398, games: 2210 },
    ];

    const gameDistribution = [
        { name: 'Classic Bingo', value: 45, color: '#8b5cf6' },
        { name: 'Speed Bingo', value: 28, color: '#ec489a' },
        { name: 'Blackout', value: 17, color: '#10b981' },
        { name: 'Pattern', value: 10, color: '#f59e0b' },
    ];

    const playerActivity = [
        { name: 'Mon', newUsers: 45, activeUsers: 320 },
        { name: 'Tue', newUsers: 52, activeUsers: 345 },
        { name: 'Wed', newUsers: 48, activeUsers: 368 },
        { name: 'Thu', newUsers: 61, activeUsers: 392 },
        { name: 'Fri', newUsers: 73, activeUsers: 421 },
        { name: 'Sat', newUsers: 89, activeUsers: 456 },
        { name: 'Sun', newUsers: 67, activeUsers: 434 },
    ];

    const topPlayers = [
        { username: 'player1', gamesPlayed: 1250, totalWon: 25000, winRate: 68, lastActive: '2024-03-24' },
        { username: 'player2', gamesPlayed: 980, totalWon: 18900, winRate: 62, lastActive: '2024-03-24' },
        { username: 'player3', gamesPlayed: 870, totalWon: 15600, winRate: 55, lastActive: '2024-03-23' },
        { username: 'player4', gamesPlayed: 760, totalWon: 14200, winRate: 58, lastActive: '2024-03-24' },
        { username: 'player5', gamesPlayed: 650, totalWon: 12100, winRate: 52, lastActive: '2024-03-22' },
    ];

    const calculateTotals = () => {
        const totals = revenueData.reduce((acc, day) => ({
            revenue: acc.revenue + day.revenue,
            payouts: acc.payouts + day.payouts,
            profit: acc.profit + day.profit,
            players: acc.players + day.players,
            games: acc.games + day.games
        }), { revenue: 0, payouts: 0, profit: 0, players: 0, games: 0 });

        return {
            totalRevenue: totals.revenue,
            totalPayouts: totals.payouts,
            totalProfit: totals.profit,
            avgPlayers: Math.round(totals.players / revenueData.length),
            totalGames: totals.games,
            avgRevenuePerPlayer: Math.round(totals.revenue / totals.players)
        };
    };

    const totals = calculateTotals();

    const exportToCSV = () => {
        const csvData = revenueData.map(day => ({
            Date: day.date,
            Revenue: day.revenue,
            Payouts: day.payouts,
            Profit: day.profit,
            Players: day.players,
            Games: day.games
        }));

        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report');
        XLSX.writeFile(wb, `bingo_report_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const exportToPDF = () => {
        window.print();
    };

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Analytics & Reports</h1>
                    <p className="text-slate-400">Comprehensive insights into your business performance</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowFilterModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filters</span>
                    </button>
                    <button
                        onClick={() => setShowExportModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Report Type Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-700 pb-4">
                {['overview', 'revenue', 'players', 'games'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setReportType(type)}
                        className={`px-4 py-2 rounded-lg transition-all capitalize ${reportType === type
                            ? 'bg-purple-500 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700'
                            }`}
                    >
                        {type === 'overview' && <PieChart className="w-4 h-4 inline mr-2" />}
                        {type === 'revenue' && <DollarSign className="w-4 h-4 inline mr-2" />}
                        {type === 'players' && <Users className="w-4 h-4 inline mr-2" />}
                        {type === 'games' && <Gamepad2 className="w-4 h-4 inline mr-2" />}
                        {type}
                    </button>
                ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 shadow-lg"
                >
                    <DollarSign className="w-6 h-6 text-white mb-2" />
                    <div className="text-2xl font-bold text-white">${totals.totalRevenue.toLocaleString()}</div>
                    <div className="text-white/80 text-sm">Total Revenue</div>
                    <div className="text-white/60 text-xs mt-1">+23% vs last period</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-4 shadow-lg"
                >
                    <TrendingUp className="w-6 h-6 text-white mb-2" />
                    <div className="text-2xl font-bold text-white">${totals.totalProfit.toLocaleString()}</div>
                    <div className="text-white/80 text-sm">Net Profit</div>
                    <div className="text-white/60 text-xs mt-1">+32% vs last period</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 shadow-lg"
                >
                    <Users className="w-6 h-6 text-white mb-2" />
                    <div className="text-2xl font-bold text-white">{totals.avgPlayers}</div>
                    <div className="text-white/80 text-sm">Avg Daily Players</div>
                    <div className="text-white/60 text-xs mt-1">+18% vs last period</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-4 shadow-lg"
                >
                    <Gamepad2 className="w-6 h-6 text-white mb-2" />
                    <div className="text-2xl font-bold text-white">{totals.totalGames.toLocaleString()}</div>
                    <div className="text-white/80 text-sm">Total Games</div>
                    <div className="text-white/60 text-xs mt-1">+45% vs last period</div>
                </motion.div>
            </div>

            {/* Main Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-800 rounded-2xl p-6 shadow-xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-white text-lg font-semibold">Revenue Overview</h3>
                        <p className="text-slate-400 text-sm">Daily revenue, payouts, and profit trends</p>
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
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-slate-400 text-xs">Profit</span>
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={revenueData}>
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
                        <XAxis dataKey="date" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fill="url(#revenueGradient)" strokeWidth={2} />
                        <Area type="monotone" dataKey="payouts" stroke="#ec489a" fill="url(#payoutGradient)" strokeWidth={2} />
                        <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Secondary Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-800 rounded-2xl p-6 shadow-xl"
                >
                    <h3 className="text-white text-lg font-semibold mb-4">Game Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RePieChart>
                            <Pie
                                data={gameDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {gameDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="#1e293b" />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </RePieChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-slate-800 rounded-2xl p-6 shadow-xl"
                >
                    <h3 className="text-white text-lg font-semibold mb-4">Player Activity</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ReBarChart data={playerActivity}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="newUsers" fill="#10b981" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="activeUsers" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </ReBarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Top Players Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl"
            >
                <div className="px-6 py-4 border-b border-slate-700">
                    <h3 className="text-white text-lg font-semibold">Top Players</h3>
                    <p className="text-slate-400 text-sm">Highest performing players this period</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm">Rank</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm">Username</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm">Games</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm">Total Won</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm">Win Rate</th>
                                <th className="px-6 py-3 text-left text-slate-300 text-sm">Last Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topPlayers.map((player, index) => (
                                <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                                index === 1 ? 'bg-gray-400/20 text-gray-400' :
                                                    index === 2 ? 'bg-orange-500/20 text-orange-400' :
                                                        'bg-slate-600 text-slate-400'
                                                }`}>
                                                #{index + 1}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white font-medium">{player.username}</td>
                                    <td className="px-6 py-4 text-white">{player.gamesPlayed.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-green-400 font-bold">${player.totalWon.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-slate-600 rounded-full h-1.5">
                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${player.winRate}%` }}></div>
                                            </div>
                                            <span className="text-slate-300 text-sm">{player.winRate}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">{player.lastActive}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Export Modal */}
            <AnimatePresence>
                {showExportModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                            onClick={() => setShowExportModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                        >
                            <div className="bg-slate-800 rounded-2xl shadow-2xl p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-white">Export Report</h3>
                                    <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-white">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <button
                                        onClick={exportToCSV}
                                        className="w-full flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-5 h-5 text-green-400" />
                                            <span className="text-white">Export as CSV</span>
                                        </div>
                                        <Download className="w-4 h-4 text-slate-400" />
                                    </button>
                                    <button
                                        onClick={exportToPDF}
                                        className="w-full flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Printer className="w-5 h-5 text-blue-400" />
                                            <span className="text-white">Print / PDF</span>
                                        </div>
                                        <Printer className="w-4 h-4 text-slate-400" />
                                    </button>
                                    <button
                                        className="w-full flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-purple-400" />
                                            <span className="text-white">Email Report</span>
                                        </div>
                                        <Mail className="w-4 h-4 text-slate-400" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Reports;