import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState(true);
    const [soundEffects, setSoundEffects] = useState(true);
    const [autoMark, setAutoMark] = useState(true);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

            <div className="bg-slate-800 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Game Preferences</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Auto-mark Numbers</p>
                            <p className="text-slate-400 text-sm">Automatically mark numbers when called</p>
                        </div>
                        <button
                            onClick={() => setAutoMark(!autoMark)}
                            className={`w-12 h-6 rounded-full transition-all ${autoMark ? 'bg-purple-500' : 'bg-slate-600'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-all transform ${autoMark ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Sound Effects</p>
                            <p className="text-slate-400 text-sm">Play sounds during gameplay</p>
                        </div>
                        <button
                            onClick={() => setSoundEffects(!soundEffects)}
                            className={`w-12 h-6 rounded-full transition-all ${soundEffects ? 'bg-purple-500' : 'bg-slate-600'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-all transform ${soundEffects ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Notifications</p>
                            <p className="text-slate-400 text-sm">Receive game and promotion notifications</p>
                        </div>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`w-12 h-6 rounded-full transition-all ${notifications ? 'bg-purple-500' : 'bg-slate-600'}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-all transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Account Settings</h3>
                <button className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all">
                    Delete Account
                </button>
                <p className="text-slate-400 text-sm mt-2 text-center">
                    This action cannot be undone
                </p>
            </div>
        </div>
    );
};

export default SettingsPage;