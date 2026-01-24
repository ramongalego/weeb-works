import { InfiniteQueryObserverResult, InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { AnimeData } from '../../../types';

import AnimeGrid from './AnimeGrid';

type AnimeListProps = {
  data: InfiniteData<AnimeListData> | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<AnimeListData, unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  error: unknown;
};

type AnimeListData = {
  data: AnimeData;
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

  const uniqueAnime = data?.pages
    ?.flatMap((group) => group.data)
    ?.filter((anime, index, self) => index === self.findIndex((a) => a.mal_id === anime.mal_id));

  return (
    <div className='mt-10 w-full'>
      <AnimeGrid data={uniqueAnime} isLoading={isLoading} error={error} skeletonCount={25} />
      <div ref={ref}></div>
    </div>
  );
};

export default AnimeList;
