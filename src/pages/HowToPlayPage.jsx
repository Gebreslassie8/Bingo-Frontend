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
        <div className="min-h-screen py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header with animation */}
                <div className="text-center mb-14 animate-fade-in-up">
                    <div className="inline-block bg-cyan-500/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4 border border-cyan-500/20">
                        <span className="text-cyan-300 font-medium text-sm tracking-wider">🎲 BINGO GUIDE</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 mb-4 animate-gradient">
                        How to Play Bingo
                    </h1>
                    <p className="text-xl text-slate-300 font-light">Learn the basics and start winning today!</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Rules Card */}
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300 hover:border-cyan-500/30 animate-fade-in-up animation-delay-100">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-3xl">📖</span> Basic Rules
                        </h2>
                        <div className="space-y-5">
                            {rules.map((rule, index) => (
                                <div key={index} className="flex gap-4 group hover:translate-x-1 transition-transform duration-200">
                                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/25 flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">{rule.title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{rule.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Patterns Card */}
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300 hover:border-cyan-500/30 animate-fade-in-up animation-delay-200">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-3xl">🎯</span> Winning Patterns
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {patterns.map((pattern, index) => (
                                <div key={index} className="text-center p-5 bg-slate-700/50 rounded-xl border border-slate-600/30 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 group">
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{pattern.icon}</div>
                                    <h3 className="text-white font-semibold text-sm">{pattern.name}</h3>
                                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{pattern.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pro Tips */}
                <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-600 rounded-2xl p-8 md:p-10 text-center shadow-2xl shadow-cyan-500/20 animate-fade-in-up animation-delay-300">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                        <span>💡</span> Pro Tips
                        <span className="text-sm font-normal text-cyan-200 bg-white/10 px-3 py-1 rounded-full">🎯</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="text-3xl mb-2">🎫</div>
                            <p className="text-white font-medium">Buy multiple cards to increase winning chances</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="text-3xl mb-2">📊</div>
                            <p className="text-white font-medium">Watch the called numbers pattern</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="text-3xl mb-2">⚡</div>
                            <p className="text-white font-medium">Use auto-mark to never miss a number</p>
                        </div>
                    </div>
                </div>

                {/* Footer decoration */}
                <div className="mt-8 text-center">
                    <p className="text-slate-500 text-sm">✨ Ready to play? Good luck! 🍀</p>
                </div>
            </div>

            {/* Custom CSS for animations and scrollbar */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }

                .animation-delay-100 {
                    animation-delay: 0.1s;
                }

                .animation-delay-200 {
                    animation-delay: 0.2s;
                }

                .animation-delay-300 {
                    animation-delay: 0.3s;
                }

                /* Smooth hover transitions */
                .transition-all {
                    transition-property: all;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 300ms;
                }

                /* Custom scrollbar - Cyan/Teal theme */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #0f172a;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #06b6d4, #14b8a6);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #22d3ee, #2dd4bf);
                }

                /* Firefox scrollbar */
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #06b6d4 #0f172a;
                }
            `}</style>
        </div>
    );
};

export default HowToPlayPage;