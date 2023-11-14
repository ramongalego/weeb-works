const AnimeDetailsTrailer = ({ trailerUrl }: { trailerUrl: string }) => {
  const sanitizedTrailerUrl = trailerUrl.replace('autoplay=1', 'autoplay=0');

  return (
    <div className='min-h-[600px] rounded bg-white p-4'>
      <h1 className='text-xl font-semibold'>Trailer</h1>
      <div className='mt-6 flex h-full w-full justify-center'>
        <iframe
          className='w-full rounded'
          height='510'
          src={sanitizedTrailerUrl}
          title='YouTube Trailer Player'
          allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default AnimeDetailsTrailer;
