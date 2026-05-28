import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
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
        <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    isOpen={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    isMobile={isMobile}
                    userRole={user?.role}
                />

                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header
                        toggleSidebar={toggleSidebar}
                        user={user}
                        isMobile={isMobile}
                    />

                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <Outlet />
                    </main>
                </div>
            </div>

            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
};

export default DashboardLayout;