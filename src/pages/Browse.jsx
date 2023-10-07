import { useQuery } from '@tanstack/react-query';
import { fetchAiringAnime } from '../api/anime';

import AnimeList from '../features/anime/AnimeList';

const Browse = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['airingAnimeFull'],
    queryFn: () => fetchAiringAnime(null),
    staleTime: 6000,
  });

  return (
    <div>
      <p>Browse</p>
      <AnimeList isLoading={isLoading} isError={isError} data={data} />
    </div>
  );
};

export default Browse;
