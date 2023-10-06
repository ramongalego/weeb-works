const AnimeCards = ({ isLoading, error, data, isFetching, title, isPreview }) => {
  if (isLoading) return 'Loading...';

  if (error) return `An error has occurred: ${error.message}`;

  return (
    <div className='w-full mt-14'>
      {isPreview && (
        <div className='flex items-end justify-between'>
          <h1 className='text-2xl'>{title}</h1>
          <p className='cursor-pointer text-sm'>View All</p>
        </div>
      )}
      <div className='mt-4 grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
        {data.map(anime => (
          <div key={anime.mal_id} className='w-40 h-60 rounded cursor-pointer'>
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title_english}
              className='w-full h-full rounded'
            />
          </div>
        ))}
        <div>{isFetching ? 'Updating...' : ''}</div>
      </div>
    </div>
  );
};

export default AnimeCards;
