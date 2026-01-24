import { InfiniteQueryObserverResult, InfiniteData } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { AnimeListResponse } from '../../../types';

import AnimeGrid from './AnimeGrid';

type AnimeListProps = {
  data: InfiniteData<AnimeListResponse> | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<AnimeListResponse, unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  error: unknown;
};

const AnimeList = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  error,
}: AnimeListProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const uniqueAnime = useMemo(() => {
    if (!data?.pages) return undefined;

    const seen = new Set<number>();
    return data.pages.flatMap((group) => group.data).filter((anime) => {
      if (seen.has(anime.mal_id)) return false;
      seen.add(anime.mal_id);
      return true;
    });
  }, [data?.pages]);

  return (
    <div className='mt-10 w-full'>
      <AnimeGrid data={uniqueAnime} isLoading={isLoading} error={error} skeletonCount={25} />
      <div ref={ref}></div>
    </div>
  );
};

export default AnimeList;
