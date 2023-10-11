import { useQuery } from '@tanstack/react-query';
import { fetchAiringAnime, fetchUpcomingAnime, fetchTopAnime } from '../api/anime';
import { QUERY_STALE_TIME, INITIAL_PAGE, PREVIEW_LIMIT } from '../constants/fetchOptions';

import AnimeListPreview from '../features/anime/AnimeListPreview';
import Search from '../components/Search';

const Home = () => {
  const airingAnimeQuery = useQuery({
    queryKey: ['airingAnime'],
    queryFn: () => fetchAiringAnime(INITIAL_PAGE, PREVIEW_LIMIT),
    staleTime: QUERY_STALE_TIME,
  });

  const upcomingAnimeQuery = useQuery({
    queryKey: ['upcomingAnime'],
    queryFn: () => fetchUpcomingAnime(INITIAL_PAGE, PREVIEW_LIMIT),
    staleTime: QUERY_STALE_TIME,
  });

  const topAnimeQuery = useQuery({
    queryKey: ['topAnime'],
    queryFn: () => fetchTopAnime(INITIAL_PAGE, PREVIEW_LIMIT),
    staleTime: QUERY_STALE_TIME,
  });

  const renderAnimeList = (title, path, query) => (
    <AnimeListPreview
      title={title}
      path={path}
      isLoading={query.isLoading}
      error={query.error}
      data={query.data?.data}
    />
  );

  return (
    <div>
      <h1 className='text-4xl'>Explore Anime</h1>
      <Search text='What are you searching for?' />

      {renderAnimeList('Top Airing', '/anime/airing', airingAnimeQuery)}
      {renderAnimeList('Top Upcoming', '/anime/upcoming', upcomingAnimeQuery)}
      {renderAnimeList('Highest Rated', '/anime/top', topAnimeQuery)}
    </div>
  );
};

export default Home;
