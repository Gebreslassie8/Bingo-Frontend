import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const PublicLayout = () => {
    return (
        // Fill parent (#root) height, column flex
        <div className="flex flex-col h-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
            <Navbar />

            {/* Scrollable content area – pushes footer down naturally */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>

        </div>
    );
};

export default PublicLayout;