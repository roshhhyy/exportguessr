import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { countries, getRandomCountry, getDailyCountry, formatExportValue } from '@/lib/data';
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
  const [nextCountryTime, setNextCountryTime] = useState<string>('');
  const [shareMessage, setShareMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);
  
  // Start a new game on initial load
  useEffect(() => {
    startNewGame();
    
    // Set initial chart dimensions
    updateChartDimensions();
    
    // Add resize listener for responsive chart
    window.addEventListener('resize', updateChartDimensions);
    
    // Update the countdown timer
    updateNextCountryTime();
    const timer = setInterval(updateNextCountryTime, 60000); // Update every minute
    
    return () => {
      window.removeEventListener('resize', updateChartDimensions);
      clearInterval(timer);
    };
  }, []);
  
  const updateNextCountryTime = () => {
    const now = new Date();
    
    // Convert to ET (Eastern Time)
    const etOffset = -4 * 60 * 60 * 1000; // 4 hours in milliseconds
    const localOffset = now.getTimezoneOffset() * 60 * 1000;
    const etTime = new Date(now.getTime() + etOffset + localOffset);
    
    // Create next reset time (8pm ET today)
    const resetTime = new Date(etTime);
    resetTime.setHours(20, 0, 0, 0);
    
    // If it's past 8pm, set to 8pm tomorrow
    if (etTime > resetTime) {
      resetTime.setDate(resetTime.getDate() + 1);
    }
    
    // Calculate time difference
    const diffMs = resetTime.getTime() - etTime.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    setNextCountryTime(`${diffHrs}h ${diffMins}m`);
  };
  
  const updateChartDimensions = () => {
    if (chartContainerRef.current) {
      const width = chartContainerRef.current.offsetWidth;
      // Maintain aspect ratio but ensure minimum height
      const height = Math.max(Math.min(width * 0.5, 300), 150);
      setChartDimensions({ width, height });
    }
  };
  
  const startNewGame = () => {
    const targetCountry = getDailyCountry();
    setGameState({
      targetCountry,
      guesses: [],
      currentGuessIndex: 0,
      gameOver: false,
      gameWon: false,
    });
    setCopied(false);
    setShareMessage('');
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
    
    // Generate share message if game is over
    if (isGameOver) {
      generateShareMessage(newGuesses, isCorrect, gameState.targetCountry);
    }
  };
  
  const generateShareMessage = (guesses: Guess[], won: boolean, targetCountry: Country) => {
    // Get current date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Create header
    let message = `ExportGuessr ${dateStr}\n`;
    
    // Add result summary (X/Y or fail) without revealing the country name
    if (won) {
      message += `${guesses.length}/${MAX_GUESSES}\n\n`;
    } else {
      message += `X/${MAX_GUESSES}\n\n`;
    }
    
    // Create emoji grid for guesses without country names
    guesses.forEach(guess => {
      // Calculate distance tiers (closer = more green squares)
      let distanceEmoji = '🟥'; // far
      if (guess.distance === 0) {
        distanceEmoji = '🟩'; // correct
      } else if (guess.distance < 500) {
        distanceEmoji = '🟨'; // close
      } else if (guess.distance < 2000) {
        distanceEmoji = '🟧'; // medium
      }
      
      // Add direction emoji if not correct guess
      let directionEmoji = '';
      if (guess.distance > 0) {
        switch(guess.direction) {
          case 'N': directionEmoji = '⬆️'; break;
          case 'NE': directionEmoji = '↗️'; break;
          case 'E': directionEmoji = '➡️'; break;
          case 'SE': directionEmoji = '↘️'; break;
          case 'S': directionEmoji = '⬇️'; break;
          case 'SW': directionEmoji = '↙️'; break;
          case 'W': directionEmoji = '⬅️'; break;
          case 'NW': directionEmoji = '↖️'; break;
        }
      }
      
      message += `${distanceEmoji} ${directionEmoji}\n`;
    });
    
    // Add link to the game
    message += `\nhttps://exportguessr.vercel.app/`;
    
    setShareMessage(message);
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
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
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 md:mb-4">ExportGuessr</h1>
        
        {/* Next country timer */}
        <div className="text-center text-gray-600 text-sm md:text-base mb-4 md:mb-6">
          Next country in: <span className="font-semibold">{nextCountryTime}</span>
        </div>
        
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
              <div className="h-60 md:h-80 w-full px-1 md:px-0 overflow-hidden" ref={chartContainerRef}>
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
                
                {/* Share results section */}
                <div className="mt-3 md:mt-4">
                  <button 
                    className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    onClick={copyToClipboard}
                  >
                    {copied ? 'Copied!' : 'Share Results'}
                  </button>
                  
                  {shareMessage && (
                    <div className="mt-4 text-left bg-gray-100 p-3 rounded-md text-sm font-mono whitespace-pre-wrap">
                      {shareMessage}
                    </div>
                  )}
                  
                  <button 
                    className="btn bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md mt-3 ml-2"
                    onClick={() => window.location.reload()}
                  >
                    Play Again
                  </button>
                </div>
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