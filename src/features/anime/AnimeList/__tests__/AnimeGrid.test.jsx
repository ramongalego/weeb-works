import { screen, render } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
import { describe, it } from 'vitest';

import AnimeGrid from '../AnimeGrid';

describe('AnimeGrid component', () => {
  it('renders the SkeletonLoading component when isLoading is true', () => {
    render(<AnimeGrid isLoading={true} />);

    screen.getAllByTestId('skeleton-loading');
  });

  it('renders the Error component with error message when error is truthy', () => {
    const errorMessage = 'Something went wrong';

    render(<AnimeGrid error={{ message: errorMessage }} />);

    screen.getByText(errorMessage);
  });

  it('renders the Error component with No Results message when data is empty', () => {
    render(<AnimeGrid data={[]} />);

    screen.getByText('No Results');
  });

  it('renders AnimeItem components when data is provided', () => {
    const mockAnime = [
      {
        mal_id: 1,
        images: {
          jpg: {
            large_image_url: 'https://example.com/anime.jpg',
          },
        },
        title_english: 'Naruto',
        title: 'ナルト',
      },
    ];

    render(
      <StaticRouter>
        <AnimeGrid data={mockAnime} />
      </StaticRouter>,
    );

    mockAnime.forEach(item => {
      screen.getByText(item.title_english);
    });
  });
});
