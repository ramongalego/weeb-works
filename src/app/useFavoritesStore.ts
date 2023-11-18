import { Models } from 'appwrite';
import { create } from 'zustand';

import { databases, ID, Query, DATABASE_ID, FAVORITES_COLLECTION_ID } from '../appwriteConfig';
import { AnimeData } from '../types';

import useAuthStore from './useAuthStore';

type FavoritesStoreState = {
  favorites: Models.Document[];
  isLoading: boolean;
  errors: unknown;

  addToFavorites: (anime: AnimeData) => Promise<void>;
  removeFromFavorites: (documentId: string) => Promise<void>;
  fetchUserFavoritesData: () => Promise<void>;
};

const useFavoritesStore = create<FavoritesStoreState>(set => ({
  favorites: [],
  isLoading: false,
  errors: {},

  addToFavorites: async anime => {
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
        FAVORITES_COLLECTION_ID,
        ID.unique(),
        documentData,
      );

      set(state => ({ favorites: [...state.favorites, response], isLoading: false }));
    } catch (error) {
      console.error('Add to favorites failed:', error);
      set({ isLoading: false, errors: error });
    }
  },

  removeFromFavorites: async documentId => {
    const user = useAuthStore.getState().user;

    if (!user) {
      return;
    }

    set({ isLoading: true });

    try {
      await databases.deleteDocument(DATABASE_ID, FAVORITES_COLLECTION_ID, documentId);

      set(state => ({
        favorites: state.favorites.filter(item => item.$id !== documentId),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Remove from favorites failed:', error);
      set({ isLoading: false, errors: error });
    }
  },

  fetchUserFavoritesData: async () => {
    const user = useAuthStore.getState().user;

    if (!user) {
      return;
    }

    set({ isLoading: true });

    const userId = user.$id;

    try {
      const response = await databases.listDocuments(DATABASE_ID, FAVORITES_COLLECTION_ID, [
        Query.equal('userId', userId),
        Query.orderAsc('$createdAt'),
      ]);

      set({ favorites: response.documents, isLoading: false });
    } catch (error) {
      set({ isLoading: false, errors: error });
    }
  },
}));

export default useFavoritesStore;
