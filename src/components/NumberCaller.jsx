import React from 'react';

const NumberCaller = ({ currentNumber, onCallNumber, gameActive }) => {
    const getLetterAndColor = (number) => {
        if (!number) return { letter: '?', color: 'bg-gray-600' };
        if (number <= 15) return { letter: 'B', color: 'bg-red-500' };
        if (number <= 30) return { letter: 'I', color: 'bg-blue-500' };
        if (number <= 45) return { letter: 'N', color: 'bg-green-500' };
        if (number <= 60) return { letter: 'G', color: 'bg-yellow-500' };
        return { letter: 'O', color: 'bg-purple-500' };
    };

    const { letter, color } = getLetterAndColor(currentNumber);

    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl">
            <h3 className="text-white text-xl font-bold text-center mb-4">
                🎲 Number Caller
            </h3>

            <div className="bg-slate-900 rounded-lg p-6 mb-4">
                {currentNumber ? (
                    <div className="text-center">
                        <div className={`${color} text-white text-3xl md:text-4xl font-bold py-3 px-6 rounded-lg inline-block mb-3 shadow-lg`}>
                            {letter}
                        </div>
                        <div className="text-white text-5xl md:text-6xl font-bold">
                            {currentNumber}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-slate-400 text-xl py-8">
                        Ready to play!
                    </div>
                )}
            </div>

            <button
                onClick={onCallNumber}
                disabled={!gameActive}
                className={`
          w-full py-3 px-4 rounded-lg font-bold text-white transition-all
          ${gameActive
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 cursor-pointer'
                        : 'bg-gray-600 cursor-not-allowed'}
          shadow-lg
        `}
            >
                {gameActive ? '🎯 Call Next Number' : 'Game Over'}
            </button>
        </div>
    );
};

export default NumberCaller;