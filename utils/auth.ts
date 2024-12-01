import AsyncStorage from '@react-native-async-storage/async-storage';
import { hydrateAuthState } from '@/redux/slices/authslice';

export const checkAuthState = async (dispatch: any) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const user = JSON.parse(await AsyncStorage.getItem('userData') || '{}');
        if (token) {
            dispatch(hydrateAuthState({ token, user }));
        }
    } catch (e) {
        console.error('Failed to load auth state:', e);
    }
};
