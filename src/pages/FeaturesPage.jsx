import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import {
    Target,
    Coins,
    BarChart3,
    Trophy,
    Palette,
    Bell,
    Handshake,
    Gem,
    Sparkles,
    Shield,
    Zap,
    Star,
    ArrowRight,
    Gamepad2
} from 'lucide-react';

const FeaturesPage = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const features = [
        {
            icon: Target,
            title: 'Classic Bingo',
            description: 'Traditional 75-ball Bingo with all the classic patterns you love',
            color: 'from-teal-500 to-cyan-500',
            stat: '1M+ Games'
        },
        {
            icon: Coins,
            title: 'Real Rewards',
            description: 'Win real credits that you can withdraw anytime, instantly',
            color: 'from-emerald-500 to-teal-500',
            stat: '500K+ Won'
        },
        {
            icon: BarChart3,
            title: 'Advanced Analytics',
            description: 'Track your performance with detailed statistics and insights',
            color: 'from-cyan-500 to-blue-500',
            stat: 'Real-time'
        },
        {
            icon: Trophy,
            title: 'Leaderboards',
            description: 'Compete with players worldwide and climb the ranks',
            color: 'from-amber-500 to-orange-500',
            stat: 'Global'
        },
        {
            icon: Palette,
            title: 'Custom Cards',
            description: 'Choose from multiple card designs and themes',
            color: 'from-pink-500 to-rose-500',
            stat: '10+ Themes'
        },
        {
            icon: Bell,
            title: 'Real-time Updates',
            description: 'Get instant notifications for wins and promotions',
            color: 'from-cyan-500 to-teal-500',
            stat: 'Instant'
        },
        {
            icon: Handshake,
            title: 'Fair Play',
            description: 'Certified random number generator for fair gameplay',
            color: 'from-emerald-500 to-teal-500',
            stat: '100% Fair'
        },
        {
            icon: Gem,
            title: 'VIP Program',
            description: 'Exclusive benefits for loyal players',
            color: 'from-amber-500 to-yellow-500',
            stat: 'VIP Access'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900 overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                {/* Animated Background - Teal/Cyan Theme */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-900/50 to-cyan-900/30">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                    </div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 bg-teal-500/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-teal-500/20"
                        >
                            <Sparkles className="w-4 h-4 text-teal-400" />
                            <span className="text-sm text-teal-300">Premium Features</span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                        >
                            Everything You Need for an{' '}
                            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                Amazing Experience
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                        >
                            Discover the ultimate Bingo gaming platform with cutting-edge features,
                            real rewards, and an unparalleled gaming experience.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="mt-8 flex flex-wrap justify-center gap-4"
                        >
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-teal-500/10">
                                <Shield className="w-4 h-4 text-teal-400" />
                                <span className="text-sm text-slate-300">Secure Platform</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-teal-500/10">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm text-slate-300">Instant Withdrawals</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-teal-500/10">
                                <Star className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-slate-300">24/7 Support</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid Section */}
            <section ref={ref} className="py-20 bg-slate-800/30 backdrop-blur-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={containerVariants}
                        className="text-center mb-16"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-teal-500/10 rounded-full px-4 py-2 mb-4 border border-teal-500/20">
                            <Star className="w-4 h-4 text-teal-400" />
                            <span className="text-sm text-teal-400">Why Choose Us</span>
                        </motion.div>
                        <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Powerful Features for Every Player
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Experience the best Bingo gaming platform with amazing features and rewards
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    whileHover={{
                                        y: -8,
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                    className={`group relative bg-gradient-to-br ${feature.color} p-6 rounded-2xl overflow-hidden cursor-pointer shadow-xl shadow-teal-500/10 hover:shadow-teal-500/30 transition-all duration-300`}
                                >
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 backdrop-blur-sm">
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                        <p className="text-white/90 text-sm mb-4 leading-relaxed">{feature.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-full">{feature.stat}</span>
                                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                                                <span className="text-white text-sm">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Statistics Section - Teal/Cyan Theme */}
            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-teal-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10"
                        >
                            <div className="text-4xl font-bold text-teal-400 mb-2">10,000+</div>
                            <div className="text-slate-300">Active Players</div>
                            <div className="text-xs text-emerald-400 mt-2">↑ 25% this month</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10"
                        >
                            <div className="text-4xl font-bold text-emerald-400 mb-2">1M+</div>
                            <div className="text-slate-300">Games Played</div>
                            <div className="text-xs text-emerald-400 mt-2">↑ 50% this month</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                        >
                            <div className="text-4xl font-bold text-cyan-400 mb-2">500K+</div>
                            <div className="text-slate-300">Credits Won</div>
                            <div className="text-xs text-emerald-400 mt-2">↑ 100% this month</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-6 text-center border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
                        >
                            <div className="text-4xl font-bold text-amber-400 mb-2">99.9%</div>
                            <div className="text-slate-300">Uptime Guarantee</div>
                            <div className="text-xs text-emerald-400 mt-2">24/7 Support</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Teal/Cyan Theme */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    </div>
                </div>

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Ready to Experience These Features?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Join thousands of players already enjoying the ultimate Bingo experience
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-xl"
                        >
                            <Gamepad2 className="w-5 h-5" />
                            Get Started Free
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="mt-6 text-white/70 text-sm">
                            No credit card required • 500 free credits on signup
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Animations */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default FeaturesPage;