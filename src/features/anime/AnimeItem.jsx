import { Link } from 'react-router-dom';

const AnimeItem = ({ anime }) => {
  return (
    <Link to={`/anime/details/${anime.mal_id}`}>
      <div
        key={anime.mal_id}
        className='w-32 h-52 sm:w-40 sm:h-60 rounded cursor-pointer mb-12 text-gray-500 hover:text-gray-800'
      >
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title_english}
          className='w-full h-full rounded'
        />
        <p
          className='text-sm mt-2'
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
