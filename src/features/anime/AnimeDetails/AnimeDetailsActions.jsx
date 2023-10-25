import { HeartIcon } from '@heroicons/react/24/solid';

const AnimeDetailsActions = () => {
  return (
    <div className='mt-2 flex justify-between text-white'>
      <button className='rounded bg-indigo-500 px-10 py-1'>Add to List</button>
      <button className='rounded bg-red-600 px-2 py-1'>
        <HeartIcon className='h-5 w-5' />
      </button>
    </div>
  );
};

export default AnimeDetailsActions;
