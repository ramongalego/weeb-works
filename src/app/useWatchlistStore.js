import { create } from 'zustand';

import { databases, ID, Query } from '../appwriteConfig';

import useAuthStore from './useAuthStore';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_WATCHLIST_COLLECTION_ID;

const useWatchlistStore = create(set => ({
  watchlist: [],
  favorites: [],
  isLoading: false,
  errors: {},

  addToWatchlist: async anime => {
    const user = useAuthStore.getState().user;

    if (!user) {
      console.error('No user found');
      return;
    }

    const userId = user.$id;

    set({ isLoading: true });

    try {
      const documentData = {
        animeId: anime.mal_id,
        userId: userId,
        title: anime.title_english,
        alt_title: anime.title,
        image: anime.images.jpg.large_image_url,
      };

      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        documentData,
      );

      set(state => ({ watchlist: [...state.watchlist, response], isLoading: false }));
    } catch (error) {
      console.error('Add to watchlist failed:', error);
      set({ isLoading: false, errors: error });
    }
  },

  getUserWatchlistData: async () => {
    const user = useAuthStore.getState().user;

    if (!user) {
      console.error('No user found');
      return;
    }

    const userId = user.$id;

    set({ isLoading: true });

    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('userId', userId),
        Query.orderDesc('$createdAt'),
        Query.limit(10),
      ]);

      set({ watchlist: response.documents, isLoading: false });
    } catch (error) {
      console.error('Failed to persist watchlist data:', error);
      set({ isLoading: false, errors: error });
    }
  },
}));

export default useWatchlistStore;
