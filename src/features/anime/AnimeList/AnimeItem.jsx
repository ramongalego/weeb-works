import { Link } from 'react-router-dom';

const AnimeItem = ({ anime }) => {
  return (
    <Link to={`/anime/details/${anime.mal_id}`}>
      <div
        key={anime.mal_id}
        className='mb-12 h-48 w-28 cursor-pointer rounded text-gray-500 hover:text-gray-800 sm:h-60 sm:w-40'
      >
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title_english}
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
};

export default AnimeItem;
