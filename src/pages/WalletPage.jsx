import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const WalletPage = () => {
    const { user, updateUserBalance } = useAuth();
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleDeposit = () => {
        const amount = parseInt(depositAmount);
        if (amount > 0) {
            updateUserBalance(user.id, amount, 'add');
            setMessage(`Successfully deposited ${amount} credits!`);
            setDepositAmount('');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleWithdraw = () => {
        const amount = parseInt(withdrawAmount);
        if (amount > 0 && amount <= user.wallet.balance) {
            updateUserBalance(user.id, amount, 'withdraw');
            setMessage(`Successfully withdrew ${amount} credits!`);
            setWithdrawAmount('');
            setTimeout(() => setMessage(''), 3000);
        } else if (amount > user.wallet.balance) {
            setMessage('Insufficient balance!');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-white mb-8">💰 Wallet</h1>

            {message && (
                <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center">
                    {message}
                </div>
            )}

            {/* Balance Card */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-center">
                <div className="text-white text-lg mb-2">Current Balance</div>
                <div className="text-6xl font-bold text-white">{user?.wallet.balance} 💰</div>
            </div>

            {/* Deposit/Withdraw Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Deposit Credits</h3>
                    <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 mb-4"
                    />
                    <button
                        onClick={handleDeposit}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition-all"
                    >
                        Deposit
                    </button>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Withdraw Credits</h3>
                    <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 mb-4"
                    />
                    <button
                        onClick={handleWithdraw}
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-bold hover:scale-105 transition-all"
                    >
                        Withdraw
                    </button>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-slate-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">📜 Transaction History</h3>
                <div className="text-center text-slate-400 py-8">
                    Transaction history will appear here
                </div>
            </div>
        </div>
    );
};

export default WalletPage;