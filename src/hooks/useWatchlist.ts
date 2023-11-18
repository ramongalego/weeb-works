import { useEffect } from 'react';

import { User } from '../app/useAuthStore';
import useWatchlistStore from '../app/useWatchlistStore';
import { AnimeData } from '../types';

export const useWatchlist = (user: User | null, data: AnimeData) => {
  const fetchUserWatchlistData = useWatchlistStore(state => state.fetchUserWatchlistData);
  const watchlist = useWatchlistStore(state => state.watchlist);
  const addToWatchlist = useWatchlistStore(state => state.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore(state => state.removeFromWatchlist);

  const animeInWatchlist = watchlist.find(item => item.animeId === data.mal_id);

  useEffect(() => {
    if (user) {
      fetchUserWatchlistData();
    }
  }, [user, fetchUserWatchlistData]);

  const handleWatchlistAction = () => {
    if (animeInWatchlist) {
      removeFromWatchlist(animeInWatchlist.$id);
    } else {
      addToWatchlist(data);
    }
  };

  return { handleWatchlistAction, animeInWatchlist };
};
