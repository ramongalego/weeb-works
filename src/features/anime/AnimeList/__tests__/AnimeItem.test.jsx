import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import AnimeItem from '../AnimeItem';

const renderWithRouter = element =>
  render(
    <Router>
      <Routes>
        <Route path='/' element={element} />
        <Route path='/anime/details/:id' element={<div>AnimeDetails Page</div>} />
      </Routes>
    </Router>,
  );

describe('AnimeItem component', () => {
  const mockAnime = {
    mal_id: 1,
    images: {
      jpg: {
        large_image_url: 'https://example.com/anime.jpg',
      },
    },
    title_english: 'Naruto',
    title: 'ナルト',
  };

  it('renders AnimeItem correctly', () => {
    renderWithRouter(<AnimeItem anime={mockAnime} />);

    screen.getByText('Naruto');

    const animeImage = screen.getByAltText('Naruto');
    expect(animeImage).toHaveAttribute('src', 'https://example.com/anime.jpg');
  });

  it('navigates to the correct path on click', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AnimeItem anime={mockAnime} />);

    const linkElement = screen.getByRole('link');
    await user.click(linkElement);

    screen.getByText('AnimeDetails Page');
  });

  it('renders the default title if the english title is not available', () => {
    const mockAnimeWithoutEnglishTitle = {
      mal_id: 1,
      images: {
        jpg: {
          large_image_url: 'https://example.com/anime.jpg',
        },
      },
      title: 'ナルト',
    };

    renderWithRouter(<AnimeItem anime={mockAnimeWithoutEnglishTitle} />);

    screen.getByText('ナルト');
  });
});
