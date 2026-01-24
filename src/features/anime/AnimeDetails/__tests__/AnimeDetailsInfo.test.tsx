import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { AnimeData } from '../../../../types';

import AnimeDetailsInfo from '../AnimeDetailsInfo';

const createMockAnimeData = (overrides: Partial<AnimeData> = {}): AnimeData => ({
  mal_id: 1,
  title_english: 'Test Anime',
  title: 'Test Anime JP',
  synopsis: 'A test synopsis',
  images: { jpg: { large_image_url: 'https://example.com/image.jpg' } },
  trailer: { embed_url: null },
  type: 'TV',
  episodes: 12,
  duration: '24 min',
  status: 'Finished Airing',
  score: 8.5,
  year: 2023,
  season: 'Fall',
  source: 'Manga',
  rating: 'PG-13',
  studios: [],
  themes: [],
  genres: [],
  ...overrides,
});

describe('AnimeDetailsInfo component', () => {
  it('renders without crashing', () => {
    render(<AnimeDetailsInfo data={createMockAnimeData()} />);
  });

  it('renders AnimeDetailsSection with correct data', () => {
    const mockData = createMockAnimeData({
      type: 'TV',
      season: 'Winter',
      themes: [{ mal_id: 1, name: 'Isekai' }],
    });

    render(<AnimeDetailsInfo data={mockData} />);

    screen.getByText('TV');
    screen.getByText('Winter');
    screen.getByText('Isekai');
  });

  it('does not render AnimeDetailsSection components when data is falsy or unknown', () => {
    const mockData = createMockAnimeData({
      year: null,
      episodes: null,
    });

    render(<AnimeDetailsInfo data={mockData} />);

    expect(screen.queryByText('Year')).not.toBeInTheDocument();
    expect(screen.queryByText('Episodes')).not.toBeInTheDocument();
  });
});
