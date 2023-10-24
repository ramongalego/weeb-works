import { Link } from 'react-router-dom';

import AnimeGrid from './AnimeGrid';

const AnimeListPreview = ({ path, title, data, isLoading, error }) => {
  return (
    <div className='w-full mt-14'>
      <div className='flex items-end justify-between'>
        <h1 className='text-2xl text-gray-500 hover:text-gray-800 cursor-pointer'>
          <Link to={path}>{title}</Link>
        </h1>
        <p className='cursor-pointer text-sm text-gray-500 hover:text-gray-800'>
          <Link to={path}>View All</Link>
        </p>
      </div>
      <AnimeGrid data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default AnimeListPreview;
