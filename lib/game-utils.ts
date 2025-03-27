import { getDistance, getRhumbLineBearing } from 'geolib';
import { Country, Direction, Guess } from './types';

export function calculateDistance(
  countryA: Country,
  countryB: Country
): number {
  return getDistance(
    { latitude: countryA.latitude, longitude: countryA.longitude },
    { latitude: countryB.latitude, longitude: countryB.longitude }
  ) / 1000; // Convert to kilometers
}

export function calculateDirection(
  sourceCountry: Country,
  targetCountry: Country
): Direction {
  // Get the bearing in degrees (0-360) using rhumb line bearing
  // This is more accurate for global navigation
  const bearing = getRhumbLineBearing(
    { latitude: sourceCountry.latitude, longitude: sourceCountry.longitude },
    { latitude: targetCountry.latitude, longitude: targetCountry.longitude }
  );
  
  // Convert bearing to 8-point compass direction
  if (bearing >= 337.5 || bearing < 22.5) return 'N';
  if (bearing >= 22.5 && bearing < 67.5) return 'NE';
  if (bearing >= 67.5 && bearing < 112.5) return 'E';
  if (bearing >= 112.5 && bearing < 157.5) return 'SE';
  if (bearing >= 157.5 && bearing < 202.5) return 'S';
  if (bearing >= 202.5 && bearing < 247.5) return 'SW';
  if (bearing >= 247.5 && bearing < 292.5) return 'W';
  if (bearing >= 292.5 && bearing < 337.5) return 'NW';
  
  // Default fallback (should never reach here)
  return 'N';
}

export function calculateExportDifference(
  guessedCountry: Country,
  targetCountry: Country
): number {
  return ((guessedCountry.totalExports - targetCountry.totalExports) / targetCountry.totalExports) * 100;
}

export function createGuess(
  guessedCountry: Country,
  targetCountry: Country
): Guess {
  const distance = calculateDistance(guessedCountry, targetCountry);
  // Direction FROM the guess TO the target
  const direction = calculateDirection(guessedCountry, targetCountry);
  const exportDifference = calculateExportDifference(guessedCountry, targetCountry);
  
  // Debug info to help troubleshoot
  console.log(`Direction from ${guessedCountry.name} to ${targetCountry.name}: ${direction}`);
  console.log(`${guessedCountry.name}: ${guessedCountry.latitude}, ${guessedCountry.longitude}`);
  console.log(`${targetCountry.name}: ${targetCountry.latitude}, ${targetCountry.longitude}`);
  
  return {
    country: guessedCountry,
    distance,
    direction,
    exportDifference,
  };
} 