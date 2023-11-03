import { HeartIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

import useAuthStore from '../../../app/useAuthStore';
import useWatchlistStore from '../../../app/useWatchlistStore';

const AnimeDetailsActions = ({ data }) => {
  const user = useAuthStore(state => state.user);

  const getUserWatchlistData = useWatchlistStore(state => state.getUserWatchlistData);
  const watchlist = useWatchlistStore(state => state.watchlist);
  const addToWatchlist = useWatchlistStore(state => state.addToWatchlist);

  useEffect(() => {
    if (user) {
      getUserWatchlistData();
    }
  }, [user, getUserWatchlistData]);

  const isAdded = watchlist.find(item => item.animeId === data.mal_id);

  return (
    <div className='mt-2 flex w-full justify-between text-white'>
      <button
        className={`w-9/12 rounded bg-indigo-500 px-10 py-1 ${isAdded ? 'opacity-50' : ''}`}
        onClick={() => addToWatchlist(data)}
        disabled={isAdded}
      >
        Add to List
      </button>
      <button className='rounded bg-red-600 px-2 py-1'>
        <HeartIcon className='h-5 w-5' />
      </button>
    </div>
  );
};

export default AnimeDetailsActions;
