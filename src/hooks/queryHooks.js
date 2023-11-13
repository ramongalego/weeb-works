import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { fetchAnimeById, fetchAnimeGenres, fetchAnimeData } from '../api/animeService';
import { QUERY_STALE_TIME, INITIAL_PAGE, PREVIEW_LIMIT } from '../constants/fetchOptions';

export const useGenresQuery = () =>
  useQuery({
    queryKey: ['animeGenres'],
    queryFn: fetchAnimeGenres,
    staleTime: QUERY_STALE_TIME,
  });

export const useAnimePreviewListQuery = (queryType, queryFn) =>
  useQuery({
    queryKey: [`${queryType}Anime`],
    queryFn: () => queryFn(INITIAL_PAGE, PREVIEW_LIMIT),
    staleTime: QUERY_STALE_TIME,
  });

export const useAnimeDetailsQuery = id => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['animeDetails', id],
    queryFn: () => fetchAnimeById(id),
    staleTime: QUERY_STALE_TIME,
    retry: (_failureCount, error) => (error.response.status === 404 ? 0 : 3),
  });

  return { data, isLoading, error };
};

export const useInfiniteAnimeDataQuery = (filter, location, isAnyValueNotPresent) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading } =
    useInfiniteQuery(
      ['animeData', filter, location.search, isAnyValueNotPresent],
      ({ pageParam = 1 }) =>
        fetchAnimeData({
          page: pageParam,
          filter,
          locationSearch: location.search,
          isAnyValueNotPresent,
        }),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.pagination.has_next_page) {
            return pages.length + 1;
          }
          return undefined;
        },
        staleTime: QUERY_STALE_TIME,
      },
    );

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading };
};
