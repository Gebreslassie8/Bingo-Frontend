import React, { useState } from 'react';

const BusinessPage = ({
    gameCost,
    prizeMultiplier,
    gamesPlayed,
    totalSpent,
    totalWinnings,
    credits,
    updateBusinessSettings
}) => {
    const [newGameCost, setNewGameCost] = useState(gameCost);
    const [newMultiplier, setNewMultiplier] = useState(prizeMultiplier);

    const netProfit = totalWinnings - totalSpent;
    const winRate = gamesPlayed > 0 ? ((totalWinnings > 0 ? 1 : 0) * 100) : 0;
    const roi = totalSpent > 0 ? ((netProfit / totalSpent) * 100) : 0;

    const handleSaveSettings = () => {
        if (newGameCost < 10) {
            alert("Minimum game cost is 10 credits");
            return;
        }
        if (newMultiplier < 2) {
            alert("Minimum prize multiplier is 2x");
            return;
        }
        updateBusinessSettings(newGameCost, newMultiplier);
        alert("Business settings updated!");
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-white mb-8">📊 Business Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Total Games</div>
                    <div className="text-3xl font-bold text-white">{gamesPlayed}</div>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Total Spent</div>
                    <div className="text-3xl font-bold text-red-400">{totalSpent} 💰</div>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Total Winnings</div>
                    <div className="text-3xl font-bold text-green-400">{totalWinnings} 💰</div>
                </div>
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Net Profit</div>
                    <div className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {netProfit >= 0 ? '+' : ''}{netProfit} 💰
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Win Rate</span>
                            <span className="text-white font-bold">{winRate.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Return on Investment</span>
                            <span className={`font-bold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {roi.toFixed(1)}%
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Current Credits</span>
                            <span className="text-yellow-400 font-bold">{credits} 💰</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Business Settings</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-slate-400 mb-2">Game Cost (credits)</label>
                            <input
                                type="number"
                                value={newGameCost}
                                onChange={(e) => setNewGameCost(parseInt(e.target.value))}
                                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2"
                                min="10"
                                step="5"
                            />
                            <p className="text-xs text-slate-500 mt-1">Minimum: 10 credits</p>
                        </div>
                        <div>
                            <label className="block text-slate-400 mb-2">Prize Multiplier</label>
                            <input
                                type="number"
                                value={newMultiplier}
                                onChange={(e) => setNewMultiplier(parseInt(e.target.value))}
                                className="w-full bg-slate-700 text-white rounded-lg px-4 py-2"
                                min="2"
                                step="1"
                            />
                            <p className="text-xs text-slate-500 mt-1">Prize = Game Cost × Multiplier</p>
                        </div>
                        <div className="bg-slate-700 rounded-lg p-3">
                            <p className="text-sm text-slate-300">Current Prize Amount:</p>
                            <p className="text-2xl font-bold text-green-400">{newGameCost * newMultiplier} 💰</p>
                        </div>
                        <button
                            onClick={handleSaveSettings}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-bold hover:scale-105 transition-all"
                        >
                            💾 Save Settings
                        </button>
                    </div>
                </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">💡 Business Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <p className="text-white font-bold">Adjust Game Cost</p>
                        <p className="text-white text-sm">Higher cost = bigger prizes, but fewer players can afford it</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <p className="text-white font-bold">Prize Multiplier</p>
                        <p className="text-white text-sm">Higher multiplier attracts more players but increases risk</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <p className="text-white font-bold">Track Your Stats</p>
                        <p className="text-white text-sm">Monitor your ROI to optimize business settings</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessPage;