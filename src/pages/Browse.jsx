import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import {
  fetchAiringAnime,
  fetchTopAnime,
  fetchUpcomingAnime,
  fetchFilteredAnime,
} from '../api/anime';
import { FORMAT_OPTIONS, STATUS_OPTIONS, RATING_OPTIONS } from '../constants/selectOptions';
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading } =
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

  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-14 mb-8'>
      <div className='flex justify-start'>
        <Filter title='format' type='type' options={FORMAT_OPTIONS} />
        <Filter type='status' options={STATUS_OPTIONS} />
        <Filter type='rating' options={RATING_OPTIONS} />
      </div>
      <AnimeList
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        data={data}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        error={error}
      />
    </div>
  );
};

export default Browse;
