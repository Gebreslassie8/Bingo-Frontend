import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Menu,
    Bell,
    User,
    LogOut,
    Settings,
    ChevronDown,
    Wallet,
    Crown,
    Gift,
    Sparkles,
    Target,
    CheckCircle,
    X,
    Mail
} from 'lucide-react';

const Header = ({ toggleSidebar, user, isMobile, sidebarOpen }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Welcome to Bingo Business!', type: 'info', read: false },
        { id: 2, message: 'New daily bonus available!', type: 'success', read: false },
        { id: 3, message: 'You won 500 credits in Classic Bingo!', type: 'success', read: false },
    ]);
    const [showNotifications, setShowNotifications] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserMenu(false);
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
            case 'info': return <Sparkles className="w-4 h-4 text-teal-400" />;
            default: return <Bell className="w-4 h-4 text-slate-400" />;
        }
    };

    return (
        <header className={`bg-slate-800/80 backdrop-blur-sm border-b border-teal-500/10 shadow-lg transition-all duration-300 ${!isMobile && !sidebarOpen ? 'ml-[72px]' : 'ml-0'
            }`}>
            <div className="px-4 md:px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Left Side */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleSidebar}
                            className="text-white p-2 hover:bg-teal-500/20 rounded-lg transition-all hover:scale-105"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                                <span>Welcome back, {user?.username || 'Player'}!</span>
                                <Target className="w-4 h-4 text-teal-400" />
                            </h2>
                            <p className="text-slate-400 text-xs">Ready to play and win?</p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Balance Card */}
                        <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl px-3 py-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
                                <Wallet className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">Balance</p>
                                <p className="text-white font-bold">{user?.credits || user?.wallet?.balance || 0}</p>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative text-white p-2 hover:bg-teal-500/20 rounded-lg transition-all hover:scale-105"
                            >
                                <Bell className="w-6 h-6" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-800">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-xl shadow-2xl z-50 border border-teal-500/20 overflow-hidden">
                                    <div className="p-4 border-b border-teal-500/10 flex justify-between items-center bg-slate-800/50">
                                        <div className="flex items-center gap-2">
                                            <Bell className="w-5 h-5 text-teal-400" />
                                            <h3 className="text-white font-semibold">Notifications</h3>
                                        </div>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs text-teal-400 hover:text-teal-300 transition-colors hover:underline"
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center text-slate-400">
                                                <Bell className="w-12 h-12 mx-auto mb-2 text-slate-600" />
                                                <p>No notifications</p>
                                            </div>
                                        ) : (
                                            notifications.map(notif => (
                                                <div
                                                    key={notif.id}
                                                    onClick={() => markAsRead(notif.id)}
                                                    className={`p-4 border-b border-slate-700/50 cursor-pointer transition-all hover:bg-slate-700/30
                                                        ${notif.read ? 'opacity-60' : 'bg-teal-500/5'}`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="mt-1">
                                                            {getNotificationIcon(notif.type)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className={`text-sm ${notif.read ? 'text-slate-400' : 'text-white'}`}>
                                                                {notif.message}
                                                            </p>
                                                            <p className="text-slate-500 text-xs mt-1">Just now</p>
                                                        </div>
                                                        {!notif.read && (
                                                            <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Menu */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 text-white hover:bg-teal-500/20 rounded-xl px-2 py-1 transition-all hover:scale-105"
                            >
                                <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/20">
                                    <span className="text-white text-sm font-bold">
                                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                                {!isMobile && (
                                    <>
                                        <span className="text-sm font-medium hidden md:inline text-white">
                                            {user?.username}
                                        </span>
                                        <ChevronDown className="w-4 h-4 hidden md:block text-slate-400" />
                                    </>
                                )}
                            </button>

                            {/* User Dropdown Menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-xl shadow-2xl z-50 border border-teal-500/20 overflow-hidden">
                                    <div className="p-4 border-b border-teal-500/10 bg-gradient-to-r from-teal-500/10 to-cyan-500/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/20">
                                                <span className="text-white text-xl font-bold">
                                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">{user?.username}</p>
                                                <p className="text-slate-400 text-xs truncate max-w-[150px]">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <Link
                                            to="/profile"
                                            onClick={() => setShowUserMenu(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:bg-teal-500/10 hover:text-white transition-all"
                                        >
                                            <User className="w-5 h-5 text-teal-400" />
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            to="/settings"
                                            onClick={() => setShowUserMenu(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:bg-teal-500/10 hover:text-white transition-all"
                                        >
                                            <Settings className="w-5 h-5 text-cyan-400" />
                                            <span>Settings</span>
                                        </Link>
                                        <Link
                                            to="/wallet"
                                            onClick={() => setShowUserMenu(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:bg-teal-500/10 hover:text-white transition-all"
                                        >
                                            <Wallet className="w-5 h-5 text-emerald-400" />
                                            <span>Wallet</span>
                                        </Link>
                                        <div className="border-t border-teal-500/10 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-all"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
        </header>
    );
};

export default Header;