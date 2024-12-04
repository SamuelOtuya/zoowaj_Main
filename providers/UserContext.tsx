// app/providers/UserContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  profileCompleted: boolean;
  // name?: string;
  // avatarUrl?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  // Load user data from AsyncStorage on app startup
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUserState(JSON.parse(userData)); // Set user if data exists
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  // Save user data in AsyncStorage
  const saveUserData = async (user: User | null) => {
    try {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user)); // Save user data
      } else {
        await AsyncStorage.removeItem('user'); // Remove user data if logged out
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Function to set user data in the context and persist it
  const setUser = (user: User | null) => {
    setUserState(user);
    saveUserData(user); // Persist user data
  };

  // Function to update the user's profile
  const updateProfile = (updatedUser: Partial<User>) => {
    if (user) {
      const updatedUserData = { ...user, ...updatedUser };
      setUser(updatedUserData); // Update user data in context and persist
    }
  };

  // Function to log out the user
  const logout = () => {
    setUser(null); // Clear user context
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
