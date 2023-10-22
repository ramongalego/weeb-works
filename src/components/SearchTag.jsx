import { TagIcon } from '@heroicons/react/24/outline';

const SearchTag = ({ value }) => (
  <div className='flex items-center mt-8 text-sm'>
    <TagIcon className='w-6 h-6 mr-4 text-gray-500' />
    <h1 className=' bg-indigo-500 text-white py-1 px-3 rounded-lg'>
      Search: <span className='capitalize font-bold'>{value}</span>
    </h1>
  </div>
);

export default SearchTag;
