import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Target, Gift, Users, Trophy, Zap, Shield,
    Star, ArrowRight, CheckCircle, Award, Clock,
    CreditCard, Smartphone, Sparkles, Crown
} from 'lucide-react';

// Fade-up animation helper
const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const Homepage = () => {
    return (
        // No min-h-screen – parent layout controls full height
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
                {/* Animated background shapes (unchanged) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                        className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
                        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                        className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium text-white/90">New Game Mode Released!</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent"
                        >
                            Play Bingo, Earn Real Rewards
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
                        >
                            Join thousands of players winning real credits, gift cards, and cash prizes. The most exciting bingo experience online.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link to="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2 text-lg"
                                >
                                    Get Started <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                            <Link to="/how-to-play">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition"
                                >
                                    How It Works
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.3 }}
                            className="mt-12 flex flex-wrap justify-center gap-6 text-slate-400"
                        >
                            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> 100% Secure</div>
                            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Instant Withdrawals</div>
                            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> 24/7 Support</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white/5">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Bingo Business?</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Experience the best online bingo platform with amazing features</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            { icon: Trophy, title: 'Real Rewards', desc: 'Win real credits, gift cards, and cash prizes every day' },
                            { icon: Zap, title: 'Lightning Fast', desc: 'Ultra-fast gameplay with no lag or delays' },
                            { icon: Users, title: 'Live Community', desc: 'Play with thousands of active players worldwide' },
                            { icon: Shield, title: 'Fully Secure', desc: 'Your data and payments are always protected' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-xl"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How to Play Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How to Play?</h2>
                            <p className="text-slate-400 mb-8">Getting started is super easy – follow these 4 simple steps</p>
                            <div className="space-y-6">
                                {[
                                    { step: '01', title: 'Create Account', desc: 'Sign up for free in under 30 seconds' },
                                    { step: '02', title: 'Deposit Credits', desc: 'Add funds using any payment method' },
                                    { step: '03', title: 'Join a Game', desc: 'Pick a bingo room and buy your cards' },
                                    { step: '04', title: 'Win & Withdraw', desc: 'Win prizes and withdraw instantly' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white shrink-0">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                                            <p className="text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold flex items-center gap-2"
                                >
                                    Start Playing Now <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                                <div className="flex justify-center mb-6">
                                    <div className="grid grid-cols-3 gap-3">
                                        {[...Array(9)].map((_, i) => (
                                            <div key={i} className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center text-2xl font-bold text-yellow-400">
                                                {Math.floor(Math.random() * 90) + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-slate-300">Example bingo card – match numbers to win!</p>
                                    <div className="mt-4 inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                                        <Trophy className="w-4 h-4 text-green-400" />
                                        <span className="text-green-400 font-medium">Current Jackpot: 5,000 Credits</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-white/5">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple & Transparent Pricing</h2>
                        <p className="text-slate-400">No hidden fees – just pure fun and fair rewards</p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                    >
                        {[
                            { name: 'Starter', price: 'Free', credits: '50 Free Credits', features: ['Access to free rooms', 'Daily bonuses', 'Standard support'], popular: false },
                            { name: 'Pro', price: '$19.99', credits: '1,000 Credits', features: ['All game rooms', 'Priority support', '2x daily bonuses', 'Exclusive tournaments'], popular: true },
                            { name: 'VIP', price: '$49.99', credits: '3,000 Credits', features: ['VIP rooms', '24/7 dedicated support', '5x daily bonuses', 'Monthly cashback', 'Early access'], popular: false }
                        ].map((plan, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all hover:shadow-2xl ${plan.popular ? 'border-purple-500 shadow-lg shadow-purple-500/20 scale-105' : 'border-white/10'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        MOST POPULAR
                                    </div>
                                )}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                                        {plan.price !== 'Free' && <span className="text-slate-400">/month</span>}
                                    </div>
                                    <p className="text-sm text-purple-400 mt-2">{plan.credits}</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-center gap-2 text-slate-300 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/register">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        className={`w-full py-3 rounded-xl font-semibold transition ${plan.popular
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                            }`}
                                    >
                                        Get Started
                                    </motion.button>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Winning?</h2>
                        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Join the best bingo community and start earning real rewards today!</p>
                        <Link to="/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold shadow-lg flex items-center gap-2 mx-auto"
                            >
                                <Crown className="w-5 h-5" /> Claim Your Welcome Bonus
                            </motion.button>
                        </Link>
                        <p className="text-white/60 text-sm mt-6">No purchase required. Terms apply.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;