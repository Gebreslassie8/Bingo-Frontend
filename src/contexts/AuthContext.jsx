import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('bingoUsers');
        if (saved) {
            return JSON.parse(saved);
        }
        // Create default admin account
        return [
            {
                id: uuidv4(),
                username: 'admin',
                password: 'admin123',
                email: 'admin@bingo.com',
                role: 'admin',
                wallet: {
                    balance: 100000,
                    totalDeposited: 100000,
                    totalWithdrawn: 0,
                    totalWon: 0,
                    totalSpent: 0
                },
                stats: {
                    gamesPlayed: 0,
                    gamesWon: 0,
                    totalWinnings: 0,
                    totalSpent: 0
                },
                createdAt: new Date().toISOString(),
                isActive: true
            },
            // Demo player account
            {
                id: uuidv4(),
                username: 'player',
                password: 'player123',
                email: 'player@example.com',
                role: 'player',
                wallet: {
                    balance: 1000,
                    totalDeposited: 500,
                    totalWithdrawn: 0,
                    totalWon: 0,
                    totalSpent: 0
                },
                stats: {
                    gamesPlayed: 0,
                    gamesWon: 0,
                    totalWinnings: 0,
                    totalSpent: 0
                },
                createdAt: new Date().toISOString(),
                isActive: true
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('bingoUsers', JSON.stringify(users));
    }, [users]);

    const login = (username, password) => {
        const foundUser = users.find(
            u => u.username === username && u.password === password && u.isActive
        );

        if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            return { success: true, user: userWithoutPassword };
        }
        return { success: false, message: 'Invalid username or password' };
    };

    const register = (username, password, email) => {
        // Check if user exists
        if (users.find(u => u.username === username)) {
            return { success: false, message: 'Username already exists' };
        }

        const newUser = {
            id: uuidv4(),
            username,
            password,
            email,
            role: 'player',
            wallet: {
                balance: 500, // Starting bonus
                totalDeposited: 0,
                totalWithdrawn: 0,
                totalWon: 0,
                totalSpent: 0
            },
            stats: {
                gamesPlayed: 0,
                gamesWon: 0,
                totalWinnings: 0,
                totalSpent: 0
            },
            createdAt: new Date().toISOString(),
            isActive: true
        };

        setUsers([...users, newUser]);
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateUserWallet = (userId, amount, type) => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.map(user => {
                if (user.id === userId) {
                    const newBalance = type === 'add' || type === 'win'
                        ? user.wallet.balance + amount
                        : user.wallet.balance - amount;

                    const updatedWallet = { ...user.wallet, balance: newBalance };

                    if (type === 'add') {
                        updatedWallet.totalDeposited += amount;
                    } else if (type === 'withdraw') {
                        updatedWallet.totalWithdrawn += amount;
                    } else if (type === 'win') {
                        updatedWallet.totalWon += amount;
                    } else if (type === 'spend') {
                        updatedWallet.totalSpent += amount;
                    }

                    return { ...user, wallet: updatedWallet };
                }
                return user;
            });

            localStorage.setItem('bingoUsers', JSON.stringify(updatedUsers));

            // Update current user
            if (user && user.id === userId) {
                const updatedUser = updatedUsers.find(u => u.id === userId);
                const { password: _, ...userWithoutPassword } = updatedUser;
                setUser(userWithoutPassword);
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            }

            return updatedUsers;
        });
    };

    const updateUserStats = (userId, gameWon, winnings, cost) => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.map(user => {
                if (user.id === userId) {
                    return {
                        ...user,
                        stats: {
                            gamesPlayed: user.stats.gamesPlayed + 1,
                            gamesWon: user.stats.gamesWon + (gameWon ? 1 : 0),
                            totalWinnings: user.stats.totalWinnings + (gameWon ? winnings : 0),
                            totalSpent: user.stats.totalSpent + cost
                        }
                    };
                }
                return user;
            });

            localStorage.setItem('bingoUsers', JSON.stringify(updatedUsers));

            // Update current user
            if (user && user.id === userId) {
                const updatedUser = updatedUsers.find(u => u.id === userId);
                const { password: _, ...userWithoutPassword } = updatedUser;
                setUser(userWithoutPassword);
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            }

            return updatedUsers;
        });
    };

    const getAllUsers = () => {
        return users.map(({ password, ...user }) => user);
    };

    const updateUserStatus = (userId, isActive) => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.map(user =>
                user.id === userId ? { ...user, isActive } : user
            );
            localStorage.setItem('bingoUsers', JSON.stringify(updatedUsers));
            return updatedUsers;
        });
    };

    const updateUserBalance = (userId, amount, type) => {
        updateUserWallet(userId, amount, type);
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const value = {
        user,
        users: getAllUsers(),
        login,
        register,
        logout,
        updateUserWallet,
        updateUserStats,
        updateUserStatus,
        updateUserBalance,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};