import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <span className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
      </span>
      <input
        ref={inputRef}
        className={`${
          isNavbar
            ? 'w-56 rounded-md py-2 pl-11 pr-4 text-gray-800 outline-none sm:w-64'
            : 'w-full rounded-md p-5 pl-12 text-xl outline-none'
        }`}
        placeholder={isNavbar ? 'Search WeebWorks' : 'What are you searching for?'}
      />
    </form>
  );
};

export default Search;
