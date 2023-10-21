import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { fetchAnimeGenres, fetchAnimeData } from '../api/animeService';
import { FORMAT_OPTIONS, STATUS_OPTIONS, RATING_OPTIONS } from '../constants/selectOptions';
import { QUERY_STALE_TIME } from '../constants/fetchOptions';

import AnimeList from '../features/anime/AnimeList';
import Filter from '../components/Filter';
import SearchTag from '../components/SearchTag';

const renderFilterSection = genres => (
  <div className='flex justify-between'>
    <Filter title='format' type='type' options={FORMAT_OPTIONS} />
    <Filter type='status' options={STATUS_OPTIONS} />
    <Filter type='rating' options={RATING_OPTIONS} />
    <Filter type='genres' options={genres.data} />
  </div>
);

const Browse = () => {
  const { filter } = useParams();
  const location = useLocation();
  let [searchParams] = useSearchParams();

  const searchQueryValue = searchParams.get('q');

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

  const genresQuery = useQuery({
    queryKey: ['animeGenres'],
    queryFn: fetchAnimeGenres,
    staleTime: QUERY_STALE_TIME,
  });

  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-14 mb-8'>
      {renderFilterSection(genresQuery)}
      {searchQueryValue && <SearchTag value={searchQueryValue} />}
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
