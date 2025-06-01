import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the user type
interface User {
  uid: string;
  email: string;
  displayName: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll simulate authentication
      // In a real app, you would integrate with Firebase or another auth provider
      
      // Validate credentials (simplified)
      if (email.trim() === '' || password.trim() === '') {
        throw new Error('Invalid credentials');
      }
      
      // Create mock user object
      const mockUser: User = {
        uid: `user-${Date.now()}`,
        email,
        displayName: email.split('@')[0],
      };
      
      // Store user in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, we'll simulate registration
      // In a real app, you would integrate with Firebase or another auth provider
      
      // Validate inputs (simplified)
      if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
        throw new Error('All fields are required');
      }
      
      // Create mock user object
      const mockUser: User = {
        uid: `user-${Date.now()}`,
        email,
        displayName: name,
      };
      
      // Store user in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setIsLoading(true);
    
    try {
      // Remove user from AsyncStorage
      await AsyncStorage.removeItem('user');
      
      // Update state
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};