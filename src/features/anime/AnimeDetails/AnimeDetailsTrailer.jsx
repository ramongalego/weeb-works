const AnimeDetailsTrailer = ({ trailerUrl }) => {
  return (
    <div className='rounded bg-white p-4 pb-6'>
      <h1 className='text-xl font-semibold'>Trailer</h1>
      <div className='mt-6 flex h-full w-full justify-center'>
        <iframe
          className='w-full rounded'
          height='500'
          src={trailerUrl}
          title='YouTube Trailer Player'
          allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default AnimeDetailsTrailer;
