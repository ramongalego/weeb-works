import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { fetchAnimeById, fetchAnimeGenres, fetchAnimeData } from '../api/animeService';
import { QUERY_STALE_TIME, INITIAL_PAGE, PREVIEW_LIMIT } from '../constants/fetchOptions';
import { AnimeData, AnimeListResponse, GenreFilterOptions } from '../types';

export const useGenresQuery = () =>
  useQuery<GenreFilterOptions[]>({
    queryKey: ['animeGenres'],
    queryFn: fetchAnimeGenres,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

export const useAnimePreviewListQuery = <T>(
  queryType: string,
  queryFn: (page: number, limit: number) => Promise<T>,
) =>
  useQuery({
    queryKey: [`${queryType}Anime`],
    queryFn: () => queryFn(INITIAL_PAGE, PREVIEW_LIMIT),
    staleTime: QUERY_STALE_TIME,
  });

export const useAnimeDetailsQuery = (id: string) => {
  const { data, isLoading, error } = useQuery<AnimeData>({
    queryKey: ['animeDetails', id],
    queryFn: () => fetchAnimeById(id),
    staleTime: QUERY_STALE_TIME,
    // Retry logic handled by global QueryClient config
  });

  return { data, isLoading, error };
};

export const useInfiniteAnimeDataQuery = (
  filter: string | undefined,
  location: { search: string },
  isAnyValueNotPresent: boolean,
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading, isPreviousData } =
    useInfiniteQuery<AnimeListResponse>({
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
      keepPreviousData: true,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isLoading, isPreviousData };
};
