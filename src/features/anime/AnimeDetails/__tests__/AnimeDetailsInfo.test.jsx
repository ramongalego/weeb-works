import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import AnimeDetailsInfo from '../AnimeDetailsInfo';

describe('AnimeDetailsInfo component', () => {
  it('renders without crashing', () => {
    render(<AnimeDetailsInfo data={{}} />);
  });

  it('renders AnimeDetailsSection with correct data', () => {
    const mockData = {
      type: 'TV',
      season: 'Winter',
      themes: [{ name: 'Isekai' }],
    };

    render(<AnimeDetailsInfo data={mockData} />);

    screen.getByText('TV');
    screen.getByText('Winter');
    screen.getByText('Isekai');
  });

  it('does not render AnimeDetailsSection components when data is falsy or unknown', () => {
    const mockData = {
      year: null,
      episodes: 'Unknown',
    };

    render(<AnimeDetailsInfo data={mockData} />);

    expect(screen.queryByText('Year')).not.toBeInTheDocument();
    expect(screen.queryByText('Episodes')).not.toBeInTheDocument();
  });
});
