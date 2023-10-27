import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { describe, beforeEach, it } from 'vitest';

const renderWithRouter = element =>
  render(
    <Router initialEntries={['/']}>
      <Routes>
        <Route path='/anime' element={<div>Browse Page</div>} />
        <Route path='/' element={element} />
      </Routes>
    </Router>,
  );

import Search from '../Search';

describe('Search component', () => {
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
