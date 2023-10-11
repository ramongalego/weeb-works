import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import {
  fetchAiringAnime,
  fetchTopAnime,
  fetchUpcomingAnime,
  fetchFilteredAnime,
} from '../api/anime';
import { formatOptions, statusOptions, ratingOptions } from '../constants/selectOptions';
import { QUERY_STALE_TIME } from '../constants/fetchOptions';

import AnimeList from '../features/anime/AnimeList';
import Filter from '../components/Filter';

const fetchAnimeData = async ({ page, filter, locationSearch, isAnyValueNotPresent }) => {
  if (locationSearch && isAnyValueNotPresent) {
    return fetchFilteredAnime(page, locationSearch);
  } else {
    switch (filter) {
      case 'top':
        return fetchTopAnime(page);
      case 'upcoming':
        return fetchUpcomingAnime(page);
      default:
        return fetchAiringAnime(page);
    }
  }
};

const Browse = () => {
  const { filter } = useParams();
  const location = useLocation();
  let [searchParams] = useSearchParams();

  const isAnyValueNotPresent = ![...searchParams.values()].includes('any');

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, error, status } =
    useInfiniteQuery({
      queryKey: ['animeData', filter, location.search, isAnyValueNotPresent],
      queryFn: ({ pageParam = 1 }) =>
        fetchAnimeData({
          page: pageParam,
          filter,
          locationSearch: location.search,
          isAnyValueNotPresent,
        }),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.pagination.has_next_page) {
          return pages.length + 1;
        }
        return undefined;
      },
      staleTime: QUERY_STALE_TIME,
    });

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (status === 'error') {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div>
      <div className='flex justify-start'>
        <Filter title='format' type='type' options={formatOptions} />
        <Filter type='status' options={statusOptions} />
        <Filter type='rating' options={ratingOptions} />
      </div>
      <AnimeList
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        data={data}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};

export default Browse;
