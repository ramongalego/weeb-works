import { useQuery } from '@tanstack/react-query';
import { fetchAiringAnime, fetchUpcomingAnime, fetchTopAnime } from '../api/anime';

import AnimeList from '../features/anime/AnimeList';
import Search from '../components/Search';

const Home = () => {
  const airingAnimeQuery = useQuery({
    queryKey: ['airingAnime'],
    queryFn: () => fetchAiringAnime(7),
    staleTime: 60000,
  });

  const upcomingAnimeQuery = useQuery({
    queryKey: ['upcomingAnime'],
    queryFn: () => fetchUpcomingAnime(7),
    staleTime: 60000,
  });

  const topAnimeQuery = useQuery({
    queryKey: ['topAnime'],
    queryFn: () => fetchTopAnime(7),
    staleTime: 60000,
  });

  const renderAnimeList = (title, path, query) => (
    <AnimeList
      title={title}
      path={path}
      isPreview
      isLoading={query.isLoading}
      error={query.error}
      data={query.data}
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
