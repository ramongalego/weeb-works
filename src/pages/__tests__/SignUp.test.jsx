import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, beforeEach, expect } from 'vitest';

import SignUp from '../SignUp';

describe('SignUp component', () => {
  beforeEach(() =>
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    ),
  );

  it('should render without crashing', () => {
    screen.getByRole('button', { name: /sign up/i });
  });

  it('renders and interacts with the input fields', async () => {
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText('Email');
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const passwordConfirmationInput = screen.getByPlaceholderText('Confirm Password');

    await user.type(emailInput, 'test@email.com');
    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.type(passwordConfirmationInput, 'password123');

    expect(emailInput).toHaveValue('test@email.com');
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
    expect(passwordConfirmationInput).toHaveValue('password123');
  });

  it('displays validation error for invalid email', async () => {
    const user = userEvent.setup();

    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    const emailInput = screen.getByPlaceholderText('Email');

    await user.type(emailInput, 'invalid email');
    user.click(signUpButton);

    screen.findByText('The email should be a valid email address');
  });
});
