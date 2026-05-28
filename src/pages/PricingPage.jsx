import React from 'react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
    const plans = [
        { name: 'Free', price: '0', credits: '500', bonus: '0', features: ['Basic Bingo Games', 'Standard Support', 'Daily Bonus: 10'], color: 'from-gray-500 to-gray-600' },
        { name: 'Starter', price: '9.99', credits: '1,000', bonus: '100', features: ['All Free Features', 'Priority Support', 'Daily Bonus: 50', '2x Multiplier Events'], color: 'from-green-500 to-emerald-600', popular: true },
        { name: 'Pro', price: '29.99', credits: '5,000', bonus: '750', features: ['All Starter Features', 'VIP Support', 'Daily Bonus: 200', '5x Multiplier Events', 'Exclusive Tournaments'], color: 'from-purple-500 to-pink-500' },
        { name: 'Ultimate', price: '99.99', credits: '20,000', bonus: '5,000', features: ['All Pro Features', '24/7 Support', 'Daily Bonus: 1000', '10x Multiplier Events', 'Private Tables', 'Monthly Rewards'], color: 'from-yellow-500 to-orange-500' },
    ];

    return (
        <div className="py-16">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Pricing Plans</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Choose the perfect plan for your gaming style
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-gradient-to-br ${plan.color} rounded-2xl p-6 text-center hover:scale-105 transition-all shadow-xl`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                                    MOST POPULAR
                                </div>
                            )}
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-4xl font-bold text-white">${plan.price}</span>
                                <span className="text-white opacity-80">/one-time</span>
                            </div>
                            <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                                <div className="text-white text-sm">Get</div>
                                <div className="text-2xl font-bold text-white">{plan.credits} Credits</div>
                                {plan.bonus > 0 && (
                                    <div className="text-yellow-300 text-sm">+{plan.bonus} Bonus!</div>
                                )}
                            </div>
                            <ul className="space-y-2 mb-6">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="text-white text-sm flex items-center justify-center gap-2">
                                        <span>✓</span> {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                to="/register"
                                className="block bg-white text-slate-900 py-2 rounded-lg font-semibold hover:scale-105 transition-all"
                            >
                                Get Started
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-slate-800 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Need More Credits?</h3>
                    <p className="text-slate-300 mb-4">Contact us for custom packages and enterprise solutions</p>
                    <Link to="/contact" className="text-purple-400 hover:text-purple-300 font-semibold">
                        Contact Sales →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;