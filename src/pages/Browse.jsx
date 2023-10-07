import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchAiringAnime, fetchTopAnime, fetchUpcomingAnime } from '../api/anime';
import { formatOptions, statusOptions, ratingOptions } from '../constants/selectOptions';
import { QUERY_STALE_TIME } from '../constants/staleTime';

import AnimeList from '../features/anime/AnimeList';
import Filter from '../components/Filter';

const Browse = () => {
  const { filter } = useParams();

  // Two useQueries, one if there are searchParams (?year=2019), and the other existing one
  // if there is not

  const { isLoading, isError, data } = useQuery({
    queryKey: ['animeData', filter],
    queryFn: () => {
      switch (filter) {
        case 'top':
          return fetchTopAnime();
        case 'upcoming':
          return fetchUpcomingAnime();
        default:
          return fetchAiringAnime();
      }
    },
    staleTime: QUERY_STALE_TIME,
  });

  return (
    <div>
      <div className='flex justify-between'>
        <Filter type='format' options={formatOptions} />
        <Filter type='status' options={statusOptions} />
        <Filter type='rating' options={ratingOptions} />
      </div>
      <AnimeList isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default Browse;
