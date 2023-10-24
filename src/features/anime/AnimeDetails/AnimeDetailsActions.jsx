import { HeartIcon } from '@heroicons/react/24/solid';

const AnimeDetailsActions = () => {
  return (
    <div className='flex justify-between text-white mt-2'>
      <button className='bg-indigo-500 py-1 px-10 rounded'>Add to List</button>
      <button className='bg-red-600 py-1 px-2 rounded'>
        <HeartIcon className='h-5 w-5' />
      </button>
    </div>
  );
};

export default AnimeDetailsActions;
