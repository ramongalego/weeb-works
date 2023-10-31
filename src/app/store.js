import { create } from 'zustand';

import { account } from '../appwriteConfig';

const useAuthStore = create(set => ({
  current: null,
  user: null,
  isLoading: false,
  errors: {},

  loginUser: async (email, password) => {
    set({ isLoading: true });

    try {
      const session = await account.createEmailSession(email, password);
      const accountDetails = await account.get();

      set({ current: session, user: accountDetails, isLoading: false });
    } catch (error) {
      set({ isLoading: false, errors: error });
      console.error('Login failed:', error);
    }
  },

  logoutUser: async () => {
    try {
      await account.deleteSession('current');
      set({ current: null, user: null });
    } catch (error) {
      set({ errors: error });
      console.error('Logout failed:', error);
    }
  },

  registerUser: async (id, email, password, username) => {
    set({ isLoading: true });

    try {
      await account.create(id, email, password, username);
      const session = await account.createEmailSession(email, password);
      const accountDetails = await account.get();

      set({ current: session, user: accountDetails, isLoading: false });
    } catch (error) {
      set({ isLoading: false, errors: error });
      console.error('Registration failed:', error);
    }
  },

  persistUserInfo: async () => {
    try {
      let accountDetails = await account.get();
      set({ user: accountDetails });
    } catch (error) {
      set({ user: null, errors: error });
    }
  },
}));

export default useAuthStore;
