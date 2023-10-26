import userEvent from '@testing-library/user-event';

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';

import Filter from '../Filter';

const options = [
  { value: 'action', label: 'Action' },
  { value: 'drama', label: 'Drama' },
];

const FilterWithSearchParams = () => {
  const [searchParams] = useSearchParams();

  return (
    <div>
      <Filter type='genre' options={options} />
      <div data-testid='search-params'>{searchParams.toString()}</div>
    </div>
  );
};

describe('Filter component', () => {
  const renderWithRouter = (element, initialEntries = ['/']) => {
    return render(
      <Router initialEntries={initialEntries}>
        <Routes>
          <Route path='/*' element={element} />
        </Routes>
      </Router>,
    );
  };

  it('renders without crashing', () => {
    renderWithRouter(<Filter type='genre' options={options} />);

    screen.getByLabelText('genre');
  });

  it('renders options correctly', () => {
    renderWithRouter(<Filter type='genre' options={options} />);

    options.forEach(option => screen.getByText(option.label));
  });

  it('sets the initial dropdown value to Any when search params is empty', () => {
    renderWithRouter(<Filter type='genre' options={options} />);

    const optionValue = screen.getByLabelText('genre').value;
    expect(optionValue).toBe('any');
  });

  it('sets the initial dropdown value based on the search params', () => {
    renderWithRouter(<Filter type='genre' options={options} />, ['/anime?genre=action']);

    const optionValue = screen.getByLabelText('genre').value;
    expect(optionValue).toBe('action');
  });

  it('updates the search params when dropdown value changes', async () => {
    const user = userEvent.setup();

    renderWithRouter(<FilterWithSearchParams />);

    await user.selectOptions(screen.getByLabelText('genre'), 'drama');

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('genre=drama');
  });

  it('removes value from search params when dropdown value changes to Any', async () => {
    const user = userEvent.setup();

    renderWithRouter(<FilterWithSearchParams />, ['/anime?genre=action']);

    await user.selectOptions(screen.getByLabelText('genre'), 'any');

    const searchParams = screen.getByTestId('search-params');
    expect(searchParams).toHaveTextContent('');
  });
});
