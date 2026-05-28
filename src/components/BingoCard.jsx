import React from 'react';
import { motion } from 'framer-motion';

const BingoCard = ({ card, markedNumbers, currentNumber, onMarkNumber, gameActive }) => {
    const letters = ['B', 'I', 'N', 'G', 'O'];

    const getLetterColor = (letter) => {
        const colors = {
            B: 'from-red-500 to-red-600',
            I: 'from-blue-500 to-blue-600',
            N: 'from-green-500 to-green-600',
            G: 'from-yellow-500 to-yellow-600',
            O: 'from-purple-500 to-purple-600'
        };
        return colors[letter];
    };

    const getCellClasses = (cell, isMarked, isHighlighted) => {
        let classes = 'bingo-cell ';

        // Base responsive sizes
        classes += 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ';

        // Text sizes
        classes += 'text-sm sm:text-base md:text-lg lg:text-xl ';

        if (cell.number === 'FREE') {
            classes += 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 text-xs sm:text-sm font-semibold hover:from-amber-200 hover:to-amber-300 ';
        } else if (isMarked) {
            classes += 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white scale-95 shadow-lg ';
        } else if (!gameActive) {
            classes += 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60 ';
        } else {
            classes += 'bg-white hover:bg-gray-50 hover:scale-105 shadow-md hover:shadow-xl transition-all duration-200 ';
        }

        if (isHighlighted && !isMarked && cell.number !== 'FREE') {
            classes += 'ring-4 ring-yellow-400 ring-opacity-75 animate-pulse bg-gradient-to-br from-yellow-300 to-yellow-400 text-white ';
        }

        return classes;
    };

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const cellVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.2 }
        },
        marked: {
            scale: [1, 0.95, 1],
            transition: { duration: 0.3 }
        }
    };

    if (!card.length) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Loading your bingo card...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative"
        >
            {/* Decorative Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 p-3 sm:p-4 md:p-5 lg:p-6 rounded-2xl shadow-2xl">

                {/* Header Row */}
                <div className="grid grid-cols-5 gap-1 sm:gap-1.5 md:gap-2 mb-1 sm:mb-1.5 md:mb-2">
                    {letters.map((letter, idx) => (
                        <motion.div
                            key={letter}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bg-gradient-to-br ${getLetterColor(letter)} text-white font-extrabold text-center py-2 sm:py-2.5 md:py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300`}
                        >
                            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">{letter}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Card Body */}
                <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                    {card.map((row, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-5 gap-1 sm:gap-1.5 md:gap-2">
                            {row.map((cell, colIndex) => {
                                const isMarked = cell.number === 'FREE' || markedNumbers.has(cell.number);
                                const isHighlighted = currentNumber === cell.number;

                                return (
                                    <motion.button
                                        key={colIndex}
                                        onClick={() => onMarkNumber(cell.number)}
                                        disabled={!gameActive || isMarked || cell.number === 'FREE'}
                                        variants={cellVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={!isMarked && gameActive && cell.number !== 'FREE' ? { scale: 1.05 } : {}}
                                        whileTap={!isMarked && gameActive && cell.number !== 'FREE' ? { scale: 0.95 } : {}}
                                        className={getCellClasses(cell, isMarked, isHighlighted)}
                                    >
                                        <span className="relative z-10 font-bold">
                                            {cell.number !== 'FREE' ? cell.number : 'FREE'}
                                        </span>

                                        {/* Marked Animation Overlay */}
                                        {isMarked && cell.number !== 'FREE' && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute inset-0 bg-green-500 rounded-lg opacity-20"
                                            />
                                        )}

                                        {/* Current Number Pulse Effect */}
                                        {isHighlighted && !isMarked && cell.number !== 'FREE' && (
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1.2, opacity: 0.3 }}
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                                className="absolute inset-0 bg-yellow-400 rounded-lg"
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Card Footer - Game Status */}
                <div className="mt-4 sm:mt-5 md:mt-6 text-center">
                    {gameActive ? (
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-1.5">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white text-xs sm:text-sm font-medium">Game in Progress</span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-1.5">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
                            <span className="text-white text-xs sm:text-sm font-medium">Game Ended</span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BingoCard;