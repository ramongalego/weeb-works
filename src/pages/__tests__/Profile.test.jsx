import { describe, it } from 'vitest';
import { screen, render } from '@testing-library/react';

import Profile from '../Profile';

describe('Profile component', () => {
  it('should render without crashing', () => {
    render(<Profile />);

    screen.getByText('Ankrath');
  });
});
