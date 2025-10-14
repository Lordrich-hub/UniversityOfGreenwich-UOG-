import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  username: string;
  email: string;
  student_id: string;
  course: string;
  year: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  setAuth: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  loadAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  
  setAuth: async (token, user) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    set({ token, user, isLoading: false });
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    set({ token: null, user: null });
  },
  
  loadAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userStr = await AsyncStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      set({ token, user, isLoading: false });
    } catch (error) {
      set({ token: null, user: null, isLoading: false });
    }
  },
}));
