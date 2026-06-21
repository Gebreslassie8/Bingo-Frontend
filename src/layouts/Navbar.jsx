import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home,
    Sparkles,
    BookOpen,
    CreditCard,
    LogIn,
    UserPlus,
    Menu,
    X,
    Target
} from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/features', label: 'Features', icon: Sparkles },
        { path: '/how-to-play', label: 'How to Play', icon: BookOpen },
        { path: '/pricing', label: 'Pricing', icon: CreditCard },
    ];

    const isActive = (path) => location.pathname === path;

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
    };

    const navItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.05, duration: 0.3 }
        })
    };

    return (
        <>
            <style>{`
                /* Remove all focus styles globally for this navbar */
                .navbar-focus-none *:focus {
                    outline: none !important;
                    box-shadow: none !important;
                    ring: none !important;
                }
                .navbar-focus-none button:focus,
                .navbar-focus-none a:focus,
                .navbar-focus-none div:focus {
                    outline: none !important;
                    box-shadow: none !important;
                }
            `}</style>

            <nav className={`navbar-focus-none fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-teal-500/20'
                : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900'
                }`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center py-3 md:py-4">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <motion.div
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                                className="text-3xl"
                            >
                                <Target className="w-8 h-8 text-teal-400" />
                            </motion.div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                    BINGO BUSINESS
                                </h1>
                                <p className="text-xs text-slate-400">Play & Earn Real Credits</p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <Link key={item.path} to={item.path} className="focus:outline-none focus:ring-0 focus:shadow-none">
                                        <motion.div
                                            custom={index}
                                            initial="hidden"
                                            animate="visible"
                                            variants={navItemVariants}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm font-medium focus:outline-none focus:ring-0 focus:shadow-none ${active
                                                ? 'text-white'
                                                : 'text-slate-300 hover:text-white'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{item.label}</span>
                                            {active && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className=" "
                                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            {!active && (
                                                <motion.div
                                                    className="absolute inset-0 bg-green-700/50 rounded-xl -z-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                                />
                                            )}
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Auth Buttons Desktop */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link to="/login" className="focus:outline-none focus:ring-0 focus:shadow-none">
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-2 rounded-xl text-slate-300 hover:text-white transition-all flex items-center gap-2 border border-slate-700/50 hover:border-teal-500/50 focus:outline-none focus:ring-0 focus:shadow-none"
                                >
                                    <LogIn className="w-4 h-4" /> Login
                                </motion.button>
                            </Link>
                            <Link to="/register" className="focus:outline-none focus:ring-0 focus:shadow-none">
                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: '0 10px 30px -5px rgba(20, 184, 166, 0.4)',
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl shadow-lg shadow-teal-500/25 flex items-center gap-2 font-medium hover:shadow-teal-500/40 transition-all duration-300 focus:outline-none focus:ring-0 focus:shadow-none"
                                >
                                    <UserPlus className="w-4 h-4" /> Sign Up Free
                                </motion.button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                            className="md:hidden text-white p-2 hover:bg-teal-500/20 rounded-xl transition-all border border-transparent hover:border-teal-500/30 focus:outline-none focus:ring-0 focus:shadow-none"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-[73px] left-0 right-0 z-40 md:hidden bg-slate-900/98 backdrop-blur-xl border-b border-teal-500/20 shadow-2xl"
                    >
                        <div className="container mx-auto px-4 py-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="focus:outline-none focus:ring-0 focus:shadow-none"
                                    >
                                        <motion.div
                                            whileTap={{ scale: 0.98 }}
                                            whileHover={{ scale: 1.02 }}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 focus:shadow-none ${active
                                                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30'
                                                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span className="font-medium">{item.label}</span>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                            <div className="border-t border-teal-500/20 mt-4 pt-4 space-y-2">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="focus:outline-none focus:ring-0 focus:shadow-none">
                                    <motion.div
                                        whileTap={{ scale: 0.98 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-300 focus:outline-none focus:ring-0 focus:shadow-none"
                                    >
                                        <LogIn className="w-5 h-5" /> Login
                                    </motion.div>
                                </Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="focus:outline-none focus:ring-0 focus:shadow-none">
                                    <motion.div
                                        whileTap={{ scale: 0.98 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30 justify-center transition-all duration-300 hover:shadow-teal-500/50 focus:outline-none focus:ring-0 focus:shadow-none"
                                    >
                                        <UserPlus className="w-5 h-5" /> Sign Up Free
                                    </motion.div>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;