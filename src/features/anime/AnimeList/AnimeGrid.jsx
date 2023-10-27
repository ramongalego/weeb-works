import Error from '../../../components/Error';
import Loading from '../../../components/Loading';

import AnimeItem from './AnimeItem';

const AnimeGrid = ({ data, isLoading, error }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (data.length === 0) {
    return <Error message='No Results' />;
  }

  return (
    <div className='mt-4 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
      {data.map(anime => (
        <AnimeItem anime={anime} key={anime.mal_id} />
      ))}
    </div>
  );
};

export default AnimeGrid;
