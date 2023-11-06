import { HeartIcon } from '@heroicons/react/24/solid';

import useAuthStore from '../../../app/useAuthStore';
import { useFavorites } from '../../../hooks/useFavorites';
import { useWatchlist } from '../../../hooks/useWatchlist';

const AnimeDetailsActions = ({ data }) => {
  const user = useAuthStore(state => state.user);

  const { handleWatchlistAction, animeInWatchlist } = useWatchlist(user, data);
  const { handleFavoritesAction, animeInFavorites } = useFavorites(user, data);

  return (
    <div className='mx-auto w-64 sm:w-full mt-2 flex justify-between text-white'>
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
