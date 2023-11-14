import { create } from 'zustand';

import { account } from '../appwriteConfig';

type AuthStoreState = {
  current: CurrentObject<string | boolean> | null;
  user: User | null;
  isLoading: boolean;
  errors: unknown;

  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (id: string, email: string, password: string, username: string) => Promise<void>;
  fetchUserData: () => Promise<void>;
};

type User = {
  $id: string;
  name: string;
};

type CurrentObject<T> = Record<string, T> | null;

const useAuthStore = create<AuthStoreState>(set => ({
  current: null,
  user: null,
  isLoading: false,
  errors: {},

  loginUser: async (email: string, password: string) => {
    set({ isLoading: true });

    try {
      const session = await account.createEmailSession(email, password);
      const accountDetails = await account.get();

      set({ current: session, user: accountDetails, isLoading: false, errors: {} });
    } catch (error) {
      set({ isLoading: false, errors: error });
      console.error('Login failed:', error);
    }
  },

  logoutUser: async () => {
    try {
      await account.deleteSession('current');
      set({ current: null, user: null, errors: {} });
    } catch (error) {
      set({ errors: error });
      console.error('Logout failed:', error);
    }
  },

  registerUser: async (id: string, email: string, password: string, username: string) => {
    set({ isLoading: true });

    try {
      await account.create(id, email, password, username);
      const session = await account.createEmailSession(email, password);
      const accountDetails = await account.get();

      set({ current: session, user: accountDetails, isLoading: false, errors: {} });
    } catch (error) {
      set({ isLoading: false, errors: error });
      console.error('Registration failed:', error);
    }
  },

  fetchUserData: async () => {
    try {
      const accountDetails = await account.get();
      set({ user: accountDetails, errors: {} });
    } catch (error) {
      set({ user: null, errors: error });
    }
  },
}));

export default useAuthStore;
