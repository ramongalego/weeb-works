import { XMarkIcon } from '@heroicons/react/24/outline';
import { Models } from 'appwrite';
import { Link } from 'react-router-dom';

import useFavoritesStore from '../app/useFavoritesStore';
import useWatchlistStore from '../app/useWatchlistStore';

type UserAnimeListProps = {
  data: Models.Document[];
  title: string;
};

const UserAnimeList = ({ data, title }: UserAnimeListProps) => {
  const removeFromWatchlist = useWatchlistStore(state => state.removeFromWatchlist);
  const removeFromFavorites = useFavoritesStore(state => state.removeFromFavorites);

  const handleRemoveFromList = (id: string) => {
    if (title === 'watchlist') {
      removeFromWatchlist(id);
    } else {
      removeFromFavorites(id);
    }
  };

  return (
    <div className='mb-16 w-full'>
      <h1 className='ml-2 mt-4 font-semibold capitalize text-gray-600'>{title}</h1>

      <div className='mt-3 grid grid-cols-3 gap-4 rounded bg-white p-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8'>
        {data.map(anime => (
          <div
            key={anime.animeId}
            className='group h-40 w-24 cursor-pointer rounded text-gray-500 hover:text-gray-800 sm:h-44 sm:w-28'
          >
            <div className='relative h-full w-full'>
              <button
                className='absolute right-0 top-0 rounded-bl bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                onClick={() => handleRemoveFromList(anime.$id)}
              >
                <XMarkIcon className='h-4 w-4' />
              </button>
              <Link to={`/anime/details/${anime.animeId}`}>
                <img
                  src={anime.image}
                  alt={anime.title || anime.alt_title}
                  className='h-full w-full rounded'
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAnimeList;
