import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import FilterTag from '../FilterTag';

describe('FilterTag component', () => {
  render(<FilterTag title='Search' value='Naruto' />);

  it('renders without crashing with correct title and value', () => {
    screen.getByText('Search:');
    screen.getByText('Naruto');
  });
});
