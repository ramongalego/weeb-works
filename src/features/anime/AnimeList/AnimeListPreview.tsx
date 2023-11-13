import { Link } from 'react-router-dom';

import { AnimeData } from '../../../types';

import AnimeGrid from './AnimeGrid';


type AnimeListPreviewProps = {
  path: string;
  title: string;
  data: AnimeData[] | undefined;
  isLoading: boolean;
  error: unknown;
};

const AnimeListPreview = ({ path, title, data, isLoading, error }: AnimeListPreviewProps) => {
  return (
    <div className='mt-14 w-full'>
      <div className='flex items-end justify-between'>
        <h1 className='cursor-pointer text-2xl text-gray-500 hover:text-gray-800'>
          <Link to={path}>{title}</Link>
        </h1>
        <p className='cursor-pointer text-sm text-gray-500 hover:text-gray-800'>
          <Link to={path}>View All</Link>
        </p>
      </div>
      <AnimeGrid data={data} isLoading={isLoading} error={error} skeletonCount={7} />
    </div>
  );
};

export default AnimeListPreview;
