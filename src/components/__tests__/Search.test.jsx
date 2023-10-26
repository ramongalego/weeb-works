import userEvent from '@testing-library/user-event';

import { describe, beforeEach, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Search from '../Search';

describe('Search component', () => {
  const renderWithRouter = element =>
    render(
      <Router initialEntries={['/']}>
        <Routes>
          <Route path='/anime' element={<h1>Browse Page</h1>} />
          <Route path='/' element={element} />
        </Routes>
      </Router>,
    );

  beforeEach(() => {
    renderWithRouter(<Search isNavbar={true} />);
  });

  it('renders without crashing', () => {
    screen.getByRole('textbox');
  });

  it('navigates to the correct URL on form submission', async () => {
    const user = userEvent.setup();

    const input = screen.getByRole('textbox');

    await user.type(input, 'naruto{enter}');

    screen.getByText('Browse Page');
  });

  it('displays the correct placeholder when isNavbar is true', () => {
    screen.getByPlaceholderText('Search WeebWorks');
  });

  it('displays the correct placeholder when isNavbar is false', () => {
    renderWithRouter(<Search isNavbar={false} />);

    screen.getByPlaceholderText('What are you searching for?');
  });
});
