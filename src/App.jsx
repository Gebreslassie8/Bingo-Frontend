import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';  // ← add Outlet

// Public components
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
// Dashboard layout
import DashboardLayout from './layouts/DashboardLayout';
// Public pages
import HomePage from './pages/HomePage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import FeaturesPage from './pages/FeaturesPage';
import HowToPlayPage from './pages/HowToPlayPage';
import PricingPage from './pages/PricingPage';
// Dashboard pages
import AdminDashboard from './Admin/AdminDashboard';
import Reports from './Admin/Reports';
import WalletManagement from './Admin/WalletManagement';
import UserWallet from './Users/UserWallet';
import UserDashboard from './Users/UserDashboard';
import GamePage from './pages/GamePage';
import ShopPage from './pages/ShopPage';
import WalletPage from './pages/WalletPage';
import UsersPage from './Users/UsersPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
// Auth
import PrivateRoute from './auth/PrivateRoute';

// Public wrapper: adds global navbar + footer to public routes
const PublicWrapper = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">
      <Outlet />   {/* ← now defined */}
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public routes with navbar + footer */}
      <Route element={<PublicWrapper />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected dashboard routes (no extra navbar/footer) */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Admin routes (also use DashboardLayout) */}
      <Route element={<DashboardLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/admin/reports" element={<Reports />} />

        <Route path="/admin/wallet" element={<WalletManagement />} />
        <Route path="/wallet" element={<UserWallet />} />
      </Route>
    </Routes>
  );
}

export default App;