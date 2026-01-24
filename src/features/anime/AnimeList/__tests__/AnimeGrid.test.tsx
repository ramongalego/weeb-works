import { screen, render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
import { describe, it } from 'vitest';

import { AnimeData } from '../../../../types';

import AnimeGrid from '../AnimeGrid';

describe('AnimeGrid component', () => {
  it('renders the SkeletonLoading component when isLoading is true', () => {
    render(<AnimeGrid isLoading={true} data={undefined} error={null} skeletonCount={12} />);

    screen.getAllByTestId('skeleton-loading');
  });

  it('renders the Error component with error message when error is truthy', () => {
    const errorMessage = 'Something went wrong';

    render(<AnimeGrid error={{ message: errorMessage }} isLoading={false} data={undefined} skeletonCount={12} />);

    screen.getByText(errorMessage);
  });

  it('renders the Error component with No Results message when data is empty', () => {
    render(<AnimeGrid data={[]} isLoading={false} error={null} skeletonCount={12} />);

    screen.getByText('No Results');
  });

  it('renders AnimeItem components when data is provided', () => {
    const mockAnime: AnimeData[] = [
      {
        mal_id: 1,
        images: {
          jpg: {
            large_image_url: 'https://example.com/anime.jpg',
          },
        },
        title_english: 'Naruto',
        title: 'ナルト',
        synopsis: 'A ninja anime',
        trailer: { embed_url: null },
        type: 'TV',
        episodes: 220,
        duration: '24 min',
        status: 'Finished Airing',
        score: 8.0,
        year: 2002,
        season: 'Fall',
        source: 'Manga',
        rating: 'PG-13',
        studios: [],
        themes: [],
        genres: [],
      },
    ];

    render(
      <StaticRouter location='/'>
        <AnimeGrid data={mockAnime} isLoading={false} error={null} skeletonCount={12} />
      </StaticRouter>,
    );

    mockAnime.forEach(item => {
      screen.getByText(item.title_english!);
    });
  });
});
