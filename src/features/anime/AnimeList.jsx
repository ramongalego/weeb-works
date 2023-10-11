import { useEffect, Fragment } from 'react';
import { useInView } from 'react-intersection-observer';

import AnimeItem from './AnimeItem';

const AnimeList = ({ data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className='w-full mt-14'>
      <div className='mt-4 grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.data?.map(anime => (
              <AnimeItem anime={anime} key={anime.mal_id} />
            ))}
          </Fragment>
        ))}
      </div>
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
};

export default AnimeList;
