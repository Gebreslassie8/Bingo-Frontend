import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950/30 to-slate-900">
            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar - Fixed position with smooth transitions */}
                <Sidebar
                    isOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    isMobile={isMobile}
                    userRole={user?.role}
                />

                {/* Main Content Area - Adjusts based on sidebar state */}
                <div
                    className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out
                        ${!isMobile && !sidebarOpen ? 'ml-[72px]' : 'ml-0'}
                        ${isMobile && sidebarOpen ? 'opacity-50' : 'opacity-100'}
                    `}
                >
                    {/* Header with sidebar state */}
                    <Header
                        toggleSidebar={toggleSidebar}
                        user={user}
                        isMobile={isMobile}
                        sidebarOpen={sidebarOpen}
                    />

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </main>
                </div>

                {/* Mobile Overlay with blur effect */}
                <AnimatePresence>
                    {isMobile && sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
                            onClick={toggleSidebar}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DashboardLayout;