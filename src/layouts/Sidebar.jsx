import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Settings,
    BarChart3,
    Gamepad2,
    ShoppingBag,
    Wallet,
    LogOut,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    User,
    Crown,
    Gift,
    Trophy,
    TrendingUp,
    HelpCircle,
    Target,
    Zap,
    Shield,
    Home,
    CreditCard,
    UserPlus,
    Sparkles,
    DollarSign,
    History,
    Award
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, isMobile, userRole }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [expandedMenus, setExpandedMenus] = useState({});
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        if (isMobile && isOpen) {
            toggleSidebar();
        }
    }, [location.pathname]);

    const toggleSubmenu = (menuName) => {
        setExpandedMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getUserInitials = () => {
        if (!user?.username) return 'U';
        return user.username.charAt(0).toUpperCase();
    };

    // Admin Menu Items - Wallet Management as single item (no submenu)
    const adminMenuItems = [
        {
            path: '/admin',
            icon: LayoutDashboard,
            label: 'Dashboard',
            color: 'text-teal-400',
            description: 'Overview & Analytics'
        },
        {
            path: '/admin/users',
            icon: Users,
            label: 'Manage Users',
            color: 'text-cyan-400',
            description: 'View all users'
        },
        {
            path: '/admin/wallet',
            icon: Wallet,
            label: 'Wallet Management',
            color: 'text-purple-400',
            description: 'Manage user wallets'
        },
        {
            path: '/admin/reports',
            icon: BarChart3,
            label: 'Reports',
            color: 'text-emerald-400',
            description: 'Analytics & Stats'
        },
        {
            path: '/admin/settings',
            icon: Settings,
            label: 'Settings',
            color: 'text-amber-400',
            description: 'System config',
            submenu: [
                { path: '/admin/settings/general', label: 'General', icon: Settings },
                { path: '/admin/settings/game', label: 'Game Settings', icon: Gamepad2 },
                { path: '/admin/settings/payment', label: 'Payment', icon: CreditCard }
            ]
        }
    ];

    // Player Menu Items - Wallet as single item (no submenu)
    const playerMenuItems = [
        {
            path: '/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
            color: 'text-teal-400',
            description: 'Your overview'
        },
        {
            path: '/game',
            icon: Gamepad2,
            label: 'Play Game',
            color: 'text-cyan-400',
            description: 'Start playing'
        },
        {
            path: '/shop',
            icon: ShoppingBag,
            label: 'Shop',
            color: 'text-amber-400',
            description: 'Buy credits',
            submenu: [
                { path: '/shop/credits', label: 'Buy Credits', icon: CreditCard },
                { path: '/shop/vip', label: 'VIP Membership', icon: Crown },
                { path: '/shop/special', label: 'Special Offers', icon: Trophy }
            ]
        },
        {
            path: '/wallet',
            icon: Wallet,
            label: 'My Wallet',
            color: 'text-purple-400',
            description: 'Manage your credits'
        },
        {
            path: '/profile',
            icon: User,
            label: 'Profile',
            color: 'text-pink-400',
            description: 'Your account settings'
        }
    ];

    const menuItems = userRole === 'admin' ? adminMenuItems : playerMenuItems;

    const isActive = (path) => {
        if (path === '/admin' && location.pathname === '/admin') return true;
        if (path === '/dashboard' && location.pathname === '/dashboard') return true;
        if (path !== '/admin' && path !== '/dashboard' && location.pathname.startsWith(path)) return true;
        return location.pathname === path;
    };

    const isSubmenuActive = (submenu) => {
        return submenu.some(item => location.pathname === item.path);
    };

    // Sidebar width based on state
    const sidebarWidth = isMobile ? (isOpen ? 280 : 0) : (isOpen ? 280 : 72);

    return (
        <>
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: sidebarWidth,
                    x: isMobile && !isOpen ? -sidebarWidth : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`fixed md:relative z-30 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl h-full flex flex-col border-r border-teal-500/10 overflow-hidden ${isMobile && !isOpen ? 'hidden' : ''}`}
                style={{
                    width: sidebarWidth,
                    minWidth: sidebarWidth,
                    maxWidth: sidebarWidth
                }}
            >
                {/* Logo Area */}
                <div className={`p-4 border-b border-teal-500/10 ${!isOpen && 'px-2'}`}>
                    {isOpen ? (
                        <Link to={userRole === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform flex-shrink-0">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border-2 border-slate-800"></div>
                            </div>
                            <div className="overflow-hidden">
                                <h1 className="text-lg font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent whitespace-nowrap">
                                    BINGO BUSINESS
                                </h1>
                                <p className="text-xs text-slate-400 whitespace-nowrap">{userRole === 'admin' ? 'Admin Panel' : 'Player Panel'}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex justify-center relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/25">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse border-2 border-slate-800"></div>
                        </div>
                    )}
                </div>

                {/* User Profile Summary */}
                {isOpen && user && (
                    <div className="mx-4 mt-4 p-3 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl border border-teal-500/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/20 flex-shrink-0">
                                <span className="text-white font-bold text-lg">
                                    {getUserInitials()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{user?.username || 'User'}</p>
                                <p className="text-slate-400 text-xs truncate">{user?.email || 'user@email.com'}</p>
                            </div>
                            {userRole === 'player' && (
                                <div className="text-right flex-shrink-0">
                                    <p className="text-teal-400 text-sm font-bold">{user?.credits || 0}</p>
                                    <p className="text-slate-500 text-[10px]">credits</p>
                                </div>
                            )}
                            {userRole === 'admin' && (
                                <div className="text-right flex-shrink-0">
                                    <p className="text-purple-400 text-sm font-bold">Admin</p>
                                    <p className="text-slate-500 text-[10px]">privileges</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        const hasSubmenu = item.submenu && item.submenu.length > 0;
                        const isExpanded = expandedMenus[item.label];
                        const submenuActive = hasSubmenu && isSubmenuActive(item.submenu);

                        // Auto-expand if submenu is active
                        if (hasSubmenu && submenuActive && !isExpanded) {
                            // Use a timeout to avoid state updates during render
                            setTimeout(() => {
                                setExpandedMenus(prev => ({
                                    ...prev,
                                    [item.label]: true
                                }));
                            }, 0);
                        }

                        return (
                            <div key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={(e) => {
                                        if (hasSubmenu) {
                                            e.preventDefault();
                                            toggleSubmenu(item.label);
                                        }
                                    }}
                                    onMouseEnter={() => setHoveredItem(item.label)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                                    ${active || submenuActive
                                            ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                        }
                                    ${!isOpen && 'justify-center'}`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : item.color}`} />
                                        {isOpen && (
                                            <span className="text-sm font-medium truncate">{item.label}</span>
                                        )}
                                    </div>

                                    {isOpen && hasSubmenu && (
                                        <div className="ml-auto flex-shrink-0">
                                            {isExpanded ? (
                                                <ChevronUp className="w-4 h-4 text-slate-400" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-slate-400" />
                                            )}
                                        </div>
                                    )}
                                </Link>

                                {/* Tooltip for collapsed state */}
                                {!isOpen && hoveredItem === item.label && (
                                    <div className="fixed left-[76px] z-50 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg shadow-xl whitespace-nowrap pointer-events-none border border-teal-500/20">
                                        {item.label}
                                        {item.description && (
                                            <div className="text-xs text-slate-400">{item.description}</div>
                                        )}
                                    </div>
                                )}

                                {/* Submenu */}
                                {hasSubmenu && isOpen && (
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="ml-9 mt-1 space-y-1 overflow-hidden"
                                            >
                                                {item.submenu.map((subItem) => {
                                                    const SubIcon = subItem.icon;
                                                    const isSubActive = location.pathname === subItem.path;
                                                    return (
                                                        <Link
                                                            key={subItem.path}
                                                            to={subItem.path}
                                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm
                                                            ${isSubActive
                                                                    ? 'bg-teal-500/20 text-teal-400'
                                                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                                                }`}
                                                        >
                                                            <SubIcon className="w-4 h-4 flex-shrink-0" />
                                                            <span className="truncate">{subItem.label}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-teal-500/10 space-y-2">
                    <Link
                        to="/support"
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-slate-400 hover:text-white hover:bg-slate-700/50
                        ${!isOpen && 'justify-center'}`}
                    >
                        <HelpCircle className="w-5 h-5 flex-shrink-0" />
                        {isOpen && <span className="text-sm truncate">Help & Support</span>}
                    </Link>

                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10
                        ${!isOpen && 'justify-center'}`}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        {isOpen && <span className="text-sm truncate">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Desktop Toggle Button - Always visible */}
            {!isMobile && (
                <button
                    onClick={toggleSidebar}
                    className={`fixed top-1/2 z-40 bg-slate-800 text-white p-1.5 rounded-r-lg hover:bg-slate-700 transition-all shadow-lg border border-teal-500/10 hover:border-teal-500/30
                        ${isOpen ? 'left-[276px]' : 'left-[68px]'}`}
                    style={{ transform: 'translateY(-50%)' }}
                >
                    {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            )}

            {/* Custom scrollbar styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #14b8a6;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #06b6d4;
                }
            `}</style>
        </>
    );
};

export default Sidebar;