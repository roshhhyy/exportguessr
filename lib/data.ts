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