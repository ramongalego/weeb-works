import { fetchAiringAnime, fetchUpcomingAnime, fetchTopAnime } from '../api/animeService';
import { ANIME_LIST_PREVIEW_CONFIG } from '../constants/fetchOptions';
import { useAnimePreviewListQuery } from '../hooks/queryHooks';
import { AnimeListPreview } from '../features/anime/AnimeList';

import Search from '../components/Search';

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

  const airingAnimeQuery = useAnimePreviewListQuery('airing', fetchAiringAnime);
  const upcomingAnimeQuery = useAnimePreviewListQuery('upcoming', fetchUpcomingAnime);
  const topAnimeQuery = useAnimePreviewListQuery('top', fetchTopAnime);

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
