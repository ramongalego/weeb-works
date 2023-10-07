import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ text, isNavbar }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleInput = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/anime?query=${input}`);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={`${
          isNavbar
            ? 'py-2 px-4 rounded-md text-gray-800 outline-none w-60'
            : 'w-full p-5 text-xl mt-6 rounded-md outline-none'
        }`}
        placeholder={text}
        onChange={handleInput}
        value={input}
      />
    </form>
  );
};

export default Search;
