import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import useWatchlistStore from '../app/useWatchlistStore';

const UserAnimeList = ({ data, title }) => {
  const removeFromWatchlist = useWatchlistStore(state => state.removeFromWatchlist);

  return (
    <div className='w-full'>
      <h1 className='ml-2 mt-4 font-semibold text-gray-600'>{title}</h1>

      <div className='mt-3 grid grid-cols-3 gap-4 rounded bg-white p-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8'>
        {data.map(anime => (
          <div
            key={anime.animeId}
            className='group mb-2 h-44 w-28 cursor-pointer rounded text-gray-500 hover:text-gray-800'
          >
            <div className='relative h-full w-full'>
              <button
                className='absolute right-0 top-0 rounded-bl bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
                onClick={() => removeFromWatchlist(anime.$id)}
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
