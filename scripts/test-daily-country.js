// Simplified test script to debug the daily country functionality

console.log("Basic date calculations for daily country feature:");

// Current time info
const now = new Date();
console.log(`Current local time: ${now.toLocaleString()}`);
console.log(`Current timezone offset: ${now.getTimezoneOffset()} minutes`);

// Calculate ET time
const etOffset = -4 * 60 * 60 * 1000; // Eastern Time (UTC-4)
const localOffset = now.getTimezoneOffset() * 60 * 1000;
const etNow = new Date(now.getTime() + etOffset + localOffset);
console.log(`\nCalculated ET time: ${etNow.toLocaleString()}`);

// Calculate reset time (8pm ET)
const etHours = etNow.getHours();
const resetToday = new Date(etNow);
resetToday.setHours(20, 0, 0, 0);

// Determine if we use today's date or yesterday's
const useYesterday = etHours < 20;
const targetDate = new Date(etNow);
if (useYesterday) {
  targetDate.setDate(targetDate.getDate() - 1);
}

// Date string to use as seed (YYYY-MM-DD)
const dateString = targetDate.toISOString().split('T')[0];

console.log(`\nCurrent hour in ET: ${etHours}`);
console.log(`Should use yesterday's date? ${useYesterday}`);
console.log(`Target date for country selection: ${dateString}`);

// Calculate next reset time
const nextReset = new Date(etNow);
nextReset.setHours(20, 0, 0, 0);
if (etHours >= 20) {
  nextReset.setDate(nextReset.getDate() + 1);
}
console.log(`\nNext country change at 8pm ET: ${nextReset.toLocaleString()}`);

// Calculate time remaining
const timeToNextReset = nextReset.getTime() - etNow.getTime();
const hoursRemaining = Math.floor(timeToNextReset / (1000 * 60 * 60));
const minutesRemaining = Math.floor((timeToNextReset % (1000 * 60 * 60)) / (1000 * 60));
console.log(`Time remaining: ${hoursRemaining}h ${minutesRemaining}m`);

// Hash function demonstration
function getCountryIndex(dateStr, countryCount = 226) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  return Math.abs(hash) % countryCount;
}

// Test a range of dates to show index distribution
console.log("\nCountry indices for the next 5 days:");

for (let i = 0; i < 5; i++) {
  const testDate = new Date(now);
  testDate.setDate(testDate.getDate() + i);
  const testDateStr = testDate.toISOString().split('T')[0];
  const index = getCountryIndex(testDateStr);
  console.log(`${testDateStr}: Country index #${index}`);
} 