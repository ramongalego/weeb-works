import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchAiringAnime, fetchTopAnime, fetchUpcomingAnime } from '../api/anime';

import AnimeList from '../features/anime/AnimeList';

const Browse = () => {
  const { filter } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['animeData', filter],
    queryFn: () => {
      switch (filter) {
        case 'top':
          return fetchTopAnime();
        case 'upcoming':
          return fetchUpcomingAnime();
        default:
          return fetchAiringAnime();
      }
    },
    staleTime: 6000,
  });

  return (
    <div>
      <AnimeList isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default Browse;
