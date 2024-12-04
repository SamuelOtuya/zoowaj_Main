import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLoggedIn = async (value: boolean) => {
  await AsyncStorage.setItem('isLoggedIn', JSON.stringify(value));
};

export const setProfileCompleted = async (value: boolean) => {
  await AsyncStorage.setItem('isProfileCompleted', JSON.stringify(value));
};

export const getAuthState = async () => {
  const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  const isProfileCompleted = await AsyncStorage.getItem('isProfileCompleted');
  return {
    isLoggedIn: isLoggedIn ? JSON.parse(isLoggedIn) : false,
    isProfileCompleted: isProfileCompleted ? JSON.parse(isProfileCompleted) : false,
  };
};