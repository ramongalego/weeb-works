import { TagIcon } from '@heroicons/react/24/outline';

const FilterTag = ({ title, value }) => (
  <div className='mt-8 flex items-center justify-center text-sm sm:justify-start'>
    <TagIcon className='mr-4 h-6 w-6 text-gray-500' />
    <h1 className=' rounded-lg bg-indigo-500 px-3 py-1 text-white'>
      {title}: <span className='font-bold capitalize'>{value}</span>
    </h1>
  </div>
);

export default FilterTag;
