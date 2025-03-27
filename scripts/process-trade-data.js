const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

// Input and output file paths
const inputCsvPath = path.join(__dirname, '..', 'trade_i_baci_a_92.csv', 'trade_i_baci_a_92.csv');
const outputJsonPath = path.join(__dirname, '..', 'lib', 'countries-export-data.json');
const outputCsvPath = path.join(__dirname, '..', 'lib', 'countries-export-data.csv');

// Country coordinates - hardcoded for efficiency
const countryCoordinates = {
  'usa': { latitude: 37.0902, longitude: -95.7129 },
  'us': { latitude: 37.0902, longitude: -95.7129 },
  'chn': { latitude: 35.8617, longitude: 104.1954 },
  'cn': { latitude: 35.8617, longitude: 104.1954 },
  'deu': { latitude: 51.1657, longitude: 10.4515 },
  'de': { latitude: 51.1657, longitude: 10.4515 },
  'jpn': { latitude: 36.2048, longitude: 138.2529 },
  'jp': { latitude: 36.2048, longitude: 138.2529 },
  'gbr': { latitude: 55.3781, longitude: -3.4360 },
  'gb': { latitude: 55.3781, longitude: -3.4360 },
  'uk': { latitude: 55.3781, longitude: -3.4360 },
  'fra': { latitude: 46.2276, longitude: 2.2137 },
  'fr': { latitude: 46.2276, longitude: 2.2137 },
  'ind': { latitude: 20.5937, longitude: 78.9629 },
  'in': { latitude: 20.5937, longitude: 78.9629 },
  'bra': { latitude: -14.2350, longitude: -51.9253 },
  'br': { latitude: -14.2350, longitude: -51.9253 },
  'kor': { latitude: 35.9078, longitude: 127.7669 },
  'kr': { latitude: 35.9078, longitude: 127.7669 },
  'aus': { latitude: -25.2744, longitude: 133.7751 },
  'au': { latitude: -25.2744, longitude: 133.7751 },
  'can': { latitude: 56.1304, longitude: -106.3468 },
  'ca': { latitude: 56.1304, longitude: -106.3468 },
  'ita': { latitude: 41.8719, longitude: 12.5674 },
  'it': { latitude: 41.8719, longitude: 12.5674 },
  'esp': { latitude: 40.4637, longitude: -3.7492 },
  'es': { latitude: 40.4637, longitude: -3.7492 },
  'mex': { latitude: 23.6345, longitude: -102.5528 },
  'mx': { latitude: 23.6345, longitude: -102.5528 },
  'idn': { latitude: -0.7893, longitude: 113.9213 },
  'id': { latitude: -0.7893, longitude: 113.9213 },
  'tur': { latitude: 38.9637, longitude: 35.2433 },
  'tr': { latitude: 38.9637, longitude: 35.2433 },
  'nld': { latitude: 52.1326, longitude: 5.2913 },
  'nl': { latitude: 52.1326, longitude: 5.2913 },
  'sau': { latitude: 23.8859, longitude: 45.0792 },
  'sa': { latitude: 23.8859, longitude: 45.0792 },
  'che': { latitude: 46.8182, longitude: 8.2275 },
  'ch': { latitude: 46.8182, longitude: 8.2275 },
  'pol': { latitude: 51.9194, longitude: 19.1451 },
  'pl': { latitude: 51.9194, longitude: 19.1451 },
  'swe': { latitude: 60.1282, longitude: 18.6435 },
  'se': { latitude: 60.1282, longitude: 18.6435 },
  'bel': { latitude: 50.5039, longitude: 4.4699 },
  'be': { latitude: 50.5039, longitude: 4.4699 },
  'tha': { latitude: 15.8700, longitude: 100.9925 },
  'th': { latitude: 15.8700, longitude: 100.9925 },
  'are': { latitude: 23.4241, longitude: 53.8478 },
  'ae': { latitude: 23.4241, longitude: 53.8478 },
  'nga': { latitude: 9.0820, longitude: 8.6753 },
  'ng': { latitude: 9.0820, longitude: 8.6753 },
  'zaf': { latitude: -30.5595, longitude: 22.9375 },
  'za': { latitude: -30.5595, longitude: 22.9375 },
  'vnm': { latitude: 14.0583, longitude: 108.2772 },
  'vn': { latitude: 14.0583, longitude: 108.2772 },
  'bgd': { latitude: 23.6850, longitude: 90.3563 },
  'bd': { latitude: 23.6850, longitude: 90.3563 },
  'phl': { latitude: 12.8797, longitude: 121.7740 },
  'ph': { latitude: 12.8797, longitude: 121.7740 },
  'egy': { latitude: 26.8206, longitude: 30.8025 },
  'eg': { latitude: 26.8206, longitude: 30.8025 },
  'pak': { latitude: 30.3753, longitude: 69.3451 },
  'pk': { latitude: 30.3753, longitude: 69.3451 },
  'mys': { latitude: 4.2105, longitude: 101.9758 },
  'my': { latitude: 4.2105, longitude: 101.9758 },
  'arg': { latitude: -38.4161, longitude: -63.6167 },
  'ar': { latitude: -38.4161, longitude: -63.6167 },
  'ago': { latitude: -11.2027, longitude: 17.8739 },
  'ao': { latitude: -11.2027, longitude: 17.8739 },
  'dza': { latitude: 28.0339, longitude: 1.6596 },
  'dz': { latitude: 28.0339, longitude: 1.6596 },
  'irn': { latitude: 32.4279, longitude: 53.6880 },
  'ir': { latitude: 32.4279, longitude: 53.6880 },
  'nor': { latitude: 60.4720, longitude: 8.4689 },
  'no': { latitude: 60.4720, longitude: 8.4689 },
};

// Data structures to store aggregated data
const countryExports = {}; // Total exports by country
const countryProductExports = {}; // Exports by country and product
let rowCount = 0;
const targetYear = '2023';
const streamStartTime = Date.now();

console.log('Starting to process trade data CSV file...');
console.log(`Reading from: ${inputCsvPath}`);
console.log(`Filtering for year: ${targetYear}`);

// Create directory if it doesn't exist
const libDir = path.join(__dirname, '..', 'lib');
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Process the CSV file in chunks
const readStream = fs.createReadStream(inputCsvPath, { highWaterMark: 64 * 1024 }) // 64KB chunks
  .pipe(csv())
  .on('data', (row) => {
    rowCount++;
    
    // Log progress every million rows
    if (rowCount % 1000000 === 0) {
      const elapsedSeconds = (Date.now() - streamStartTime) / 1000;
      console.log(`Processed ${rowCount.toLocaleString()} rows (${(rowCount/elapsedSeconds).toFixed(0)} rows/sec)`);
    }
    
    // Only process target year data
    if (row.year === targetYear) {
      const exporterName = row.exporter_name;
      const exporterCode = row.exporter_id;
      const value = parseFloat(row.value) || 0;
      const productName = row.product_name;
      const hsCode = row.hs_code;

      // Aggregate total exports by country
      if (!countryExports[exporterCode]) {
        countryExports[exporterCode] = {
          name: exporterName,
          code: exporterCode,
          totalExports: 0
        };
      }
      countryExports[exporterCode].totalExports += value;

      // Aggregate exports by country and product
      if (!countryProductExports[exporterCode]) {
        countryProductExports[exporterCode] = {};
      }
      
      // Use the product name as key or combine with HS code if needed
      const productKey = hsCode; // or productName if you prefer
      if (!countryProductExports[exporterCode][productKey]) {
        countryProductExports[exporterCode][productKey] = {
          name: productName,
          value: 0
        };
      }
      countryProductExports[exporterCode][productKey].value += value;
    }
  })
  .on('end', () => {
    console.log('Finished reading CSV file.');
    console.log(`Total rows processed: ${rowCount.toLocaleString()}`);
    console.log(`Found ${Object.keys(countryExports).length} countries with exports in ${targetYear}.`);
    
    // Process the aggregated data
    processAggregatedData();
  })
  .on('error', (error) => {
    console.error('Error processing CSV:', error);
  });

// Function to process the aggregated data
function processAggregatedData() {
  console.log('Processing aggregated export data...');
  
  // Calculate percentages and get top 5 export categories for each country
  const processedCountries = [];
  
  for (const countryCode in countryExports) {
    const country = countryExports[countryCode];
    const products = countryProductExports[countryCode];
    
    // Sort products by value
    const sortedProducts = Object.values(products).sort((a, b) => b.value - a.value);
    
    // Get top 5 products and calculate percentages
    const top5Products = sortedProducts.slice(0, 5).map(product => {
      return {
        name: product.name,
        value: product.value,
        percentage: (product.value / country.totalExports) * 100
      };
    });
    
    // Use hardcoded coordinates or default to 0,0
    const code = countryCode.toLowerCase();
    const coordinates = countryCoordinates[code] || { latitude: 0, longitude: 0 };
    
    // Create the processed country object
    processedCountries.push({
      name: country.name,
      code: countryCode,
      totalExports: country.totalExports,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      exportCategories: top5Products
    });
  }
  
  // Sort countries by total exports (descending)
  processedCountries.sort((a, b) => b.totalExports - a.totalExports);
  
  // Write the processed data to a JSON file
  console.log(`Writing JSON data to ${outputJsonPath}...`);
  fs.writeFileSync(outputJsonPath, JSON.stringify(processedCountries, null, 2));
  
  // Write the processed data to a CSV file
  console.log(`Writing CSV data to ${outputCsvPath}...`);
  writeToCsv(processedCountries);
  
  console.log('Data processing complete!');
}

// Function to write the processed data to a CSV file
function writeToCsv(countries) {
  // Define CSV header
  const csvWriter = createObjectCsvWriter({
    path: outputCsvPath,
    header: [
      { id: 'name', title: 'Country Name' },
      { id: 'code', title: 'Country Code' },
      { id: 'totalExports', title: 'Total Exports (USD)' },
      { id: 'latitude', title: 'Latitude' },
      { id: 'longitude', title: 'Longitude' },
      { id: 'category1Name', title: 'Category 1 Name' },
      { id: 'category1Value', title: 'Category 1 Value (USD)' },
      { id: 'category1Percentage', title: 'Category 1 Percentage' },
      { id: 'category2Name', title: 'Category 2 Name' },
      { id: 'category2Value', title: 'Category 2 Value (USD)' },
      { id: 'category2Percentage', title: 'Category 2 Percentage' },
      { id: 'category3Name', title: 'Category 3 Name' },
      { id: 'category3Value', title: 'Category 3 Value (USD)' },
      { id: 'category3Percentage', title: 'Category 3 Percentage' },
      { id: 'category4Name', title: 'Category 4 Name' },
      { id: 'category4Value', title: 'Category 4 Value (USD)' },
      { id: 'category4Percentage', title: 'Category 4 Percentage' },
      { id: 'category5Name', title: 'Category 5 Name' },
      { id: 'category5Value', title: 'Category 5 Value (USD)' },
      { id: 'category5Percentage', title: 'Category 5 Percentage' },
    ]
  });
  
  // Format data for CSV
  const records = countries.map(country => {
    const record = {
      name: country.name,
      code: country.code,
      totalExports: country.totalExports,
      latitude: country.latitude,
      longitude: country.longitude,
    };
    
    // Add export categories data
    for (let i = 0; i < 5; i++) {
      const category = country.exportCategories[i] || { name: '', value: 0, percentage: 0 };
      record[`category${i+1}Name`] = category.name;
      record[`category${i+1}Value`] = category.value;
      record[`category${i+1}Percentage`] = category.percentage;
    }
    
    return record;
  });
  
  // Write records to CSV
  csvWriter.writeRecords(records)
    .then(() => console.log('CSV file written successfully'));
} 