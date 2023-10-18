import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const Search = ({ text, isNavbar }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleInput = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/anime?q=${input}`);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='relative flex'>
      <span className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
      </span>
      <input
        className={`${
          isNavbar
            ? 'py-2 pl-11 pr-4 rounded-md text-gray-800 outline-none w-64'
            : 'w-full p-5 pl-12 text-xl rounded-md outline-none'
        }`}
        placeholder={text}
        onChange={handleInput}
        value={input}
      />
    </form>
  );
};

export default Search;
