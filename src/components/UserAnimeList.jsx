import { Link } from 'react-router-dom';

const UserAnimeList = ({ data, title }) => {
  return (
    <div className='w-full'>
      <h1 className='ml-2 mt-4 font-semibold text-gray-600'>{title}</h1>

      <div className='mt-3 grid grid-cols-3 gap-4 rounded bg-white p-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8'>
        {data.map(anime => (
          <Link to={`/anime/details/${anime.animeId}`} key={anime.animeId}>
            <div className='h-44 w-28 cursor-pointer rounded text-gray-500 hover:text-gray-800'>
              <img
                src={anime.image}
                alt={anime.title || anime.alt_title}
                className='h-full w-full rounded'
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserAnimeList;
