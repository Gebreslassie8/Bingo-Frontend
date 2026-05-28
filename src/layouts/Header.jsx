import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ toggleSidebar, user, isMobile }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Welcome to Bingo Business!', type: 'info', read: false },
        { id: 2, message: 'New daily bonus available!', type: 'success', read: false },
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

    return (
        <header className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg">
            <div className="px-4 md:px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Left Side */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleSidebar}
                            className="text-white p-2 hover:bg-slate-700 rounded-lg transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div>
                            <h2 className="text-white text-lg font-semibold">
                                Welcome back, {user?.username || 'Player'}!
                            </h2>
                            <p className="text-slate-400 text-xs">Ready to play and win?</p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Balance Card */}
                        <div className="hidden md:flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2">
                            <span className="text-yellow-400 text-xl">💰</span>
                            <div>
                                <p className="text-xs text-slate-400">Balance</p>
                                <p className="text-white font-bold">{user?.wallet?.balance || 0}</p>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative text-white p-2 hover:bg-slate-700 rounded-lg transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-xl z-50">
                                    <div className="p-3 border-b border-slate-700 flex justify-between items-center">
                                        <h3 className="text-white font-semibold">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs text-purple-400 hover:text-purple-300"
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-slate-400">
                                                No notifications
                                            </div>
                                        ) : (
                                            notifications.map(notif => (
                                                <div
                                                    key={notif.id}
                                                    onClick={() => markAsRead(notif.id)}
                                                    className={`p-3 border-b border-slate-700 cursor-pointer transition-all
                            ${notif.read ? 'opacity-60' : 'bg-slate-700 bg-opacity-30'}`}
                                                >
                                                    <p className="text-white text-sm">{notif.message}</p>
                                                    <p className="text-slate-400 text-xs mt-1">Just now</p>
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
                                className="flex items-center gap-2 text-white hover:bg-slate-700 rounded-lg px-2 py-1 transition-all"
                            >
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">
                                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                                {!isMobile && (
                                    <>
                                        <span className="text-sm font-medium hidden md:inline">
                                            {user?.username}
                                        </span>
                                        <svg className="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {/* User Dropdown Menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-lg shadow-xl z-50">
                                    <div className="p-4 border-b border-slate-700">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xl font-bold">
                                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold">{user?.username}</p>
                                                <p className="text-slate-400 text-xs">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <Link
                                            to="/profile"
                                            onClick={() => setShowUserMenu(false)}
                                            className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-700 transition-all"
                                        >
                                            <span>👤</span>
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            to="/settings"
                                            onClick={() => setShowUserMenu(false)}
                                            className="flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-700 transition-all"
                                        >
                                            <span>⚙️</span>
                                            <span>Settings</span>
                                        </Link>
                                        <div className="border-t border-slate-700 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-slate-700 transition-all"
                                        >
                                            <span>🚪</span>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;