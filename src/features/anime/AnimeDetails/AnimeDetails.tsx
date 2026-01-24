import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import { useAnimeDetailsQuery } from '../../../hooks/queryHooks';
import NotFound from '../../../pages/NotFound';

import AnimeDetailsActions from './AnimeDetailsActions';
import AnimeDetailsInfo from './AnimeDetailsInfo';
import AnimeDetailsTrailer from './AnimeDetailsTrailer';

const AnimeDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useAnimeDetailsQuery(id!);

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof AxiosError) {
    if (error.response && error.response.status === 404) {
      return <NotFound />;
    }

    return <Error message={error.message} />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <div className='mt-20 h-80 bg-gray-50'>
        <div className='mx-auto mb-8 flex max-w-7xl flex-col items-center px-2 pt-14 sm:flex-row sm:items-start sm:px-6 lg:px-8'>
          <div className='h-72 w-64 rounded'>
            <img
              src={data.images.jpg.large_image_url}
              alt={data.title_english ?? data.title}
              loading='eager'
              className='h-full w-full rounded'
            />
          </div>
          <div className='mt-16 w-full px-10 text-center text-gray-500 sm:mt-0 sm:text-left'>
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

      <div className='mx-auto my-8 flex max-w-7xl flex-col items-center px-2 sm:flex-row sm:items-start sm:px-6 lg:px-8'>
        <div className='w-64 sm:w-64'>
          <AnimeDetailsActions data={data} />
          <AnimeDetailsInfo data={data} />
        </div>
        <div className='mt-10 w-full px-0 text-gray-500 sm:mt-24 sm:px-10'>
          {data.trailer.embed_url && <AnimeDetailsTrailer trailerUrl={data.trailer.embed_url} />}
        </div>
      </div>
    </>
  );
};

export default AnimeDetails;
