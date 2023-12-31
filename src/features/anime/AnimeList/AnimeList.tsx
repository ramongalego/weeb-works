import { InfiniteQueryObserverResult, InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { AnimeData } from '../../../types';

import AnimeGrid from './AnimeGrid';

type AnimeListProps = {
  data: InfiniteData<AnimeListData> | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<AnimeListData, unknown>>;
  isLoading: boolean;
  error: unknown;
};

type AnimeListData = {
  data: AnimeData;
};

const AnimeList = ({ data, fetchNextPage, isLoading, error }: AnimeListProps) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className='mt-10 w-full'>
      <AnimeGrid
        data={data?.pages?.flatMap(group => group.data)}
        isLoading={isLoading}
        error={error}
        skeletonCount={25}
      />
      <div ref={ref}></div>
    </div>
  );
};

export default AnimeList;
