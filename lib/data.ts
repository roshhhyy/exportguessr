import { Country, ExportCategory } from './types';
import countryExportData from './countries-export-data.json';
import { countryCoordinates } from './coordinates';

// Parse the export data from the JSON file
export const countries: Country[] = countryExportData.map((data: any) => {
  // Find coordinates for this country
  const coords = countryCoordinates[data.code] || { latitude: 0, longitude: 0 };
  
  return {
    name: data.country,
    code: data.code,
    totalExports: parseInt(data.totalExports),
    exportCategories: data.exportCategories.map((cat: any) => ({
      name: cat.name,
      value: parseInt(cat.value),
      percentage: parseFloat(cat.percentage)
    })),
    latitude: coords.latitude,
    longitude: coords.longitude
  };
});

console.log(`Loaded ${countries.length} countries from processed export data`);

// Format export value with appropriate suffix (B for billions, M for millions)
export function formatExportValue(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`;
  } else {
    return `$${value}`;
  }
}

// Reset time constant (8pm ET)
const RESET_HOUR_ET = 20; // 8pm ET

// Helper to check if we're running in a browser
const isBrowser = typeof window !== 'undefined';

// Global game cycle constants
const CYCLE_LENGTH = countries.length; // Length of a full cycle using all countries
const START_DATE = new Date('2024-03-28'); // Start date of the first cycle

// Get the current target country based on the day
export function getTargetCountry(): Country {
  // Get the current date in ET
  const currentDate = getCurrentDateET();
  
  // Create a date string in YYYY-MM-DD format
  const dateString = formatDateForKey(currentDate);
  
  // Use the date string as our seed for country selection
  const index = getCountryIndexFromDate(dateString);
  
  // Return the selected country
  return countries[index];
}

// Format a date as YYYY-MM-DD
function formatDateForKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Get a deterministic country index from a date string
function getCountryIndexFromDate(dateString: string): number {
  // Create a seed from the date
  const dateHash = hashCode(dateString);
  
  // Map the hash to a country index (0 to countries.length - 1)
  const index = Math.abs(dateHash) % countries.length;
  
  return index;
}

// Simple string hash function
function hashCode(str: string): number {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return hash;
}

// Get current date in ET
export function getCurrentDateET(): Date {
  const now = new Date();
  
  // If it's after reset time, return today
  // Otherwise, if it's before reset time, use today
  if (isBrowser) {
    const etOptions = { timeZone: 'America/New_York' };
    const etDateStr = now.toLocaleString('en-US', etOptions);
    const etDate = new Date(etDateStr);
    
    // Check if we need to use yesterday's date (before reset time)
    if (etDate.getHours() < RESET_HOUR_ET) {
      const yesterday = new Date(etDate);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    }
    
    return etDate;
  }
  
  return now; // Default to current time if not in browser
}

// Calculate time until next reset (8pm ET)
export function getTimeUntilNextReset(): { hours: number, minutes: number, seconds: number } {
  const now = getCurrentDateET();
  const resetTime = new Date(now);
  
  // Set to today's reset time (8pm ET)
  resetTime.setHours(RESET_HOUR_ET, 0, 0, 0);
  
  // If it's already past reset time, set for next day
  if (now.getHours() >= RESET_HOUR_ET) {
    resetTime.setDate(resetTime.getDate() + 1);
  }
  
  // Calculate the difference in milliseconds
  const diffMs = resetTime.getTime() - now.getTime();
  
  // Convert to hours, minutes, seconds
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

// For testing/development only - not for production use
export function getRandomCountry(): Country {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
} 