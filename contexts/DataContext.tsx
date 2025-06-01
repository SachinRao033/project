import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scrapeData } from '@/services/scraper';

// Define the data item type
interface DataItem {
  id: string;
  title: string;
  category: string;
  price: string;
  inStock: boolean;
  url: string;
  imageUrl: string;
  timestamp: number;
}

// Define the context type
interface DataContextType {
  scrapedData: DataItem[] | null;
  isLoading: boolean;
  error: string | null;
  lastScrapeTime: string | null;
  fetchData: () => Promise<void>;
  clearData: () => Promise<void>;
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Format date for display
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// Data provider component
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrapedData, setScrapedData] = useState<DataItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastScrapeTime, setLastScrapeTime] = useState<string | null>(null);

  // Load data from storage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Load data from AsyncStorage
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('scrapedData');
      const storedTime = await AsyncStorage.getItem('lastScrapeTime');
      
      if (storedData) {
        setScrapedData(JSON.parse(storedData));
      }
      
      if (storedTime) {
        setLastScrapeTime(formatDate(parseInt(storedTime)));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load saved data');
    }
  };

  // Fetch new data
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the scraper service
      const newData = await scrapeData();
      
      // Update timestamp
      const timestamp = Date.now();
      
      // Process and store the new data
      const processedData = newData.map((item, index) => ({
        ...item,
        id: `item-${timestamp}-${index}`,
        timestamp,
      }));
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('scrapedData', JSON.stringify(processedData));
      await AsyncStorage.setItem('lastScrapeTime', timestamp.toString());
      
      // Update state
      setScrapedData(processedData);
      setLastScrapeTime(formatDate(timestamp));
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Failed to scrape data');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all data
  const clearData = async () => {
    setIsLoading(true);
    
    try {
      await AsyncStorage.removeItem('scrapedData');
      await AsyncStorage.removeItem('lastScrapeTime');
      
      setScrapedData(null);
      setLastScrapeTime(null);
    } catch (error) {
      console.error('Error clearing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        scrapedData,
        isLoading,
        error,
        lastScrapeTime,
        fetchData,
        clearData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};