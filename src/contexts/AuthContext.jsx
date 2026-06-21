import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Demo users
    const DEMO_USERS = {
        admin: {
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            name: 'Admin User',
            credits: 10000
        },
        player: {
            username: 'player',
            password: 'player123',
            role: 'player',
            name: 'Player User',
            credits: 1000
        }
    };

    useEffect(() => {
        // Check for saved session
        const savedUser = localStorage.getItem('bingoUser');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem('bingoUser');
            }
        }
        setLoading(false);
    }, []);

    const login = (username, password) => {
        // Check if user exists in demo users
        const userData = DEMO_USERS[username];

        if (userData && userData.password === password) {
            const { password: _, ...userWithoutPassword } = userData;
            setUser(userWithoutPassword);
            localStorage.setItem('bingoUser', JSON.stringify(userWithoutPassword));
            return { success: true, user: userWithoutPassword };
        }

        return { success: false, message: 'Invalid username or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bingoUser');
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};