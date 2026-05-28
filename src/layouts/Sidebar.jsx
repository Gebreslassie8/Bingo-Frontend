import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
    Mail,
    Bell,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, toggleSidebar, isMobile, userRole }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [expandedMenus, setExpandedMenus] = useState({});
    const [hoveredItem, setHoveredItem] = useState(null);

    // Close sidebar on mobile when route changes
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

    const adminMenuItems = [
        {
            path: '/admin',
            icon: LayoutDashboard,
            label: 'Dashboard',
            color: 'text-blue-400',
            description: 'Overview & Analytics'
        },
        {
            path: '/admin/users',
            icon: Users,
            label: 'Users',
            color: 'text-green-400',
            description: 'Manage players',
            submenu: [
                { path: '/admin/users/all', label: 'All Users', icon: Users },
                { path: '/admin/users/active', label: 'Active Players', icon: Trophy },
                { path: '/admin/users/suspended', label: 'Suspended', icon: User }
            ]
        },
        {
            path: '/admin/reports',
            icon: BarChart3,
            label: 'Reports',
            color: 'text-purple-400',
            description: 'Analytics & Stats',
            submenu: [
                { path: '/admin/reports/revenue', label: 'Revenue Report', icon: TrendingUp },
                { path: '/admin/reports/players', label: 'Player Report', icon: Users },
                { path: '/admin/reports/games', label: 'Game Report', icon: Gamepad2 }
            ]
        },
        {
            path: '/admin/settings',
            icon: Settings,
            label: 'Settings',
            color: 'text-yellow-400',
            description: 'System config',
            submenu: [
                { path: '/admin/settings/general', label: 'General', icon: Settings },
                { path: '/admin/settings/game', label: 'Game Settings', icon: Gamepad2 },
                { path: '/admin/settings/payment', label: 'Payment', icon: Wallet }
            ]
        }
    ];

    const playerMenuItems = [
        {
            path: '/dashboard',
            icon: LayoutDashboard,
            label: 'Dashboard',
            color: 'text-blue-400',
            description: 'Your overview'
        },
        {
            path: '/game',
            icon: Gamepad2,
            label: 'Play Game',
            color: 'text-green-400',
            description: 'Start playing'
        },
        {
            path: '/shop',
            icon: ShoppingBag,
            label: 'Shop',
            color: 'text-yellow-400',
            description: 'Buy credits',
            submenu: [
                { path: '/shop/credits', label: 'Buy Credits', icon: Gift },
                { path: '/shop/vip', label: 'VIP Membership', icon: Crown },
                { path: '/shop/special', label: 'Special Offers', icon: Trophy }
            ]
        },
        {
            path: '/wallet',
            icon: Wallet,
            label: 'Wallet',
            color: 'text-purple-400',
            description: 'Manage funds',
            submenu: [
                { path: '/wallet/deposit', label: 'Deposit', icon: Gift },
                { path: '/wallet/withdraw', label: 'Withdraw', icon: LogOut },
                { path: '/wallet/transactions', label: 'History', icon: BarChart3 }
            ]
        }
    ];

    const menuItems = userRole === 'admin' ? adminMenuItems : playerMenuItems;

    const isActive = (path) => {
        if (path === '/admin' && location.pathname === '/admin') return true;
        if (path !== '/admin' && location.pathname.startsWith(path)) return true;
        return location.pathname === path;
    };

    const isSubmenuActive = (submenu) => {
        return submenu.some(item => location.pathname === item.path);
    };

    const menuVariants = {
        open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
        closed: { x: -280, transition: { type: "spring", stiffness: 300, damping: 30 } }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={menuVariants}
                className={`fixed md:relative z-30 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl h-full flex flex-col ${isOpen ? 'w-72' : 'w-20'
                    }`}
            >
                {/* Logo Area */}
                <div className={`p-4 border-b border-slate-700/50 ${!isOpen && 'px-2'}`}>
                    {isOpen ? (
                        <Link to={userRole === 'admin' ? '/admin' : '/dashboard'} className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="text-3xl group-hover:scale-110 transition-transform">🎯</div>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    BINGO BUSINESS
                                </h1>
                                <p className="text-xs text-slate-400">{userRole === 'admin' ? 'Admin Panel' : 'Player Panel'}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="flex justify-center relative">
                            <div className="text-2xl group-hover:scale-110 transition-transform">🎯</div>
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                    )}
                </div>

                {/* User Profile Summary (when sidebar is open) */}
                {isOpen && user && (
                    <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{user?.username}</p>
                                <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                            </div>
                            {userRole === 'player' && (
                                <div className="text-right">
                                    <p className="text-yellow-400 text-sm font-bold">{user?.wallet?.balance || 0}</p>
                                    <p className="text-slate-500 text-[10px]">credits</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation Menu */}
                <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        const hasSubmenu = item.submenu && item.submenu.length > 0;
                        const isExpanded = expandedMenus[item.label];
                        const submenuActive = hasSubmenu && isSubmenuActive(item.submenu);

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
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                        }
                    ${!isOpen && 'justify-center'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-5 h-5 ${active ? 'text-white' : item.color}`} />
                                        {isOpen && (
                                            <span className="text-sm font-medium">{item.label}</span>
                                        )}
                                    </div>

                                    {isOpen && hasSubmenu && (
                                        <div className="ml-auto">
                                            {isExpanded ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    )}
                                </Link>

                                {/* Tooltip for collapsed state */}
                                {!isOpen && hoveredItem === item.label && (
                                    <div className="fixed left-20 z-50 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg shadow-xl whitespace-nowrap pointer-events-none">
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
                                                                    ? 'bg-purple-500/20 text-purple-400'
                                                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                                                }`}
                                                        >
                                                            <SubIcon className="w-4 h-4" />
                                                            <span>{subItem.label}</span>
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
                <div className="p-4 border-t border-slate-700/50 space-y-2">
                    {/* Support Link */}
                    <Link
                        to="/support"
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-slate-400 hover:text-white hover:bg-slate-700/50
              ${!isOpen && 'justify-center'}`}
                    >
                        <HelpCircle className="w-5 h-5" />
                        {isOpen && <span className="text-sm">Help & Support</span>}
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-red-400 hover:text-red-300 hover:bg-red-500/10
              ${!isOpen && 'justify-center'}`}
                    >
                        <LogOut className="w-5 h-5" />
                        {isOpen && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Mobile Toggle Button */}
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-40 bg-slate-800 text-white p-2 rounded-lg shadow-lg hover:bg-slate-700 transition-all"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            )}

            {/* Desktop Toggle Button */}
            {!isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="fixed left-0 top-20 z-40 bg-slate-800 text-white p-1.5 rounded-r-lg hover:bg-slate-700 transition-all shadow-lg"
                    style={{ left: isOpen ? '284px' : '72px' }}
                >
                    {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
            )}
        </>
    );
};

export default Sidebar;