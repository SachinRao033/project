import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

// Define theme colors
interface ThemeColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  background: string;
  backgroundSecondary: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  placeholder: string;
  inputBackground: string;
}

// Define the context type
interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the theme colors
const lightColors: ThemeColors = {
  primary: '#0062FF',
  primaryLight: '#E6F0FF',
  secondary: '#00BAB6',
  secondaryLight: '#E6F8F8',
  success: '#00A76F',
  successLight: '#E6F7F1',
  warning: '#FFAB00',
  warningLight: '#FFF8E6',
  error: '#FF5630',
  errorLight: '#FFEEE9',
  background: '#F8F9FA',
  backgroundSecondary: '#F1F3F5',
  card: '#FFFFFF',
  text: '#212B36',
  textSecondary: '#637381',
  border: '#E6E8EB',
  shadow: '#00000026',
  placeholder: '#A0A9B2',
  inputBackground: '#F5F5F5',
};

const darkColors: ThemeColors = {
  primary: '#0062FF',
  primaryLight: '#1A2E4D',
  secondary: '#00BAB6',
  secondaryLight: '#1A3333',
  success: '#00A76F',
  successLight: '#1A2E25',
  warning: '#FFAB00',
  warningLight: '#332B00',
  error: '#FF5630',
  errorLight: '#331F1A',
  background: '#161C24',
  backgroundSecondary: '#212B36',
  card: '#212B36',
  text: '#FFFFFF',
  textSecondary: '#919EAB',
  border: '#2D3748',
  shadow: '#00000080',
  placeholder: '#637381',
  inputBackground: '#2D3748',
};

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get device color scheme
  const deviceColorScheme = useColorScheme();
  
  // State for theme
  const [isDark, setIsDark] = useState(deviceColorScheme === 'dark');

  // Load theme preference from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme !== null) {
          setIsDark(storedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();
  }, []);

  // Toggle theme function
  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  // Get current theme colors
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};