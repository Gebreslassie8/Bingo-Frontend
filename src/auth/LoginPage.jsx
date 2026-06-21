import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Lock,
    User,
    Eye,
    EyeOff,
    LogIn,
    Sparkles,
    Shield,
    Crown,
    ArrowRight,
    Target,
    Zap,
    CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    // Validation Schema
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be less than 20 characters')
            .required('Username is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        rememberMe: Yup.boolean()
    });

    // Formik Configuration
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            rememberMe: false
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));

            const result = login(values.username, values.password);

            if (result.success) {
                if (values.rememberMe) {
                    localStorage.setItem('rememberedUsername', values.username);
                } else {
                    localStorage.removeItem('rememberedUsername');
                }
                navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
            } else {
                formik.setErrors({ submit: result.message });
            }
            setLoading(false);
        }
    });

    // Load saved username on mount
    React.useEffect(() => {
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            formik.setFieldValue('username', savedUsername);
            formik.setFieldValue('rememberMe', true);
        }
    }, []);

    const demoLogin = (demoUsername, demoPassword) => {
        formik.setFieldValue('username', demoUsername);
        formik.setFieldValue('password', demoPassword);
        // Small delay to ensure form values are set
        setTimeout(() => {
            formik.submitForm();
        }, 100);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    const floatingAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Elements - Teal/Cyan Theme */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={floatingAnimation}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={floatingAnimation}
                    style={{ animationDelay: '2s' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
                    animate={floatingAnimation}
                    style={{ animationDelay: '1s' }}
                />
            </div>

            {/* Main Card */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative w-full max-w-md"
            >
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-teal-500/20 transform transition-all duration-300 hover:shadow-teal-500/10">

                    {/* Logo and Title */}
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg shadow-teal-500/25 mb-4"
                        >
                            <Target className="w-10 h-10 text-white" />
                        </motion.div>
                        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                            Welcome Back
                        </h2>
                        <p className="text-slate-400 mt-2 text-sm sm:text-base">
                            Sign in to continue your Bingo journey
                        </p>
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {formik.errors.submit && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                            >
                                <div className="flex items-center gap-2 text-red-400 text-sm">
                                    <Shield className="w-5 h-5" />
                                    <span>{formik.errors.submit}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Login Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Username Field */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Username
                            </label>
                            <div className={`relative transition-all duration-200 ${formik.touched.username && !formik.errors.username ? 'transform scale-[1.01]' : ''}`}>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-teal-400" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-700/50 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all duration-200 border ${formik.touched.username && formik.errors.username
                                            ? 'border-red-500 focus:ring-red-500'
                                            : formik.touched.username && !formik.errors.username
                                                ? 'border-teal-500 focus:ring-teal-500'
                                                : 'border-slate-600/50 focus:ring-teal-500'
                                        }`}
                                    required
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                />
                                {formik.touched.username && !formik.errors.username && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-teal-400"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                            {formik.touched.username && formik.errors.username && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-1 text-xs text-red-400"
                                >
                                    {formik.errors.username}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Password Field */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-teal-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-700/50 text-white rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 transition-all duration-200 border ${formik.touched.password && formik.errors.password
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-slate-600/50 focus:ring-teal-500'
                                        }`}
                                    required
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-teal-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-1 text-xs text-red-400"
                                >
                                    {formik.errors.password}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Remember Me & Forgot Password */}
                        <motion.div variants={itemVariants} className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formik.values.rememberMe}
                                    onChange={formik.handleChange}
                                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500 focus:ring-offset-0 cursor-pointer"
                                />
                                <span className="text-sm text-slate-400 group-hover:text-teal-400 transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </motion.div>

                        {/* Login Button */}
                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 disabled:opacity-50 disabled:hover:scale-100 overflow-hidden group"
                            >
                                <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : ''}`}>
                                    <LogIn className="w-5 h-5" />
                                    Login
                                </span>
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </button>
                        </motion.div>
                    </form>

                    {/* Demo Accounts Section */}
                    <motion.div variants={itemVariants} className="mt-8 p-4 bg-slate-700/30 rounded-lg border border-teal-500/20">
                        <p className="text-center text-slate-400 text-sm mb-3 flex items-center justify-center gap-2">
                            <Zap className="w-4 h-4 text-teal-400" />
                            Quick Demo Login
                            <Zap className="w-4 h-4 text-teal-400" />
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => demoLogin('admin', 'admin123')}
                                className="px-3 py-2 bg-slate-700 hover:bg-teal-500/20 rounded-lg text-sm text-white transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 border border-transparent hover:border-teal-500/30"
                            >
                                <Crown className="w-4 h-4 text-yellow-400" />
                                Admin Demo
                            </button>
                            <button
                                onClick={() => demoLogin('player', 'player123')}
                                className="px-3 py-2 bg-slate-700 hover:bg-cyan-500/20 rounded-lg text-sm text-white transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 border border-transparent hover:border-cyan-500/30"
                            >
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                Player Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Register Link */}
                    <motion.div variants={itemVariants} className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors inline-flex items-center gap-1 group">
                                Create account
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;