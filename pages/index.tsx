import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { countries, getRandomCountry, formatExportValue } from '@/lib/data';
import { createGuess } from '@/lib/game-utils';
import { GameState, Guess, Country } from '@/lib/types';
import ExportChart from '@/components/ExportChart';
import CountrySelector from '@/components/CountrySelector';
import GuessFeedback from '@/components/GuessFeedback';

const MAX_GUESSES = 5;

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    targetCountry: null,
    guesses: [],
    currentGuessIndex: 0,
    gameOver: false,
    gameWon: false,
  });
  
  const [chartDimensions, setChartDimensions] = useState({ width: 600, height: 300 });
  const chartContainerRef = useRef<HTMLDivElement>(null);
  
  // Start a new game on initial load
  useEffect(() => {
    startNewGame();
    
    // Set initial chart dimensions
    updateChartDimensions();
    
    // Add resize listener for responsive chart
    window.addEventListener('resize', updateChartDimensions);
    return () => window.removeEventListener('resize', updateChartDimensions);
  }, []);
  
  const updateChartDimensions = () => {
    if (chartContainerRef.current) {
      const width = chartContainerRef.current.offsetWidth;
      // Maintain aspect ratio
      const height = Math.min(width * 0.5, 300);
      setChartDimensions({ width, height });
    }
  };
  
  const startNewGame = () => {
    const targetCountry = getRandomCountry();
    setGameState({
      targetCountry,
      guesses: [],
      currentGuessIndex: 0,
      gameOver: false,
      gameWon: false,
    });
  };
  
  const handleGuess = (selectedCountry: Country) => {
    if (!gameState.targetCountry || gameState.gameOver) return;
    
    const guess = createGuess(selectedCountry, gameState.targetCountry);
    const newGuesses = [...gameState.guesses, guess];
    
    // Check if the guess is correct
    const isCorrect = selectedCountry.code === gameState.targetCountry.code;
    
    // Check if game is over (correct guess or max guesses reached)
    const isGameOver = isCorrect || newGuesses.length >= MAX_GUESSES;
    
    setGameState({
      ...gameState,
      guesses: newGuesses,
      currentGuessIndex: gameState.currentGuessIndex + 1,
      gameOver: isGameOver,
      gameWon: isCorrect,
    });
  };
  
  if (!gameState.targetCountry) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-12">
      <Head>
        <title>ExportGuessr - A Geography Guessing Game</title>
        <meta name="description" content="Guess countries based on their export data" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="container mx-auto px-3 md:px-4 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8">ExportGuessr</h1>
        
        {/* Game Content */}
        <div className="card mb-6 md:mb-8">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl text-gray-600 mb-1 md:mb-2">Total Exports</h2>
            <div className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              {formatExportValue(gameState.targetCountry.totalExports)}
            </div>
            
            {/* Export Categories Chart */}
            <div className="my-4 md:my-8">
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Random Exports</h3>
              <div className="h-60 md:h-80" ref={chartContainerRef}>
                <ExportChart 
                  exportCategories={gameState.targetCountry.exportCategories}
                  width={chartDimensions.width}
                  height={chartDimensions.height}
                />
              </div>
            </div>
          </div>
          
          {/* Guessing Interface */}
          <div className="mt-6 md:mt-8">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Make your guess</h3>
            
            {/* Display previous guesses */}
            {gameState.guesses.map((guess, index) => (
              <GuessFeedback key={index} guess={guess} />
            ))}
            
            {/* Game over message */}
            {gameState.gameOver && (
              <div className={`p-3 md:p-4 my-3 md:my-4 text-center rounded-lg ${gameState.gameWon ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p className="text-lg md:text-xl font-bold mb-2">
                  {gameState.gameWon 
                    ? `Correct! You guessed it in ${gameState.guesses.length} ${gameState.guesses.length === 1 ? 'try' : 'tries'}.` 
                    : `Game over! The correct answer was ${gameState.targetCountry.name}.`}
                </p>
                <button 
                  className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-3 md:mt-4"
                  onClick={startNewGame}
                >
                  Play Again
                </button>
              </div>
            )}
            
            {/* Single country search bar */}
            {!gameState.gameOver && gameState.currentGuessIndex < MAX_GUESSES && (
              <div className="my-3 md:my-4">
                <div className="text-xs md:text-sm text-gray-500 mb-2">
                  Guess {gameState.currentGuessIndex + 1} of {MAX_GUESSES} - Type to search for a country
                </div>
                <CountrySelector 
                  countries={countries}
                  onSelect={handleGuess}
                  placeholder="Type to search for a country..."
                />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="text-center text-gray-500 mt-8 md:mt-12 mb-4 md:mb-6 text-sm">
        <p>ExportGuessr - A geography guessing game about countries' exports</p>
      </footer>
    </div>
  );
} 