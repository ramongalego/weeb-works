import { useEffect } from 'react';

import useWatchlistStore from '../app/useWatchlistStore';

export const useWatchlist = (user, data) => {
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
