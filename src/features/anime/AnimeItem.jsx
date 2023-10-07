const AnimeItem = ({ anime }) => {
  return (
    <div
      key={anime.mal_id}
      className='w-40 h-60 rounded cursor-pointer mb-12 text-gray-500 hover:text-gray-800'
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
  );
};

export default AnimeItem;
