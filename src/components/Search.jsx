import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Search = ({ isNavbar }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/anime?q=${inputRef.current.value}`);
    inputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className='relative flex'>
      <span className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
      </span>
      <input
        ref={inputRef}
        className={`${
          isNavbar
            ? 'py-2 pl-11 pr-4 rounded-md text-gray-800 outline-none w-64'
            : 'w-full p-5 pl-12 text-xl rounded-md outline-none'
        }`}
        placeholder={isNavbar ? 'Search WeebWorks' : 'What are you searching for?'}
      />
    </form>
  );
};

export default Search;
