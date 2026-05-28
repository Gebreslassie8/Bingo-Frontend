import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UsersPage = () => {
    const { users, updateUserStatus, updateUserBalance } = useAuth();
    const [selectedUser, setSelectedUser] = useState(null);
    const [adjustAmount, setAdjustAmount] = useState('');
    const [showAdjustModal, setShowAdjustModal] = useState(false);

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Manage Users</h1>

            <div className="bg-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-slate-300">Username</th>
                                <th className="px-6 py-3 text-left text-slate-300">Email</th>
                                <th className="px-6 py-3 text-left text-slate-300">Balance</th>
                                <th className="px-6 py-3 text-left text-slate-300">Games</th>
                                <th className="px-6 py-3 text-left text-slate-300">Status</th>
                                <th className="px-6 py-3 text-left text-slate-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b border-slate-700">
                                    <td className="px-6 py-4 text-white">{user.username}</td>
                                    <td className="px-6 py-4 text-slate-300">{user.email}</td>
                                    <td className="px-6 py-4 text-yellow-400 font-bold">{user.wallet.balance} 💰</td>
                                    <td className="px-6 py-4 text-white">{user.stats.gamesPlayed}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {user.isActive ? 'Active' : 'Suspended'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setShowAdjustModal(true);
                                            }}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm mr-2"
                                        >
                                            Adjust
                                        </button>
                                        <button
                                            onClick={() => updateUserStatus(user.id, !user.isActive)}
                                            className={`${user.isActive ? 'bg-red-500' : 'bg-green-500'} text-white px-3 py-1 rounded-lg text-sm`}
                                        >
                                            {user.isActive ? 'Suspend' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showAdjustModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">Adjust Balance</h3>
                        <p className="text-slate-300 mb-2">User: {selectedUser.username}</p>
                        <p className="text-slate-300 mb-4">Current Balance: {selectedUser.wallet.balance} 💰</p>
                        <input
                            type="number"
                            value={adjustAmount}
                            onChange={(e) => setAdjustAmount(e.target.value)}
                            placeholder="Enter amount (negative to deduct)"
                            className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 mb-4"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    updateUserBalance(selectedUser.id, parseInt(adjustAmount), parseInt(adjustAmount) > 0 ? 'add' : 'withdraw');
                                    setShowAdjustModal(false);
                                    setAdjustAmount('');
                                }}
                                className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowAdjustModal(false)}
                                className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;