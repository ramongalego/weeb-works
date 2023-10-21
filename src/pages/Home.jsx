import { useQuery } from '@tanstack/react-query';
import { fetchAiringAnime, fetchUpcomingAnime, fetchTopAnime } from '../api/animeService';
import {
  QUERY_STALE_TIME,
  INITIAL_PAGE,
  PREVIEW_LIMIT,
  ANIME_LIST_PREVIEW_CONFIG,
} from '../constants/fetchOptions';

import AnimeListPreview from '../features/anime/AnimeListPreview';
import Search from '../components/Search';

const queryConfig = (queryType, queryFn) => ({
  queryKey: [`${queryType}Anime`],
  queryFn: () => queryFn(INITIAL_PAGE, PREVIEW_LIMIT),
  staleTime: QUERY_STALE_TIME,
});

const renderAnimeListPreview = (title, path, query) => (
  <AnimeListPreview
    title={title}
    path={path}
    isLoading={query.isLoading}
    error={query.error}
    data={query.data?.data}
  />
);

const Home = () => {
  const { topAiring, topUpcoming, highestRated } = ANIME_LIST_PREVIEW_CONFIG;

  const airingAnimeQuery = useQuery(queryConfig('airing', fetchAiringAnime));
  const upcomingAnimeQuery = useQuery(queryConfig('upcoming', fetchUpcomingAnime));
  const topAnimeQuery = useQuery(queryConfig('top', fetchTopAnime));

  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-20 mb-8'>
      <h1 className='text-3xl mb-6'>Explore Anime</h1>
      <Search text='What are you searching for?' />

      {renderAnimeListPreview(topAiring.title, topAiring.path, airingAnimeQuery)}
      {renderAnimeListPreview(topUpcoming.title, topUpcoming.path, upcomingAnimeQuery)}
      {renderAnimeListPreview(highestRated.title, highestRated.path, topAnimeQuery)}
    </div>
  );
};

export default Home;
