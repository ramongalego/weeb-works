import { useQuery } from '@tanstack/react-query';
import { fetchAnimeById } from '../../api/anime';
import { QUERY_STALE_TIME } from '../../constants/fetchOptions';
import { useParams } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';

const AnimeDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['animeDetails', id],
    queryFn: () => fetchAnimeById(id),
    stateTime: QUERY_STALE_TIME,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div>
      <div className='h-72 bg-gray-50'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-10 mb-8 flex'>
          <div className='w-64 h-72 rounded'>
            <img
              src={data.images.jpg.large_image_url}
              alt={data.title_english}
              className='w-full h-full rounded'
            />
            <div className='flex justify-between text-white mt-4'>
              <button className='bg-indigo-500 py-1 px-10 rounded'>Add to List</button>
              <button className='bg-red-600 py-1 px-2 rounded'>
                <HeartIcon className='h-5 w-5' />
              </button>
            </div>
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
    </div>
  );
};

export default AnimeDetails;
