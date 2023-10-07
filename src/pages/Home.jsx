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

  const renderAnimeList = (title, query) => (
    <AnimeList
      title={title}
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

      {renderAnimeList('Top Airing', airingAnimeQuery)}
      {renderAnimeList('Top Upcoming', upcomingAnimeQuery)}
      {renderAnimeList('Highest Rated', topAnimeQuery)}
    </div>
  );
};

export default Home;
