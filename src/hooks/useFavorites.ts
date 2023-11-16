import { useEffect } from 'react';

import { User } from '../app/useAuthStore';
import useFavoritesStore from '../app/useFavoritesStore';
import { AnimeData } from '../types';

export const useFavorites = (user: User | null, data: AnimeData) => {
  const fetchUserFavoritesData = useFavoritesStore(state => state.fetchUserFavoritesData);
  const favorites = useFavoritesStore(state => state.favorites);
  const addToFavorites = useFavoritesStore(state => state.addToFavorites);
  const removeFromFavorites = useFavoritesStore(state => state.removeFromFavorites);

  const animeInFavorites = favorites.find(item => item.animeId === data.mal_id);

  useEffect(() => {
    if (user) {
      fetchUserFavoritesData();
    }
  }, [user, fetchUserFavoritesData]);

  const handleFavoritesAction = () => {
    if (animeInFavorites) {
      removeFromFavorites(animeInFavorites.$id);
    } else {
      addToFavorites(data);
    }
  };

  return { handleFavoritesAction, animeInFavorites };
};
