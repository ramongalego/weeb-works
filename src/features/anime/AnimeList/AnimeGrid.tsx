import { AxiosError } from 'axios';

import Error from '../../../components/Error';
import SkeletonLoading from '../../../components/SkeletonLoading';
import { AnimeData } from '../../../types';

import AnimeItem from './AnimeItem';

type AnimeGridProps = {
  data: AnimeData[] | undefined;
  isLoading: boolean;
  error: unknown;
  skeletonCount: number;
};

const AnimeGrid = ({ data = [], isLoading, error, skeletonCount }: AnimeGridProps) => {
  if (isLoading) {
    return <SkeletonLoading count={skeletonCount} />;
  }

  if (error instanceof AxiosError) {
    return <Error message={error.message} />;
  }

  if (error) {
    return <Error />;
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
