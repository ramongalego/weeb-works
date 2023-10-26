import userEvent from '@testing-library/user-event';

import { describe, it, beforeEach, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import Login from '../Login';

describe('Login component', () => {
  beforeEach(() =>
    render(
      <Router>
        <Login />
      </Router>,
    ),
  );

  it('renders without crashing', () => {
    screen.getByRole('button', { name: 'Login' });
  });

  it('renders and interacts with the input fields', async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await user.type(emailInput, 'test@email.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@email.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('renders a link to the signup page', () => {
    const linkElement = screen.getByRole('link', { name: /create an account/i });
    expect(linkElement.getAttribute('href')).toBe('/signup');
  });
});
