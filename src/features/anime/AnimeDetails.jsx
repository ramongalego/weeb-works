import { useQuery } from '@tanstack/react-query';
import { fetchAnimeById } from '../../api/anime';
import { QUERY_STALE_TIME } from '../../constants/fetchOptions';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AnimeDetailsInfo from './AnimeDetailsInfo';
import AnimeDetailsActions from './AnimeDetailsActions';

const AnimeDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['animeDetails', id],
    queryFn: () => fetchAnimeById(id),
    stateTime: QUERY_STALE_TIME,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  console.log(data);

  return (
    <>
      <div className='h-80 bg-gray-50'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-14 mb-8 flex'>
          <div className='w-64 h-72 rounded'>
            <img
              src={data.images.jpg.large_image_url}
              alt={data.title_english}
              className='w-full h-full rounded'
            />
          </div>
          <div className='px-10 w-full text-gray-500'>
            <h1 className='text-2xl'>{data.title_english || data.title}</h1>
            <p
              className='mt-6'
              style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 7,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {data.synopsis}
            </p>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8 flex'>
        <div className='w-64'>
          <AnimeDetailsActions />
          <AnimeDetailsInfo data={data} />
        </div>
        <div className='px-10 w-full text-gray-500 mt-24'>{/* Center Content */}</div>
      </div>
    </>
  );
};

export default AnimeDetails;
