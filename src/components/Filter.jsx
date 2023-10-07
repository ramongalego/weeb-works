import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const Filter = ({ type, options }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState();

  const handleChange = e => {
    setSelected(e.target.value);

    searchParams.set(type, e.target.value);
    setSearchParams(searchParams);
  };

  const removeQueryParam = useCallback(() => {
    const param = searchParams.get(type);

    if (param) {
      searchParams.delete(type);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, type]);

  useEffect(() => {
    if (selected === 'any') removeQueryParam();
  }, [removeQueryParam, selected]);

  return (
    <div className='flex flex-col'>
      <label htmlFor='genres' className='mb-2 text-sm font-medium capitalize'>
        {type}
      </label>
      <select
        id={type}
        className='bg-gray-50 border border-gray-300 text-sm rounded-lg block w-44 p-2.5 outline-none'
        onChange={handleChange}
        value={selected}
      >
        {options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
