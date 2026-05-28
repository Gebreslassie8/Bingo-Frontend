import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
            <Navbar />

            <main className="flex-1">

                <Outlet />
                <Footer />
            </main>
        </div>
    );
};

export default PublicLayout;