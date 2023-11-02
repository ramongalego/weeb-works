import { create } from 'zustand';

import { databases, ID, Query } from '../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_WATCHLIST_COLLECTION_ID;

const useWatchlistStore = create((set, get) => ({
  watchlist: [],
  favorites: [],
  isLoading: false,
  errors: {},

  addtoWatchlist: async anime => {
    const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), anime);

    set({ watchlist: response });
  },

  removeFromWatchlist: async id => {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);

    set(state => ({
      watchlist: state.watchlist.filter(anime => anime.$id !== id),
    }));

    get().persisWatchlistData();
  },

  persistWatchlistData: async () => {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc('$createdAt'),
      Query.limit(10),
    ]);
    set({ watchlist: response.documents });
  },
}));

export default useWatchlistStore;
