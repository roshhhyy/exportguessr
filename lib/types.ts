export interface Country {
  name: string;
  code: string;
  totalExports: number; // in USD
  exportCategories: ExportCategory[];
  latitude: number;
  longitude: number;
}

export interface ExportCategory {
  name: string;
  value: number; // in USD
  percentage: number; // percentage of total exports
}

export interface GameState {
  targetCountry: Country | null;
  guesses: Guess[];
  currentGuessIndex: number;
  gameOver: boolean;
  gameWon: boolean;
}

export interface Guess {
  country: Country;
  distance: number; // in kilometers
  direction: Direction;
  exportDifference: number; // as percentage
}

export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'; 