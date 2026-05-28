import React from 'react';

const HowToPlayPage = () => {
    const rules = [
        { title: 'Get a Bingo Card', description: 'Each player gets a 5x5 card with numbers from 1-75' },
        { title: 'Numbers Are Called', description: 'Numbers are randomly called one at a time' },
        { title: 'Mark Your Numbers', description: 'Mark the numbers on your card when they are called' },
        { title: 'Get BINGO!', description: 'Complete a row, column, or diagonal to win!' },
    ];

    const patterns = [
        { name: 'Row', description: 'Complete any horizontal line of 5 numbers', icon: '➡️' },
        { name: 'Column', description: 'Complete any vertical line of 5 numbers', icon: '⬇️' },
        { name: 'Diagonal', description: 'Complete either diagonal line', icon: '↘️' },
        { name: 'Four Corners', description: 'Mark all four corners of the card', icon: '⬛' },
    ];

    return (
        <div className="py-16">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Play Bingo</h1>
                    <p className="text-xl text-slate-300">Learn the basics and start winning today!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    <div className="bg-slate-800 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">📖 Basic Rules</h2>
                        <div className="space-y-4">
                            {rules.map((rule, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{rule.title}</h3>
                                        <p className="text-slate-400 text-sm">{rule.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">🎯 Winning Patterns</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {patterns.map((pattern, index) => (
                                <div key={index} className="text-center p-4 bg-slate-700 rounded-lg">
                                    <div className="text-3xl mb-2">{pattern.icon}</div>
                                    <h3 className="text-white font-semibold">{pattern.name}</h3>
                                    <p className="text-slate-400 text-xs mt-1">{pattern.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">💡 Pro Tips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white bg-opacity-20 rounded-lg p-4">
                            <p className="text-white">Buy multiple cards to increase winning chances</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-4">
                            <p className="text-white">Watch the called numbers pattern</p>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-4">
                            <p className="text-white">Use auto-mark to never miss a number</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToPlayPage;