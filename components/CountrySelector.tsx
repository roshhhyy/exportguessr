import React, { useState, useRef, useEffect } from 'react';
import { Country } from '@/lib/types';

interface CountrySelectorProps {
  countries: Country[];
  onSelect: (country: Country) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function CountrySelector({
  countries,
  onSelect,
  disabled = false,
  placeholder = 'Search for a country...'
}: CountrySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Sort countries alphabetically by name with null checks
  const sortedCountries = React.useMemo(() => {
    // Filter out undefined or invalid countries first
    const validCountries = (countries || []).filter(country => 
      country && typeof country === 'object' && country.name
    );
    
    // Then sort the valid countries
    return [...validCountries].sort((a, b) => 
      (a.name || '').localeCompare(b.name || '')
    );
  }, [countries]);
  
  // Filter countries based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCountries([]);
    } else {
      const filtered = sortedCountries.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered.slice(0, 10)); // Limit to 10 results for better performance
    }
    setSelectedIndex(-1);
  }, [searchTerm, sortedCountries]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDropdownOpen || filteredCountries.length === 0) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev < filteredCountries.length - 1) ? prev + 1 : prev);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0) ? prev - 1 : prev);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0) {
            handleSelectCountry(filteredCountries[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsDropdownOpen(false);
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen, filteredCountries, selectedIndex]);
  
  const handleSelectCountry = (country: Country) => {
    onSelect(country);
    setSearchTerm('');
    setIsDropdownOpen(false);
    inputRef.current?.blur(); // Hide mobile keyboard after selection
  };
  
  return (
    <div className="w-full relative" ref={dropdownRef}>
      <input
        ref={inputRef}
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true);
        }}
        onClick={() => setIsDropdownOpen(true)}
        disabled={disabled}
        aria-label="Search for a country"
        autoComplete="off"
      />
      
      {isDropdownOpen && filteredCountries.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-y-auto">
          {filteredCountries.map((country, index) => (
            <div
              key={country.code}
              className={`p-2 ${index === selectedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'} cursor-pointer text-sm md:text-base`}
              onClick={() => handleSelectCountry(country)}
            >
              {country.name}
            </div>
          ))}
        </div>
      )}
      
      {isDropdownOpen && searchTerm && filteredCountries.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-2 text-gray-500 text-sm md:text-base">
          No countries found
        </div>
      )}
    </div>
  );
} 