import { memo } from 'react';
import { Link } from 'react-router-dom';

import { AnimeData } from '../../../types';

const AnimeItem = memo(({ anime }: { anime: AnimeData }) => {
  return (
    <Link to={`/anime/details/${anime.mal_id}`}>
      <div className='mb-16 h-48 w-28 cursor-pointer rounded text-gray-500 hover:text-gray-800 sm:h-60 sm:w-40'>
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title_english ?? anime.title}
          loading='lazy'
          className='h-full w-full rounded'
        />
        <p
          className='mt-2 text-sm'
          style={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {anime.title_english || anime.title}
        </p>
      </div>
    </Link>
  );
});

AnimeItem.displayName = 'AnimeItem';

export default AnimeItem;
