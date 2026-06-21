import React from 'react';
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Target,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Trophy,
    Users,
    Zap,
    Shield,
    Star,
    Gamepad2,
    Crown,
    Gift,
    Clock,
    Award,
    BarChart3,
    Coins,
    Palette,
    Bell,
    Handshake,
    Gem,
    Menu,
    X,
    Home,
    CreditCard,
    LogIn,
    UserPlus
} from 'lucide-react';

const HowToPlayPage = () => {
    const rules = [
        { title: 'Get a Bingo Card', description: 'Each player gets a 5x5 card with numbers from 1-75', icon: Target },
        { title: 'Numbers Are Called', description: 'Numbers are randomly called one at a time', icon: Bell },
        { title: 'Mark Your Numbers', description: 'Mark the numbers on your card when they are called', icon: CheckCircle },
        { title: 'Get BINGO!', description: 'Complete a row, column, or diagonal to win!', icon: Trophy },
    ];

    const patterns = [
        { name: 'Row', description: 'Complete any horizontal line of 5 numbers', icon: '➡️' },
        { name: 'Column', description: 'Complete any vertical line of 5 numbers', icon: '⬇️' },
        { name: 'Diagonal', description: 'Complete either diagonal line', icon: '↘️' },
        { name: 'Four Corners', description: 'Mark all four corners of the card', icon: '⬛' },
    ];

    return (
        <div className="min-h-screen py-16 bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header with animation */}
                <div className="text-center mb-14 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-teal-500/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4 border border-teal-500/20">
                        <Gamepad2 className="w-4 h-4 text-teal-400" />
                        <span className="text-teal-300 font-medium text-sm tracking-wider">BINGO GUIDE</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 mb-4 animate-gradient">
                        How to Play Bingo
                    </h1>
                    <p className="text-xl text-slate-300 font-light">Learn the basics and start winning today!</p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Rules Card */}
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-teal-500/5 transition-all duration-300 hover:border-teal-500/30 animate-fade-in-up animation-delay-100">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <BookOpen className="w-7 h-7 text-teal-400" />
                            Basic Rules
                        </h2>
                        <div className="space-y-5">
                            {rules.map((rule, index) => {
                                const IconComponent = rule.icon;
                                return (
                                    <div key={index} className="flex gap-4 group hover:translate-x-1 transition-transform duration-200">
                                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/25 flex-shrink-0">
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold text-lg">{rule.title}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">{rule.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Patterns Card */}
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl hover:shadow-teal-500/5 transition-all duration-300 hover:border-teal-500/30 animate-fade-in-up animation-delay-200">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Target className="w-7 h-7 text-teal-400" />
                            Winning Patterns
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {patterns.map((pattern, index) => (
                                <div key={index} className="text-center p-5 bg-slate-700/50 rounded-xl border border-slate-600/30 hover:border-teal-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/10 group">
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{pattern.icon}</div>
                                    <h3 className="text-white font-semibold text-sm">{pattern.name}</h3>
                                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{pattern.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pro Tips */}
                <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 rounded-2xl p-8 md:p-10 text-center shadow-2xl shadow-teal-500/20 animate-fade-in-up animation-delay-300">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                        <Sparkles className="w-8 h-8" />
                        Pro Tips
                        <span className="text-sm font-normal text-teal-200 bg-white/10 px-3 py-1 rounded-full flex items-center gap-1">
                            <Trophy className="w-3 h-3" /> Expert
                        </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Gift className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-white font-medium">Buy multiple cards to increase winning chances</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-white font-medium">Watch the called numbers pattern</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-white font-medium">Use auto-mark to never miss a number</p>
                        </div>
                    </div>
                </div>

                {/* Footer with CTA */}
                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm mb-4">✨ Ready to play? Good luck! 🍀</p>
                    <Link to="/register">
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40">
                            <Crown className="w-5 h-5" />
                            Start Playing Now
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
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

                /* Custom scrollbar - Teal/Cyan theme */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: #0f172a;
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #14b8a6, #06b6d4);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #2dd4bf, #22d3ee);
                }

                /* Firefox scrollbar */
                * {
                    scrollbar-width: thin;
                    scrollbar-color: #14b8a6 #0f172a;
                }
            `}</style>
        </div>
    );
};

export default HowToPlayPage;