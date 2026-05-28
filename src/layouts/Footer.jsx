import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Target,
    Mail,
    Phone,
    MapPin,
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Send,
    Shield,
    Heart,
    ChevronUp
} from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const currentYear = new Date().getFullYear();

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand Column */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Link to="/" className="flex items-center gap-2 mb-4 group">
                            <Target className="w-8 h-8 text-yellow-400 group-hover:rotate-12 transition-transform" />
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                Bingo Business
                            </h2>
                        </Link>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            The ultimate online bingo platform where you can play, compete, and earn real rewards. Join thousands of happy players today!
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: 'https://twitter.com', color: 'hover:text-sky-400' },
                                { icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-600' },
                                { icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-500' },
                                { icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-500' }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-slate-400 transition-all ${social.color} hover:scale-110 duration-300`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links Column */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Features', path: '/features' },
                                { name: 'How to Play', path: '/how-to-play' },
                                { name: 'Pricing', path: '/pricing' },
                                { name: 'Leaderboard', path: '/leaderboard' }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={link.path}
                                        className="text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support & Legal Column */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold mb-5">Support</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'FAQs', path: '/faq' },
                                { name: 'Contact Us', path: '/contact' },
                                { name: 'Privacy Policy', path: '/privacy' },
                                { name: 'Terms of Service', path: '/terms' },
                                { name: 'Responsible Gaming', path: '/responsible-gaming' }
                            ].map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={link.path}
                                        className="text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact & Newsletter Column */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold mb-5">Get in Touch</h3>
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-slate-400">
                                <Mail className="w-4 h-4 text-purple-400" />
                                <a href="mailto:support@bingobusiness.com" className="hover:text-white transition">support@bingobusiness.com</a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <Phone className="w-4 h-4 text-purple-400" />
                                <a href="tel:+15551234567" className="hover:text-white transition">+1 (555) 123-4567</a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <MapPin className="w-4 h-4 text-purple-400" />
                                <span>123 Bingo Street, Las Vegas, NV 89109</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:scale-105 transition"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                            {subscribed && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-green-400 mt-2"
                                >
                                    Subscribed! 🎉
                                </motion.p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500"
                >
                    <p>© {currentYear} Bingo Business. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <Shield className="w-4 h-4 text-green-400" />
                            Secure Payments
                        </span>
                        <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-400" />
                            Responsible Gaming
                        </span>
                    </div>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition"
                    >
                        Back to Top <ChevronUp className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;