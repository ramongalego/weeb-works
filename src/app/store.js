import { create } from 'zustand';

import { account } from '../lib/appwrite';

const useUserStore = create(set => ({
  current: null,
  loading: false,
  login: async (email, password) => {
    set({ loading: true });
    try {
      const loggedIn = await account.createEmailSession(email, password);
      set({ current: loggedIn, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error('Login failed:', error);
    }
  },
  logout: async () => {
    try {
      await account.deleteSession('current');
      set({ current: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
  register: async (id, email, password, username) => {
    set({ loading: true });
    try {
      await account.create(id, email, password, username);
      const loggedIn = await account.createEmailSession(email, password);
      set({ current: loggedIn, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error('Registration failed:', error);
    }
  },
}));

export default useUserStore;
