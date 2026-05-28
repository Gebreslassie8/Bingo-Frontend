import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import FeaturesPage from './pages/FeaturesPage';
import HowToPlayPage from './pages/HowToPlayPage';
import PricingPage from './pages/PricingPage';
// Dashboard Pages
import AdminDashboard from './Admin/AdminDashboard';
import Reports from "./Admin/Reports";
import UserDashboard from './Users/UserDashboard';
import GamePage from './pages/GamePage';
import ShopPage from './pages/ShopPage';
import WalletPage from './pages/WalletPage';
import UsersPage from './Users/UsersPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
// Components
import PrivateRoute from './auth/PrivateRoute';
//import AdminRoute from './auth/AdminRoute';
function AppContent() {
  const { user, isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes with Public Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Dashboard Routes */}
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

      {/* Admin Routes */}
      {/* <Route element={<AdminRoute />}> */}
      <Route element={<DashboardLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/settings" element={<SettingsPage />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;