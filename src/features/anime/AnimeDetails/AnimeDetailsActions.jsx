import { HeartIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

import useAuthStore from '../../../app/useAuthStore';
import useFavoritesStore from '../../../app/useFavoritesStore';
import useWatchlistStore from '../../../app/useWatchlistStore';

const AnimeDetailsActions = ({ data }) => {
  const user = useAuthStore(state => state.user);

  const getUserWatchlistData = useWatchlistStore(state => state.getUserWatchlistData);
  const watchlist = useWatchlistStore(state => state.watchlist);
  const addToWatchlist = useWatchlistStore(state => state.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore(state => state.removeFromWatchlist);

  const getUserFavoritesData = useFavoritesStore(state => state.getUserFavoritesData);
  const favorites = useFavoritesStore(state => state.favorites);
  const addToFavorites = useFavoritesStore(state => state.addToFavorites);
  const removeFromFavorites = useFavoritesStore(state => state.removeFromFavorites);

  const animeInWatchlist = watchlist.find(item => item.animeId === data.mal_id);
  const animeInFavorites = favorites.find(item => item.animeId === data.mal_id);

  useEffect(() => {
    if (user) {
      getUserWatchlistData();
      getUserFavoritesData();
    }
  }, [user, getUserWatchlistData, getUserFavoritesData]);

  const handleWatchlistAction = () => {
    if (animeInWatchlist) {
      removeFromWatchlist(animeInWatchlist.$id);
    } else {
      addToWatchlist(data);
    }
  };

  const handleFavoritesAction = () => {
    if (animeInFavorites) {
      removeFromFavorites(animeInFavorites.$id);
    } else {
      addToFavorites(data);
    }
  };

  return (
    <div className='mt-2 flex w-full justify-between text-white'>
      <button className='w-9/12 rounded bg-indigo-500 py-1' onClick={handleWatchlistAction}>
        <p>{animeInWatchlist ? 'Remove from List' : 'Add to List'}</p>
      </button>
      <button className='rounded bg-red-600 px-2 py-1' onClick={handleFavoritesAction}>
        <HeartIcon className={`h-5 w-5 ${animeInFavorites ? 'opacity-50' : ''}`} />
      </button>
    </div>
  );
};

export default AnimeDetailsActions;
