import { Country } from './types';
import { countryCoordinates } from './coordinates';

// Import the processed data directly
// Next.js doesn't allow direct use of fs in client components
import sampleData from './countries-export-data.json';

// Process the data - convert country codes to uppercase and apply coordinates
const processedData: Country[] = sampleData.map((country: any) => {
  const countryCode = country.code.toUpperCase();
  const coordinates = countryCoordinates[countryCode] || { latitude: 0, longitude: 0 };
  
  return {
    ...country,
    code: countryCode,
    // Use coordinates from our database
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    // Round percentages to 1 decimal point
    exportCategories: country.exportCategories.map((category: any) => ({
      ...category,
      percentage: Math.round(category.percentage * 10) / 10
    }))
  };
});

// Sort all countries by export value but use all of them
const allCountries = processedData
  .sort((a: Country, b: Country) => b.totalExports - a.totalExports);

console.log(`Loaded ${allCountries.length} countries from processed export data`);

export { allCountries as countries };

export function getRandomCountry(): Country {
  const randomIndex = Math.floor(Math.random() * allCountries.length);
  return allCountries[randomIndex];
}

// Get daily country that changes at 8pm ET for all players globally
export function getDailyCountry(): Country {
  // Calculate the current time in ET (Eastern Time)
  const now = new Date();
  
  // Convert to ET (UTC-4 or UTC-5 depending on daylight savings)
  // For simplicity, we'll use a fixed offset of UTC-4 (can be refined later)
  const etOffset = -4 * 60 * 60 * 1000; // 4 hours in milliseconds
  const localOffset = now.getTimezoneOffset() * 60 * 1000;
  const etTime = new Date(now.getTime() + etOffset + localOffset);
  
  // If it's before 8pm ET, use yesterday's date
  const etHours = etTime.getHours();
  const useYesterday = etHours < 20;
  const targetDate = new Date(etTime);
  if (useYesterday) {
    targetDate.setDate(targetDate.getDate() - 1);
  }
  
  // Create a string in format YYYY-MM-DD to use as seed
  const dateString = targetDate.toISOString().split('T')[0];
  
  // Use the date string to create a deterministic index
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Use absolute value of hash to get a valid index
  const index = Math.abs(hash) % allCountries.length;
  return allCountries[index];
}

export function formatExportValue(value: number): string {
  if (value >= 1000000000000) {
    return `$${(value / 1000000000000).toFixed(2)}T`;
  } else if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else {
    return `$${value.toLocaleString()}`;
  }
} 