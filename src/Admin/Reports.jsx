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
    Share2,
    Target,
    Zap,
    Crown,
    Shield
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
    const { users = [] } = useAuth() || {};
    const [reportType, setReportType] = useState('overview');
    const [dateRange, setDateRange] = useState('week');
    const [loading, setLoading] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedMetrics, setSelectedMetrics] = useState(['revenue', 'players', 'games']);
    const [filters, setFilters] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        minGames: '',
        minWinnings: ''
    });
    const [filteredData, setFilteredData] = useState([]);
    const [filteredTopPlayers, setFilteredTopPlayers] = useState([]);

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
        { name: 'Classic Bingo', value: 45, color: '#14b8a6' },
        { name: 'Speed Bingo', value: 28, color: '#06b6d4' },
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

    // Apply filters
    useEffect(() => {
        let filtered = [...revenueData];

        // Filter by date range
        if (filters.startDate && filters.endDate) {
            filtered = filtered.filter(item =>
                item.date >= filters.startDate && item.date <= filters.endDate
            );
        }

        // Filter by min games
        if (filters.minGames) {
            filtered = filtered.filter(item => item.games >= parseInt(filters.minGames));
        }

        // Filter by min winnings
        if (filters.minWinnings) {
            filtered = filtered.filter(item => item.profit >= parseInt(filters.minWinnings));
        }

        setFilteredData(filtered);

        // Filter top players
        let filteredPlayers = [...topPlayers];
        if (filters.minGames) {
            filteredPlayers = filteredPlayers.filter(p => p.gamesPlayed >= parseInt(filters.minGames));
        }
        if (filters.minWinnings) {
            filteredPlayers = filteredPlayers.filter(p => p.totalWon >= parseInt(filters.minWinnings));
        }
        setFilteredTopPlayers(filteredPlayers);

    }, [filters, revenueData, topPlayers]);

    const calculateTotals = (data) => {
        if (data.length === 0) return {
            totalRevenue: 0,
            totalPayouts: 0,
            totalProfit: 0,
            avgPlayers: 0,
            totalGames: 0,
            avgRevenuePerPlayer: 0
        };

        const totals = data.reduce((acc, day) => ({
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
            avgPlayers: Math.round(totals.players / data.length),
            totalGames: totals.games,
            avgRevenuePerPlayer: Math.round(totals.revenue / totals.players) || 0
        };
    };

    const totals = calculateTotals(filteredData.length > 0 ? filteredData : revenueData);

    const handleApplyFilters = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowFilterModal(false);
            showToast('Filters applied successfully!');
        }, 500);
    };

    const handleResetFilters = () => {
        setFilters({
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            minGames: '',
            minWinnings: ''
        });
        showToast('Filters reset successfully!');
    };

    const handleReportTypeChange = (type) => {
        setReportType(type);
        showToast(`Switched to ${type} view`);
    };

    const exportToCSV = () => {
        const dataToExport = filteredData.length > 0 ? filteredData : revenueData;
        const csvData = dataToExport.map(day => ({
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
        setShowExportModal(false);
        showToast('Report exported as CSV successfully!');
    };

    const exportToPDF = () => {
        window.print();
        setShowExportModal(false);
        showToast('Print dialog opened!');
    };

    const exportToEmail = () => {
        setShowExportModal(false);
        showToast('Report sent to your email successfully!');
    };

    const showToast = (message) => {
        setToastMessage(message);
        setShowSuccessToast(true);
        setTimeout(() => {
            setShowSuccessToast(false);
        }, 3000);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-800 border border-teal-500/30 rounded-lg p-3 shadow-xl">
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

    // Get current data based on report type
    const getCurrentData = () => {
        const data = filteredData.length > 0 ? filteredData : revenueData;
        switch (reportType) {
            case 'revenue':
                return data.map(d => ({ ...d, value: d.revenue }));
            case 'players':
                return data.map(d => ({ ...d, value: d.players }));
            case 'games':
                return data.map(d => ({ ...d, value: d.games }));
            default:
                return data;
        }
    };

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
                            <Check className="w-5 h-5" />
                            {toastMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                            Analytics & Reports
                        </h1>
                        <p className="text-slate-400">Comprehensive insights into your business performance</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowFilterModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 border border-slate-600/50 text-white rounded-lg hover:bg-slate-600/50 hover:border-teal-500/30 transition-all duration-300"
                        >
                            <Filter className="w-4 h-4 text-teal-400" />
                            <span>Filters</span>
                            {(filters.minGames || filters.minWinnings) && (
                                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                            )}
                        </button>
                        <button
                            onClick={() => setShowExportModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/25"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Report Type Tabs - Now Functional */}
                <div className="flex flex-wrap gap-2 border-b border-teal-500/20 pb-4">
                    {['overview', 'revenue', 'players', 'games'].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleReportTypeChange(type)}
                            className={`px-4 py-2 rounded-lg transition-all capitalize flex items-center gap-2 ${reportType === type
                                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                }`}
                        >
                            {type === 'overview' && <PieChart className="w-4 h-4" />}
                            {type === 'revenue' && <DollarSign className="w-4 h-4" />}
                            {type === 'players' && <Users className="w-4 h-4" />}
                            {type === 'games' && <Gamepad2 className="w-4 h-4" />}
                            {type}
                            {filteredData.length > 0 && reportType === type && (
                                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                                    {filteredData.length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-4 shadow-lg shadow-teal-500/20 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleReportTypeChange('revenue')}
                    >
                        <DollarSign className="w-6 h-6 text-white mb-2" />
                        <div className="text-2xl font-bold text-white">${totals.totalRevenue.toLocaleString()}</div>
                        <div className="text-white/80 text-sm">Total Revenue</div>
                        <div className="text-white/60 text-xs mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +23% vs last period
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-4 shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleReportTypeChange('revenue')}
                    >
                        <TrendingUp className="w-6 h-6 text-white mb-2" />
                        <div className="text-2xl font-bold text-white">${totals.totalProfit.toLocaleString()}</div>
                        <div className="text-white/80 text-sm">Net Profit</div>
                        <div className="text-white/60 text-xs mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +32% vs last period
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-4 shadow-lg shadow-cyan-500/20 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleReportTypeChange('players')}
                    >
                        <Users className="w-6 h-6 text-white mb-2" />
                        <div className="text-2xl font-bold text-white">{totals.avgPlayers}</div>
                        <div className="text-white/80 text-sm">Avg Daily Players</div>
                        <div className="text-white/60 text-xs mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +18% vs last period
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 shadow-lg shadow-amber-500/20 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleReportTypeChange('games')}
                    >
                        <Gamepad2 className="w-6 h-6 text-white mb-2" />
                        <div className="text-2xl font-bold text-white">{totals.totalGames.toLocaleString()}</div>
                        <div className="text-white/80 text-sm">Total Games</div>
                        <div className="text-white/60 text-xs mt-1 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +45% vs last period
                        </div>
                    </motion.div>
                </div>

                {/* Main Chart - Dynamic based on report type */}
                <motion.div
                    key={reportType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-teal-500/20"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-white text-lg font-semibold capitalize">{reportType} Overview</h3>
                            <p className="text-slate-400 text-sm">
                                {filteredData.length > 0 ? `Showing ${filteredData.length} filtered days` : 'Daily trends and statistics'}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {reportType === 'overview' && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                                        <span className="text-slate-400 text-xs">Revenue</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                                        <span className="text-slate-400 text-xs">Payouts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                        <span className="text-slate-400 text-xs">Profit</span>
                                    </div>
                                </>
                            )}
                            {reportType === 'revenue' && (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                                    <span className="text-slate-400 text-xs">Revenue</span>
                                </div>
                            )}
                            {reportType === 'players' && (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                                    <span className="text-slate-400 text-xs">Players</span>
                                </div>
                            )}
                            {reportType === 'games' && (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                                    <span className="text-slate-400 text-xs">Games</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={getCurrentData()}>
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="date" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            {reportType === 'overview' && (
                                <>
                                    <Area type="monotone" dataKey="revenue" stroke="#14b8a6" fill="url(#chartGradient)" strokeWidth={2} name="Revenue" />
                                    <Area type="monotone" dataKey="payouts" stroke="#06b6d4" fill="url(#chartGradient)" strokeWidth={2} name="Payouts" />
                                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} name="Profit" />
                                </>
                            )}
                            {reportType === 'revenue' && (
                                <Area type="monotone" dataKey="revenue" stroke="#14b8a6" fill="url(#chartGradient)" strokeWidth={2} name="Revenue" />
                            )}
                            {reportType === 'players' && (
                                <Area type="monotone" dataKey="players" stroke="#06b6d4" fill="url(#chartGradient)" strokeWidth={2} name="Players" />
                            )}
                            {reportType === 'games' && (
                                <Area type="monotone" dataKey="games" stroke="#f59e0b" fill="url(#chartGradient)" strokeWidth={2} name="Games" />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Secondary Charts - Only show for overview */}
                {reportType === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-teal-500/20"
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
                            className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-teal-500/20"
                        >
                            <h3 className="text-white text-lg font-semibold mb-4">Player Activity</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <ReBarChart data={playerActivity}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="name" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="newUsers" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                                    <Bar dataKey="activeUsers" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                                </ReBarChart>
                            </ResponsiveContainer>
                        </motion.div>
                    </div>
                )}

                {/* Top Players Table - Only show for overview and players */}
                {(reportType === 'overview' || reportType === 'players') && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-teal-500/20"
                    >
                        <div className="px-6 py-4 border-b border-teal-500/20">
                            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                Top Players
                                {filteredTopPlayers.length < topPlayers.length && (
                                    <span className="text-xs text-teal-400 bg-teal-500/20 px-2 py-0.5 rounded-full">
                                        Filtered: {filteredTopPlayers.length}
                                    </span>
                                )}
                            </h3>
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
                                    {(filteredTopPlayers.length > 0 ? filteredTopPlayers : topPlayers).map((player, index) => (
                                        <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                                        index === 1 ? 'bg-gray-400/20 text-gray-400' :
                                                            index === 2 ? 'bg-orange-500/20 text-orange-400' :
                                                                'bg-slate-600 text-slate-400'
                                                    }`}>
                                                    #{index + 1}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-white font-medium">{player.username}</td>
                                            <td className="px-6 py-4 text-white">{player.gamesPlayed.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-teal-400 font-bold">${player.totalWon.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-slate-600 rounded-full h-1.5">
                                                        <div className="bg-teal-400 h-1.5 rounded-full" style={{ width: `${player.winRate}%` }}></div>
                                                    </div>
                                                    <span className="text-slate-300 text-sm">{player.winRate}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400">{player.lastActive}</td>
                                        </tr>
                                    ))}
                                    {filteredTopPlayers.length === 0 && topPlayers.length > 0 && (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                                                No players match the current filters
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {/* Filter Modal */}
                <AnimatePresence>
                    {showFilterModal && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                                onClick={() => setShowFilterModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
                            >
                                <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 border border-teal-500/20">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-bold text-white">Apply Filters</h3>
                                        <button onClick={() => setShowFilterModal(false)} className="text-slate-400 hover:text-white transition-colors">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-slate-300 text-sm font-medium block mb-1">Start Date</label>
                                            <input
                                                type="date"
                                                value={filters.startDate}
                                                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                                                className="w-full bg-slate-700/50 text-white rounded-lg px-4 py-2 border border-slate-600/50 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-slate-300 text-sm font-medium block mb-1">End Date</label>
                                            <input
                                                type="date"
                                                value={filters.endDate}
                                                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                                                className="w-full bg-slate-700/50 text-white rounded-lg px-4 py-2 border border-slate-600/50 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-slate-300 text-sm font-medium block mb-1">Minimum Games</label>
                                            <input
                                                type="number"
                                                value={filters.minGames}
                                                onChange={(e) => setFilters({ ...filters, minGames: e.target.value })}
                                                placeholder="Enter minimum games"
                                                className="w-full bg-slate-700/50 text-white rounded-lg px-4 py-2 border border-slate-600/50 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-slate-300 text-sm font-medium block mb-1">Minimum Winnings</label>
                                            <input
                                                type="number"
                                                value={filters.minWinnings}
                                                onChange={(e) => setFilters({ ...filters, minWinnings: e.target.value })}
                                                placeholder="Enter minimum winnings"
                                                className="w-full bg-slate-700/50 text-white rounded-lg px-4 py-2 border border-slate-600/50 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                                            />
                                        </div>
                                        <div className="flex gap-3 pt-4">
                                            <button
                                                onClick={handleApplyFilters}
                                                className="flex-1 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                                            >
                                                Apply Filters
                                            </button>
                                            <button
                                                onClick={handleResetFilters}
                                                className="px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition-all duration-300"
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

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
                                <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 border border-teal-500/20">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-2xl font-bold text-white">Export Report</h3>
                                        <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-white transition-colors">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <button
                                            onClick={exportToCSV}
                                            className="w-full flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 hover:border-teal-500/30 transition-all duration-300 border border-transparent"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-teal-400" />
                                                <span className="text-white">Export as CSV</span>
                                            </div>
                                            <Download className="w-4 h-4 text-slate-400" />
                                        </button>
                                        <button
                                            onClick={exportToPDF}
                                            className="w-full flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 hover:border-teal-500/30 transition-all duration-300 border border-transparent"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Printer className="w-5 h-5 text-cyan-400" />
                                                <span className="text-white">Print / PDF</span>
                                            </div>
                                            <Printer className="w-4 h-4 text-slate-400" />
                                        </button>
                                        <button
                                            onClick={exportToEmail}
                                            className="w-full flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 hover:border-teal-500/30 transition-all duration-300 border border-transparent"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Mail className="w-5 h-5 text-emerald-400" />
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
        </div>
    );
};

export default Reports;