import React from 'react';
import { Guess } from '@/lib/types';
import { formatExportValue } from '@/lib/data';

interface GuessFeedbackProps {
  guess: Guess;
}

export default function GuessFeedback({ guess }: GuessFeedbackProps) {
  const { country, distance, direction, exportDifference } = guess;
  
  // Get the appropriate arrow symbol for the direction
  const getDirectionArrow = (dir: string) => {
    switch (dir) {
      case 'N': return '↑';
      case 'NE': return '↗';
      case 'E': return '→';
      case 'SE': return '↘';
      case 'S': return '↓';
      case 'SW': return '↙';
      case 'W': return '←';
      case 'NW': return '↖';
      default: return '•';
    }
  };
  
  // Format the export difference for display
  const formatExportDiff = (diff: number): string => {
    const absPercent = Math.abs(diff).toFixed(1);
    if (diff > 0) {
      return `${absPercent}% higher`;
    } else if (diff < 0) {
      return `${absPercent}% lower`;
    } else {
      return 'Same exports';
    }
  };
  
  // Debug info - will remove in final version
  console.log(`Country: ${country.name}, Lat: ${country.latitude}, Long: ${country.longitude}, Direction: ${direction}`);
  
  return (
    <div className="p-3 md:p-4 my-2 border rounded-lg shadow-sm bg-white">
      <div className="font-bold text-base md:text-lg mb-2">{country.name}</div>
      
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {/* Distance */}
        <div className="text-center">
          <div className="text-xs md:text-sm text-gray-500">Distance</div>
          <div className="text-sm md:text-lg font-semibold">
            {Math.round(distance).toLocaleString()} km
          </div>
        </div>
        
        {/* Direction */}
        <div className="text-center">
          <div className="text-xs md:text-sm text-gray-500">Direction</div>
          <div className="text-xl md:text-2xl font-bold">
            {getDirectionArrow(direction)} <span className="text-xs md:text-base">{direction}</span>
          </div>
        </div>
        
        {/* Export Difference */}
        <div className="text-center">
          <div className="text-xs md:text-sm text-gray-500">Exports</div>
          <div className={`text-sm md:text-lg font-semibold ${
            exportDifference > 0 
              ? 'text-red-500' 
              : exportDifference < 0 
                ? 'text-green-500' 
                : 'text-gray-800'
          }`}>
            {formatExportDiff(exportDifference)}
          </div>
        </div>
      </div>
    </div>
  );
} 