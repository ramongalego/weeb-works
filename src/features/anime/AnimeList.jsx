import AnimeItem from './AnimeItem';

const AnimeList = ({ isLoading, error, data, title, isPreview }) => {
  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div className='w-full mt-14'>
      {isPreview && (
        <div className='flex items-end justify-between'>
          <h1 className='text-2xl text-gray-500 hover:text-gray-800 cursor-pointer'>{title}</h1>
          <p className='cursor-pointer text-sm text-gray-500 hover:text-gray-800'>View All</p>
        </div>
      )}
      <div className='mt-4 grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
        {data.map(anime => (
          <AnimeItem anime={anime} key={anime.mal_id} />
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
