# ExportGuessr

A geography-based guessing game inspired by "Tradle", where players must guess countries based on their export data.

## Game Overview

- Players are presented with the total export value of a mystery country
- A visual breakdown of export categories is displayed
- Players have 5 attempts to guess the correct country
- For each guess, players receive feedback on:
  - Distance to the correct country
  - Direction to the correct country
  - Percentage difference in export value

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Visx (for visualizations)
- Geolib (for geographical calculations)

## Running the Project

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## Dataset and Data Processing

The project uses export data from the [BACI international trade database](http://www.cepii.fr/CEPII/en/bdd_modele/bdd_modele_item.asp?id=37). The raw data is a large CSV file (30+ GB) containing detailed trade information across multiple years.

To make this data usable for the application:

1. The raw CSV is processed using a Node.js script (`scripts/process-trade-data.js`)
2. The script extracts only the most recent year's data (2023)
3. It aggregates exports by country and product categories
4. The processed data is saved in both JSON and CSV formats in the `lib` directory

Note: The large raw data files are not included in the GitHub repository. If you want to reprocess the data, you'll need to:

1. Download the BACI dataset
2. Place it in a directory named `trade_i_baci_a_92.csv`
3. Run the processing script: `node scripts/process-trade-data.js`

## Mobile Support

The application is fully responsive and optimized for mobile devices. Features include:

- Responsive layout adapting to screen size
- Touch-friendly interactions
- Tooltips that work with both mouse hover and touch
- Optimized chart display for smaller screens

## License

ISC 