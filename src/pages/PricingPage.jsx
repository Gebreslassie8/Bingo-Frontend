import React from 'react';
import { Link } from 'react-router-dom';
import {
    Target,
    Crown,
    Zap,
    Star,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Gift,
    Trophy,
    Users,
    Shield,
    Clock,
    Award,
    Gem,
    Coins,
    Mail,
    Rocket
} from 'lucide-react';

const PricingPage = () => {
    const plans = [
        {
            name: 'Free',
            price: '0',
            credits: '500',
            bonus: '0',
            icon: Star,
            features: ['Basic Bingo Games', 'Standard Support', 'Daily Bonus: 10'],
            color: 'from-slate-600 to-slate-700',
            borderColor: 'border-slate-500/30'
        },
        {
            name: 'Starter',
            price: '9.99',
            credits: '1,000',
            bonus: '100',
            icon: Rocket,
            features: ['All Free Features', 'Priority Support', 'Daily Bonus: 50', '2x Multiplier Events'],
            color: 'from-teal-500 to-cyan-500',
            borderColor: 'border-teal-500/50',
            popular: true
        },
        {
            name: 'Pro',
            price: '29.99',
            credits: '5,000',
            bonus: '750',
            icon: Crown,
            features: ['All Starter Features', 'VIP Support', 'Daily Bonus: 200', '5x Multiplier Events', 'Exclusive Tournaments'],
            color: 'from-cyan-500 to-blue-500',
            borderColor: 'border-cyan-500/50'
        },
        {
            name: 'Ultimate',
            price: '99.99',
            credits: '20,000',
            bonus: '5,000',
            icon: Gem,
            features: ['All Pro Features', '24/7 Support', 'Daily Bonus: 1000', '10x Multiplier Events', 'Private Tables', 'Monthly Rewards'],
            color: 'from-emerald-500 to-teal-500',
            borderColor: 'border-emerald-500/50'
        },
    ];

    return (
        <div className="min-h-screen py-16 bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-14 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-teal-500/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4 border border-teal-500/20">
                        <Coins className="w-4 h-4 text-teal-400" />
                        <span className="text-teal-300 font-medium text-sm tracking-wider">PRICING PLANS</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 mb-4 animate-gradient">
                        Choose Your Perfect Plan
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Select the plan that fits your gaming style and start winning big
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => {
                        const IconComponent = plan.icon;
                        return (
                            <div
                                key={index}
                                className={`relative bg-gradient-to-br ${plan.color} rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 shadow-xl shadow-teal-500/10 hover:shadow-teal-500/25 border ${plan.borderColor}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-teal-500/30 flex items-center gap-1">
                                        <Zap className="w-3 h-3" />
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <IconComponent className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                                    <span className="text-white/70 text-sm">/one-time</span>
                                </div>

                                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 mb-4 border border-white/10">
                                    <div className="text-white/80 text-xs uppercase tracking-wider">Credits Package</div>
                                    <div className="text-3xl font-bold text-white">{plan.credits} Credits</div>
                                    {plan.bonus > 0 && (
                                        <div className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-300 text-xs px-2 py-1 rounded-full mt-1">
                                            <Gift className="w-3 h-3" />
                                            +{plan.bonus} Bonus!
                                        </div>
                                    )}
                                </div>

                                <ul className="space-y-2 mb-6">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="text-white/90 text-sm flex items-center justify-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-white/60 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center gap-2 w-full bg-white text-slate-900 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 group"
                                >
                                    Get Started
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Enterprise Section */}
                <div className="mt-12 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 text-center border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300">
                    <div className="inline-flex items-center gap-2 bg-teal-500/10 rounded-full px-4 py-2 mb-4 border border-teal-500/20">
                        <Users className="w-4 h-4 text-teal-400" />
                        <span className="text-teal-300 text-sm font-medium">Enterprise Solutions</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Need More Credits?</h3>
                    <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                        Contact us for custom packages, bulk discounts, and enterprise solutions tailored to your needs
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
                        >
                            <Mail className="w-5 h-5" />
                            Contact Sales
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                        >
                            <Rocket className="w-5 h-5" />
                            Start Free Trial
                        </Link>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-teal-400" />
                        <span className="text-sm">Secure Payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-400" />
                        <span className="text-sm">Instant Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-teal-400" />
                        <span className="text-sm">Best Value Guaranteed</span>
                    </div>
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

export default PricingPage;