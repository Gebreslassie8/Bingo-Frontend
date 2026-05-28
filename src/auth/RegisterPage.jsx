import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    UserPlus,
    Shield,
    CheckCircle,
    XCircle,
    ArrowRight,
    Sparkles,
    Gift
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    // Validation Schema
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be less than 20 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(50, 'Password must be less than 50 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
        agreeTerms: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions')
            .required('You must accept the terms and conditions')
    });

    // Formik Configuration
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500));

            const result = register(values.username, values.password, values.email);

            if (result.success) {
                formik.setStatus({ success: 'Account created successfully! Redirecting...' });
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                formik.setErrors({ submit: result.message });
            }
            setLoading(false);
        }
    });

    // Password strength calculator
    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const strengthMap = {
            0: { text: 'Very Weak', color: 'bg-red-500', width: '20%', icon: XCircle },
            1: { text: 'Weak', color: 'bg-orange-500', width: '40%', icon: XCircle },
            2: { text: 'Fair', color: 'bg-yellow-500', width: '60%', icon: XCircle },
            3: { text: 'Good', color: 'bg-blue-500', width: '80%', icon: CheckCircle },
            4: { text: 'Strong', color: 'bg-green-500', width: '100%', icon: CheckCircle },
            5: { text: 'Very Strong', color: 'bg-emerald-500', width: '100%', icon: CheckCircle }
        };

        return strengthMap[Math.min(strength, 5)];
    };

    const passwordStrength = getPasswordStrength(formik.values.password);

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
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={floatingAnimation}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={floatingAnimation}
                    style={{ animationDelay: '2s' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
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
                <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700/50 transform transition-all duration-300 hover:shadow-green-500/10">

                    {/* Logo and Title */}
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg mb-4"
                        >
                            <UserPlus className="w-10 h-10 text-white" />
                        </motion.div>
                        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Join Bingo Business
                        </h2>
                        <p className="text-slate-400 mt-2 text-sm sm:text-base">
                            Start playing and winning real credits
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="mt-3 inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20"
                        >
                            <Gift className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm font-medium">Get 500 FREE credits on signup!</span>
                        </motion.div>
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {(formik.errors.submit || formik.status?.error) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                            >
                                <div className="flex items-center gap-2 text-red-400 text-sm">
                                    <Shield className="w-5 h-5" />
                                    <span>{formik.errors.submit || formik.status?.error}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Success Message */}
                    <AnimatePresence>
                        {formik.status?.success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                            >
                                <div className="flex items-center gap-2 text-green-400 text-sm">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>{formik.status.success}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Registration Form */}
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Username Field */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Username <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-700/50 text-white rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:ring-2 transition-all duration-200 border ${formik.touched.username && formik.errors.username
                                            ? 'border-red-500 focus:ring-red-500'
                                            : formik.touched.username && !formik.errors.username
                                                ? 'border-green-500 focus:ring-green-500'
                                                : 'border-slate-600/50 focus:ring-purple-500'
                                        }`}
                                    required
                                    placeholder="3-20 characters (letters, numbers, _)"
                                    autoComplete="username"
                                />
                                {formik.touched.username && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {!formik.errors.username ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )}
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

                        {/* Email Field */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Email Address <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-700/50 text-white rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:ring-2 transition-all duration-200 border ${formik.touched.email && formik.errors.email
                                            ? 'border-red-500 focus:ring-red-500'
                                            : formik.touched.email && !formik.errors.email
                                                ? 'border-green-500 focus:ring-green-500'
                                                : 'border-slate-600/50 focus:ring-purple-500'
                                        }`}
                                    required
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                />
                                {formik.touched.email && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {!formik.errors.email ? (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <XCircle className="h-5 w-5 text-red-500" />
                                        )}
                                    </div>
                                )}
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-1 text-xs text-red-400"
                                >
                                    {formik.errors.email}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Password Field */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Password <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-700/50 text-white rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 transition-all duration-200 border ${formik.touched.password && formik.errors.password
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-slate-600/50 focus:ring-purple-500'
                                        }`}
                                    required
                                    placeholder="Minimum 6 characters"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {formik.values.password.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-2"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="flex-1 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: passwordStrength.width }}
                                                className={`h-full ${passwordStrength.color} transition-all duration-500`}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                            <passwordStrength.icon className="w-3 h-3" />
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        Use uppercase, numbers & symbols for strong password
                                    </div>
                                </motion.div>
                            )}
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

                        {/* Confirm Password Field */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block text-slate-300 text-sm font-medium mb-2">
                                Confirm Password <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-slate-700/50 text-white rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 transition-all duration-200 border ${formik.touched.confirmPassword && formik.errors.confirmPassword
                                            ? 'border-red-500 focus:ring-red-500'
                                            : formik.touched.confirmPassword && !formik.errors.confirmPassword
                                                ? 'border-green-500 focus:ring-green-500'
                                                : 'border-slate-600/50 focus:ring-purple-500'
                                        }`}
                                    required
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-1 text-xs text-red-400"
                                >
                                    {formik.errors.confirmPassword}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Terms and Conditions */}
                        <motion.div variants={itemVariants} className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formik.values.agreeTerms}
                                onChange={formik.handleChange}
                                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                            />
                            <label className="text-sm text-slate-400 cursor-pointer">
                                I agree to the{' '}
                                <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                                    Privacy Policy
                                </Link>
                            </label>
                        </motion.div>
                        {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-red-400 -mt-2"
                            >
                                {formik.errors.agreeTerms}
                            </motion.p>
                        )}

                        {/* Register Button */}
                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:hover:scale-100 overflow-hidden group"
                            >
                                <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : ''}`}>
                                    <Sparkles className="w-5 h-5" />
                                    Create Account
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

                    {/* Login Link */}
                    <motion.div variants={itemVariants} className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors inline-flex items-center gap-1 group">
                                Sign in here
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </p>
                    </motion.div>

                    {/* Bonus Info */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        className="mt-6 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20"
                    >
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                            <Sparkles className="w-4 h-4 text-green-400" />
                            <span>Get 500 FREE credits on registration</span>
                            <Sparkles className="w-4 h-4 text-green-400" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;