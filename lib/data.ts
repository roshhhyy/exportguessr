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

// Get the current target country based on the day
export function getTargetCountry(): Country {
  // If we're not in a browser (e.g., during SSR), return a random country
  if (!isBrowser) {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
  }
  
  // Check if we need to reset the used countries list
  checkAndResetUsedCountries();
  
  // Get the current date in ET
  const currentDate = getCurrentDateET();
  
  // Create a date string in YYYY-MM-DD format to use as our seed
  const dateString = currentDate.toISOString().split('T')[0];

  // Get the list of used countries from localStorage
  const usedCountries = getUsedCountries();
  
  // Filter out the used countries
  const availableCountries = countries.filter(country => !usedCountries.includes(country.code));
  
  // If all countries have been used (this shouldn't happen due to the reset logic)
  if (availableCountries.length === 0) {
    // Reset the used countries and try again
    if (isBrowser) {
      localStorage.removeItem('exportGuessr-usedCountries');
    }
    return getTargetCountry();
  }
  
  // Use the date string to create a deterministic selection
  const dateHash = hashCode(dateString);
  const index = Math.abs(dateHash) % availableCountries.length;
  const selectedCountry = availableCountries[index];
  
  // Add this country to the used list
  saveUsedCountry(selectedCountry.code);
  
  return selectedCountry;
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
  // Convert to ET (UTC-4 or UTC-5 depending on daylight saving time)
  // Use browser's built-in time zone conversion
  if (isBrowser) {
    const etOptions = { timeZone: 'America/New_York' };
    const etDateStr = now.toLocaleString('en-US', etOptions);
    return new Date(etDateStr);
  }
  return now; // Default to current time if not in browser
}

// Check if we need to reset based on current time
function checkAndResetUsedCountries(): void {
  if (!isBrowser) return;
  
  const lastResetDate = localStorage.getItem('exportGuessr-lastReset');
  
  if (!lastResetDate) {
    // First time running - no need to reset
    localStorage.setItem('exportGuessr-lastReset', getCurrentDateET().toISOString());
    return;
  }
  
  const lastReset = new Date(lastResetDate);
  const currentDate = getCurrentDateET();
  
  // Calculate if we've used all countries
  const usedCountries = getUsedCountries();
  const allCountriesUsed = usedCountries.length >= countries.length;
  
  // Reset if all countries have been used
  if (allCountriesUsed) {
    localStorage.removeItem('exportGuessr-usedCountries');
    localStorage.setItem('exportGuessr-lastReset', currentDate.toISOString());
    return;
  }
}

// Get the list of used countries from localStorage
function getUsedCountries(): string[] {
  if (!isBrowser) return [];
  
  const usedCountriesStr = localStorage.getItem('exportGuessr-usedCountries');
  return usedCountriesStr ? JSON.parse(usedCountriesStr) : [];
}

// Save a country as used
function saveUsedCountry(countryCode: string): void {
  if (!isBrowser) return;
  
  const usedCountries = getUsedCountries();
  if (!usedCountries.includes(countryCode)) {
    usedCountries.push(countryCode);
    localStorage.setItem('exportGuessr-usedCountries', JSON.stringify(usedCountries));
  }
}

// Calculate time until next reset (8pm ET)
export function getTimeUntilNextReset(): { hours: number, minutes: number, seconds: number } {
  const now = getCurrentDateET();
  const resetTime = new Date(now);
  
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