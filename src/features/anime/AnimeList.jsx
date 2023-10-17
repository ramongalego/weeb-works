import { useEffect, Fragment } from 'react';
import { useInView } from 'react-intersection-observer';

import AnimeItem from './AnimeItem';
import Loading from '../../components/Loading';

const AnimeList = ({ data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading, error }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const renderAnimeList = () => {
    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className='mt-4 grid gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.data?.map(anime => (
              <AnimeItem anime={anime} key={anime.mal_id} />
            ))}
          </Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className='w-full mt-14'>
      {renderAnimeList()}
      <div ref={ref} disabled={!hasNextPage || isFetchingNextPage}></div>
    </div>
  );
};

export default AnimeList;
