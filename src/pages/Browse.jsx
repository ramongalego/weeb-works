import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { FORMAT_OPTIONS, STATUS_OPTIONS, RATING_OPTIONS } from '../constants/selectOptions';
import { useGenresQuery, useInfiniteAnimeDataQuery } from '../hooks/queryHooks';

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
    useInfiniteAnimeDataQuery(filter, location, isAnyValueNotPresent);

  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-14 mb-8'>
      {renderFilterSection(useGenresQuery())}
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
