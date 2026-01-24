import { useSearchParams } from 'react-router-dom';

import { GenreFilterOptions } from '../types';

type FilterProps = {
  type: string;
  options: FilterOptions[] | GenreFilterOptions[];
  title?: string;
};

type FilterOptions = {
  value: string;
  label: string;
};

const isGenresFilter = (
  option: FilterOptions | GenreFilterOptions,
): option is GenreFilterOptions => {
  return 'mal_id' in option;
};

const Filter = ({ type, options, title }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedFilter = searchParams.get(type) ?? 'any';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setSearchParams(prev => {
      if (value === 'any') {
        prev.delete(type);
      } else {
        prev.set(type, value);
      }
      return prev;
    });
  };

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
