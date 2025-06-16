import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authApi } from '../lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(username, password);
          set({
            user: {
              traineeId: response.password, // API returns traineeId as 'password'
              traineeName: response.traineeName,
              isAdmin: response.isAdmin
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          const errorMessage = error.response?.data || 'שם משתמש או סיסמה שגויים';
          set({ error: errorMessage, isLoading: false });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);