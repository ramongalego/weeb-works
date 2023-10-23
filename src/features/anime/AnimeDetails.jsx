import { useParams } from 'react-router-dom';
import { useAnimeDetailsQuery } from '../../hooks/queryHooks';

import NotFound from '../../pages/NotFound';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AnimeDetailsInfo from './AnimeDetailsInfo';
import AnimeDetailsActions from './AnimeDetailsActions';
import AnimeDetailsTrailer from './AnimeDetailsTrailer';

const AnimeDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useAnimeDetailsQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    if (error.response.status === 404) {
      return <NotFound />;
    }

    return <Error message={error.message} />;
  }

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
        <div className='px-10 w-full text-gray-500 mt-24'>
          {data.trailer.embed_url && <AnimeDetailsTrailer trailerUrl={data.trailer.embed_url} />}
        </div>
      </div>
    </>
  );
};

export default AnimeDetails;
