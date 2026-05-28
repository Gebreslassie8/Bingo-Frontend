import React from 'react';

const GameControls = ({ onNewGame, gameActive, winner }) => {
    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-xl">
            <button
                onClick={onNewGame}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 
                   hover:from-green-600 hover:to-emerald-700 text-white font-bold 
                   rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
                🎮 New Game
            </button>

            {winner && (
                <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg animate-bounce-slow">
                    <p className="text-center font-bold text-slate-900">
                        🏆 WINNER! Play again? 🏆
                    </p>
                </div>
            )}

            {!gameActive && !winner && (
                <div className="mt-4 p-3 bg-red-500 rounded-lg">
                    <p className="text-center font-bold text-white">
                        Game Over! No more numbers.
                    </p>
                </div>
            )}
        </div>
    );
};

export default GameControls;