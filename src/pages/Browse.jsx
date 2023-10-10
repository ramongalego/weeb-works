import { useQuery } from '@tanstack/react-query';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import {
  fetchAiringAnime,
  fetchTopAnime,
  fetchUpcomingAnime,
  fetchFilteredAnime,
} from '../api/anime';
import { formatOptions, statusOptions, ratingOptions } from '../constants/selectOptions';
import { QUERY_STALE_TIME } from '../constants/staleTime';

import AnimeList from '../features/anime/AnimeList';
import Filter from '../components/Filter';

const Browse = () => {
  let [searchParams] = useSearchParams();

  const { filter } = useParams();

  const location = useLocation();

  const isAnyValueNotPresent = ![...searchParams.values()].includes('any');

  const { isLoading, isError, data } = useQuery({
    queryKey: ['animeData', filter, location.search, isAnyValueNotPresent],
    queryFn: () => {
      if (location.search && isAnyValueNotPresent) {
        return fetchFilteredAnime(location.search);
      } else {
        switch (filter) {
          case 'top':
            return fetchTopAnime();
          case 'upcoming':
            return fetchUpcomingAnime();
          default:
            return fetchAiringAnime();
        }
      }
    },
    staleTime: QUERY_STALE_TIME,
  });

  return (
    <div>
      <div className='flex justify-start'>
        <Filter title='format' type='type' options={formatOptions} />
        <Filter type='status' options={statusOptions} />
        <Filter type='rating' options={ratingOptions} />
      </div>
      <AnimeList isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default Browse;
