import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BingoCard from '../components/BingoCard';
import NumberCaller from '../components/NumberCaller';
import CalledNumbers from '../components/CalledNumbers';

const GamePage = () => {
    const navigate = useNavigate();
    const { user, updateUserWallet, updateUserStats } = useAuth();

    const [card, setCard] = useState([]);
    const [markedNumbers, setMarkedNumbers] = useState(new Set());
    const [calledNumbers, setCalledNumbers] = useState([]);
    const [currentNumber, setCurrentNumber] = useState(null);
    const [gameActive, setGameActive] = useState(false);
    const [winner, setWinner] = useState(null);
    const [winPattern, setWinPattern] = useState(null);
    const [autoMark, setAutoMark] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);

    const gameCost = 50;
    const prizeMultiplier = 10;
    const prizeAmount = gameCost * prizeMultiplier;

    const generateCard = () => {
        const ranges = {
            B: { min: 1, max: 15 },
            I: { min: 16, max: 30 },
            N: { min: 31, max: 45 },
            G: { min: 46, max: 60 },
            O: { min: 61, max: 75 }
        };

        const newCard = [];
        const letters = ['B', 'I', 'N', 'G', 'O'];

        for (let row = 0; row < 5; row++) {
            const rowData = [];
            for (let col = 0; col < 5; col++) {
                if (row === 2 && col === 2) {
                    rowData.push({ number: 'FREE', marked: true, letter: letters[col] });
                } else {
                    const letter = letters[col];
                    const { min, max } = ranges[letter];
                    let number;
                    do {
                        number = Math.floor(Math.random() * (max - min + 1)) + min;
                    } while (newCard.some(r => r.some(c => c.number === number)) ||
                        rowData.some(c => c.number === number));

                    rowData.push({ number, marked: false, letter: letters[col] });
                }
            }
            newCard.push(rowData);
        }
        return newCard;
    };

    const checkWin = (cardData, markedSet) => {
        for (let row = 0; row < 5; row++) {
            if (cardData[row].every(cell =>
                cell.number === 'FREE' || markedSet.has(cell.number)
            )) {
                return { win: true, pattern: `Row ${row + 1}` };
            }
        }

        for (let col = 0; col < 5; col++) {
            if (cardData.every(row =>
                row[col].number === 'FREE' || markedSet.has(row[col].number)
            )) {
                return { win: true, pattern: `Column ${String.fromCharCode(66 + col)}` };
            }
        }

        const diag1 = [0, 1, 2, 3, 4].every(i =>
            cardData[i][i].number === 'FREE' || markedSet.has(cardData[i][i].number)
        );
        if (diag1) return { win: true, pattern: 'Diagonal' };

        const diag2 = [0, 1, 2, 3, 4].every(i =>
            cardData[i][4 - i].number === 'FREE' || markedSet.has(cardData[i][4 - i].number)
        );
        if (diag2) return { win: true, pattern: 'Diagonal' };

        return { win: false, pattern: null };
    };

    const startGame = () => {
        if (user.wallet.balance < gameCost) {
            alert(`Not enough credits! You need ${gameCost} credits to play. Visit the shop to buy more.`);
            navigate('/shop');
            return;
        }

        updateUserWallet(user.id, gameCost, 'spend');

        const newCard = generateCard();
        setCard(newCard);
        setMarkedNumbers(new Set());
        setCalledNumbers([]);
        setCurrentNumber(null);
        setGameActive(true);
        setWinner(null);
        setWinPattern(null);
        setGameStarted(true);
    };

    const awardPrize = () => {
        updateUserWallet(user.id, prizeAmount, 'win');
        updateUserStats(user.id, true, prizeAmount, gameCost);
    };

    const markNumber = (number) => {
        if (!gameActive || winner || number === 'FREE') return;

        const newMarked = new Set(markedNumbers);
        newMarked.add(number);
        setMarkedNumbers(newMarked);

        const result = checkWin(card, newMarked);
        if (result.win) {
            setWinner(true);
            setWinPattern(result.pattern);
            setGameActive(false);
            awardPrize();
        }
    };

    const callNumber = () => {
        if (!gameActive || winner) return;

        const remainingNumbers = [];
        for (let i = 1; i <= 75; i++) {
            if (!calledNumbers.includes(i)) {
                remainingNumbers.push(i);
            }
        }

        if (remainingNumbers.length === 0) {
            setGameActive(false);
            return;
        }

        const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        const newNumber = remainingNumbers[randomIndex];

        setCurrentNumber(newNumber);
        setCalledNumbers([newNumber, ...calledNumbers]);

        if (autoMark) {
            const numberOnCard = card.some(row =>
                row.some(cell => cell.number === newNumber)
            );
            if (numberOnCard) {
                setTimeout(() => markNumber(newNumber), 100);
            }
        }
    };

    const handleManualMark = (number) => {
        if (!gameActive || winner || number === 'FREE') return;
        markNumber(number);
    };

    if (!gameStarted) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 text-center max-w-md">
                    <div className="text-6xl mb-4">🎯</div>
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Play?</h2>
                    <div className="bg-slate-700 rounded-lg p-4 mb-6">
                        <p className="text-slate-300">Game Cost: <span className="text-yellow-400 font-bold">{gameCost} 💰</span></p>
                        <p className="text-slate-300">Prize: <span className="text-green-400 font-bold">{prizeAmount} 💰</span></p>
                        <p className="text-slate-300">Your Balance: <span className="text-yellow-400 font-bold">{user?.wallet.balance} 💰</span></p>
                    </div>
                    <button
                        onClick={startGame}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all w-full"
                    >
                        🎮 Start Game ({gameCost} credits)
                    </button>
                    {user?.wallet.balance < gameCost && (
                        <p className="text-red-400 text-sm mt-4">
                            Not enough credits! Visit the shop to buy more.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="h-full p-6">
            <div className="container mx-auto h-full flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex justify-center items-center">
                    <BingoCard
                        card={card}
                        markedNumbers={markedNumbers}
                        currentNumber={currentNumber}
                        onMarkNumber={handleManualMark}
                        gameActive={gameActive && !winner}
                    />
                </div>

                <div className="w-full lg:w-96 flex flex-col gap-4">
                    <NumberCaller
                        currentNumber={currentNumber}
                        onCallNumber={callNumber}
                        gameActive={gameActive && !winner}
                    />
                    <CalledNumbers calledNumbers={calledNumbers} />

                    {winner && (
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-center animate-bounce-slow">
                            <div className="text-4xl mb-2">🏆</div>
                            <h3 className="text-2xl font-bold text-white">BINGO!</h3>
                            <p className="text-white">You won {prizeAmount} credits!</p>
                            <button
                                onClick={() => setGameStarted(false)}
                                className="mt-4 bg-white text-green-600 px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all"
                            >
                                Play Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GamePage;