import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

type FilterProps = {
  type: string;
  options: FilterOptions[] | GenreFilterOptions[];
  title?: string;
};

type FilterOptions = {
  value: string;
  label: string;
};

type GenreFilterOptions = {
  mal_id: number;
  name: string;
};

const isGenresFilter = (
  option: FilterOptions | GenreFilterOptions,
): option is GenreFilterOptions => {
  return 'mal_id' in option;
};

const Filter = ({ type, options, title }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    const paramsValue = searchParams.get(type);

    if (paramsValue !== null) {
      setSelectedFilter(paramsValue);
    }
  }, [searchParams, type]);

  return (
    <div className='mt-4 flex flex-col sm:mt-0'>
      <label htmlFor={type} className='mb-2 text-sm font-medium capitalize'>
        {title || type}
      </label>
      <select
        id={type}
        aria-label={title || type}
        className='block w-72 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm outline-none sm:w-52'
        onChange={handleChange}
        value={selectedFilter}
      >
        <option value='any'>Any</option>
        {options?.map(option => {
          if (isGenresFilter(option)) {
            return (
              <option value={option.mal_id} key={option.mal_id}>
                {option.name}
              </option>
            );
          }

          return (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
