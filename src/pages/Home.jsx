import { useQuery } from '@tanstack/react-query';
import { fetchTopAnime, fetchUpcomingAnime } from '../api/anime';

import AnimeCards from '../features/anime/AnimeCards';
import Search from '../components/Search';

const Home = () => {
  const popularAnimeQuery = useQuery({
    queryKey: ['topAnime'],
    queryFn: () => fetchTopAnime(7),
    staleTime: 60000,
  });

  const upcomingAnimeQuery = useQuery({
    queryKey: ['upcomingAnime'],
    queryFn: () => fetchUpcomingAnime(7),
    staleTime: 60000,
  });

  const renderAnimeCards = (title, query) => (
    <AnimeCards
      title={title}
      isPreview
      isLoading={query.isLoading}
      error={query.error}
      data={query.data}
      isFetching={query.isFetching}
    />
  );

  return (
    <div>
      <h1 className='text-4xl'>Explore Anime</h1>
      <Search text='What are you searching for?' />

      {renderAnimeCards('Popular', popularAnimeQuery)}
      {renderAnimeCards('Upcoming', upcomingAnimeQuery)}
    </div>
  );
};

export default Home;
