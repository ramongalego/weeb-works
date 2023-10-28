import { screen, render } from '@testing-library/react';
import { describe, it } from 'vitest';

import AnimeDetailsSection from '../AnimeDetailsSection';

describe('AnimeDetailsSection component', () => {
  it('renders correctly with title and data as a string', () => {
    render(<AnimeDetailsSection title='Format' data='TV' />);

    screen.getByText('Format');
    screen.getByText('TV');
  });

  it('renders correctly with title and data as an array of objects', () => {
    render(<AnimeDetailsSection title='Genres' data={[{ name: 'Action' }, { name: 'Romance' }]} />);

    screen.getByText('Genres');
    screen.getByText('Action');
    screen.getByText('Romance');
  });
});
