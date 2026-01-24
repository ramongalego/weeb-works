import { screen, render } from '@testing-library/react';
import { describe, it } from 'vitest';

import { AnimeData } from '../../../../types';

import AnimeDetailsActions from '../AnimeDetailsActions';

const mockAnimeData: AnimeData = {
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
};

describe('AnimeDetailsActions component', () => {
  it('renders without crashing', () => {
    render(<AnimeDetailsActions data={mockAnimeData} />);

    screen.getByText('Add to List');
  });
});
