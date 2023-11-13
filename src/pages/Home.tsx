import { UseQueryResult } from '@tanstack/react-query';

import {
  fetchAiringAnime,
  fetchUpcomingAnime,
  fetchHighestRatedAnime,
  fetchMostPopularAnime,
} from '../api/animeService';
import Search from '../components/Search';
import { ANIME_LIST_PREVIEW_CONFIG } from '../constants/fetchOptions';
import { AnimeListPreview } from '../features/anime/AnimeList';
import { useAnimePreviewListQuery } from '../hooks/queryHooks';
import { AnimeData } from '../types';

type AnimeListData = {
  data: AnimeData[];
};

const renderAnimeListPreview = (
  title: string,
  path: string,
  query: UseQueryResult<AnimeListData, unknown>,
) => (
  <AnimeListPreview
    title={title}
    path={path}
    isLoading={query.isLoading}
    error={query.error}
    data={query.data?.data}
  />
);

const Home = () => {
  const { topAiring, topUpcoming, mostPopular, highestRated } = ANIME_LIST_PREVIEW_CONFIG;

  const airingAnimeQuery = useAnimePreviewListQuery('airing', fetchAiringAnime);
  const upcomingAnimeQuery = useAnimePreviewListQuery('upcoming', fetchUpcomingAnime);
  const topAnimeQuery = useAnimePreviewListQuery('top', fetchHighestRatedAnime);
  const popularAnimeQuery = useAnimePreviewListQuery('popular', fetchMostPopularAnime);

  return (
    <div className='mx-auto mb-8 mt-10 max-w-7xl px-2 pt-20 sm:mt-20 sm:px-6 lg:px-8'>
      <h1 className='mb-6 text-3xl'>Explore Anime</h1>
      <Search />

      {renderAnimeListPreview(topAiring.title, topAiring.path, airingAnimeQuery)}
      {renderAnimeListPreview(topUpcoming.title, topUpcoming.path, upcomingAnimeQuery)}
      {renderAnimeListPreview(mostPopular.title, mostPopular.path, popularAnimeQuery)}
      {renderAnimeListPreview(highestRated.title, highestRated.path, topAnimeQuery)}
    </div>
  );
};

export default Home;
