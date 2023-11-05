import { render, screen } from '@testing-library/react';
import { StaticRouter } from 'react-router-dom/server';
import { describe, beforeEach, it, expect } from 'vitest';

import Navbar from '../Navbar';

describe('Navbar component', () => {
  beforeEach(() => {
    render(
      <StaticRouter>
        <Navbar />
      </StaticRouter>,
    );
  });

  it('renders without crashing', () => {
    screen.getByRole('navigation');
  });

  it('renders the logo', () => {
    screen.getByAltText('WeebWorks');
  });

  it('renders the navigation links with correct URLs', () => {
    // const profileLink = screen.getByText('Profile').closest('a');
    const browseLink = screen.getByText('Browse').closest('a');
    const loginLink = screen.getByText('Login').closest('a');
    const signUpLink = screen.getByText('Sign Up').closest('a');

    // expect(profileLink).toHaveAttribute('href', '/user/Ankrath');
    expect(browseLink).toHaveAttribute('href', '/anime');
    expect(loginLink).toHaveAttribute('href', '/login');
    expect(signUpLink).toHaveAttribute('href', '/signup');
  });

  it('renders the search component', () => {
    screen.getByRole('textbox');
  });
});
