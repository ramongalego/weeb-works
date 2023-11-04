import { create } from 'zustand';

import { databases, ID, Query, DATABASE_ID, WATCHLIST_COLLECTION_ID } from '../appwriteConfig';

import useAuthStore from './useAuthStore';

const useWatchlistStore = create(set => ({
  watchlist: [],
  isLoading: false,
  errors: {},

  addToWatchlist: async anime => {
    const user = useAuthStore.getState().user;

    if (!user) {
      return;
    }

    set({ isLoading: true });

    const userId = user.$id;

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
        WATCHLIST_COLLECTION_ID,
        ID.unique(),
        documentData,
      );

      set(state => ({ watchlist: [...state.watchlist, response], isLoading: false }));
    } catch (error) {
      console.error('Add to watchlist failed:', error);
      set({ isLoading: false, errors: error });
    }
  },

  removeFromWatchlist: async documentId => {
    const user = useAuthStore.getState().user;

    if (!user) {
      return;
    }

    set({ isLoading: true });

    try {
      await databases.deleteDocument(DATABASE_ID, WATCHLIST_COLLECTION_ID, documentId);

      set(state => ({
        watchlist: state.watchlist.filter(item => item.$id !== documentId),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Remove from watchlist failed:', error);
      set({ isLoading: false, errors: error });
    }
  },

  fetchUserWatchlistData: async () => {
    const user = useAuthStore.getState().user;

    if (!user) {
      return;
    }

    set({ isLoading: true });

    const userId = user.$id;

    try {
      const response = await databases.listDocuments(DATABASE_ID, WATCHLIST_COLLECTION_ID, [
        Query.equal('userId', userId),
        Query.orderAsc('$createdAt'),
      ]);

      set({ watchlist: response.documents, isLoading: false });
    } catch (error) {
      set({ isLoading: false, errors: error });
    }
  },
}));

export default useWatchlistStore;
