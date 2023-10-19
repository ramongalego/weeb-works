import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const Filter = ({ type, options, title }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState();

  const handleChange = e => {
    setSelectedFilter(e.target.value);

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
    if (selectedFilter === 'any') removeQueryParam();
  }, [removeQueryParam, selectedFilter]);

  useEffect(() => {
    if (searchParams.get(type)) {
      setSelectedFilter(searchParams.get(type));
    }
  }, [searchParams, type]);

  return (
    <div className='flex flex-col'>
      <label htmlFor='genres' className='mb-2 text-sm font-medium capitalize'>
        {title || type}
      </label>
      <select
        id={type}
        className='bg-gray-50 border border-gray-300 text-sm rounded-lg block w-52 p-2.5 outline-none '
        onChange={handleChange}
        value={selectedFilter}
      >
        <option value='any'>Any</option>
        {options?.map(option => (
          <option value={option.value || option.mal_id} key={option.value || option.mal_id}>
            {option.label || option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
