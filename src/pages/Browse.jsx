import { useParams, useLocation, useSearchParams } from 'react-router-dom';

import Filter from '../components/Filter';
import FilterTag from '../components/FilterTag';
import { FORMAT_OPTIONS, STATUS_OPTIONS, RATING_OPTIONS } from '../constants/selectOptions';
import { AnimeList } from '../features/anime/AnimeList';
import { useGenresQuery, useInfiniteAnimeDataQuery } from '../hooks/queryHooks';

const renderFilterSection = genres => (
  <div className='-mt-10 flex flex-col items-center justify-between sm:-mt-0 sm:flex-row'>
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
    <div className='mx-auto mb-8 mt-14 max-w-7xl px-2 pt-20 sm:px-6 lg:px-8'>
      {renderFilterSection(useGenresQuery())}
      {searchQueryValue && <FilterTag title='Search' value={searchQueryValue} />}
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
