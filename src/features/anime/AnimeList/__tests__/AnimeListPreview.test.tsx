import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { describe, it, expect } from 'vitest';

import AnimeListPreview from '../AnimeListPreview';

const renderWithRouter = (element: ReactElement) =>
  render(
    <Router>
      <Routes>
        <Route path='/' element={element} />
        <Route path='/anime/airing' element={<div>Browse Page</div>} />
      </Routes>
    </Router>,
  );

describe('AnimeListPreview component', () => {
  const props = {
    path: '/anime/airing',
    title: 'Top Airing',
    data: [],
    isLoading: false,
    error: null,
  };

  it('renders the title and view all elements and links correctly', () => {
    renderWithRouter(<AnimeListPreview {...props} />);

    const titleLink = screen.getByRole('link', { name: props.title });
    expect(titleLink).toHaveAttribute('href', props.path);

    const viewAllLink = screen.getByRole('link', { name: 'View All' });
    expect(viewAllLink).toHaveAttribute('href', props.path);
  });

  it('navigates to the correct URL when clicking view all link', async () => {
    const user = userEvent.setup();

    renderWithRouter(<AnimeListPreview {...props} />);

    const viewAllLink = screen.getByRole('link', { name: 'View All' });
    await user.click(viewAllLink);

    screen.getByText('Browse Page');
  });
});
