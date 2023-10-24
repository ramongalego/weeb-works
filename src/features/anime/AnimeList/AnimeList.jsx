import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import AnimeGrid from './AnimeGrid';

const AnimeList = ({ data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading, error }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className='w-full mt-10'>
      <AnimeGrid
        data={data?.pages?.flatMap(group => group.data)}
        isLoading={isLoading}
        error={error}
      />
      <div ref={ref} disabled={!hasNextPage || isFetchingNextPage}></div>
    </div>
  );
};

export default AnimeList;
