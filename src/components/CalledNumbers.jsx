import React from 'react';

const CalledNumbers = ({ calledNumbers }) => {
    const getNumberColor = (number) => {
        if (number <= 15) return 'bg-red-500';
        if (number <= 30) return 'bg-blue-500';
        if (number <= 45) return 'bg-green-500';
        if (number <= 60) return 'bg-yellow-500';
        return 'bg-purple-500';
    };

    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl">
            <h3 className="text-white text-xl font-bold text-center mb-4">
                📋 Called Numbers
            </h3>

            <div className="bg-slate-900 rounded-lg p-4 h-64 overflow-y-auto">
                {calledNumbers.length === 0 ? (
                    <div className="text-center text-slate-400 py-8">
                        No numbers called yet
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {calledNumbers.map((num, idx) => (
                            <div
                                key={idx}
                                className={`
                  ${getNumberColor(num)} 
                  text-white text-center py-2 rounded-lg font-bold text-sm
                  transition-all hover:scale-105
                `}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-slate-400 text-sm">
                Total: {calledNumbers.length} / 75 numbers
            </div>
        </div>
    );
};

export default CalledNumbers;