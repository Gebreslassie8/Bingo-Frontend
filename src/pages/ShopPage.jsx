import React, { useState } from 'react';

const ShopPage = ({ credits, buyCredits }) => {
    const [selectedPackage, setSelectedPackage] = useState(null);

    const packages = [
        { id: 1, credits: 100, price: 100, icon: '💎', color: 'from-blue-500 to-cyan-500', bonus: 0 },
        { id: 2, credits: 500, price: 500, icon: '💎💎', color: 'from-green-500 to-emerald-500', bonus: 50, bonusText: '+50 FREE' },
        { id: 3, credits: 1000, price: 1000, icon: '💎💎💎', color: 'from-purple-500 to-pink-500', bonus: 150, bonusText: '+150 FREE' },
        { id: 4, credits: 5000, price: 5000, icon: '👑', color: 'from-yellow-500 to-orange-500', bonus: 1000, bonusText: '+1000 FREE' },
        { id: 5, credits: 10000, price: 10000, icon: '🏆', color: 'from-red-500 to-pink-500', bonus: 2500, bonusText: '+2500 FREE' },
    ];

    const handlePurchase = (pkg) => {
        const totalCredits = pkg.credits + pkg.bonus;
        buyCredits(totalCredits);
        setSelectedPackage(pkg.id);
        setTimeout(() => setSelectedPackage(null), 2000);
    };

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">🛒 Credit Shop</h1>
                <p className="text-xl text-slate-300">Buy credits to play more games and win bigger prizes!</p>
                <div className="inline-block bg-slate-800 rounded-lg px-6 py-2 mt-4">
                    <span className="text-slate-400">Your Balance: </span>
                    <span className="text-2xl font-bold text-yellow-400">{credits} 💰</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`bg-gradient-to-br ${pkg.color} rounded-2xl p-6 text-center cursor-pointer transition-all hover:scale-105 shadow-xl ${selectedPackage === pkg.id ? 'animate-pulse-gold' : ''
                            }`}
                        onClick={() => handlePurchase(pkg)}
                    >
                        <div className="text-5xl mb-3">{pkg.icon}</div>
                        <div className="text-3xl font-bold text-white">{pkg.credits}</div>
                        <div className="text-white text-sm">Credits</div>
                        {pkg.bonus > 0 && (
                            <div className="bg-yellow-400 text-slate-900 text-xs font-bold rounded-full px-2 py-1 mt-2 inline-block">
                                {pkg.bonusText}
                            </div>
                        )}
                        <div className="mt-4 text-white font-bold">{pkg.price} 💰</div>
                        <button className="mt-4 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-opacity-30 transition-all w-full">
                            Purchase
                        </button>
                    </div>
                ))}
            </div>

            {/* Special Offers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="text-5xl">🎁</div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">Daily Bonus</h3>
                            <p className="text-white">Claim your free 50 credits every day!</p>
                            <button className="mt-3 bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all">
                                Claim Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="text-5xl">⭐</div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">VIP Membership</h3>
                            <p className="text-white">Get 20% more credits on all purchases!</p>
                            <button className="mt-3 bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History Placeholder */}
            <div className="bg-slate-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">📜 Recent Transactions</h3>
                <div className="text-center text-slate-400 py-8">
                    Your purchase history will appear here
                </div>
            </div>
        </div>
    );
};

export default ShopPage;