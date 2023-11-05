import { useEffect } from 'react';

import useFavoritesStore from '../app/useFavoritesStore';

export const useFavorites = (user, data) => {
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
