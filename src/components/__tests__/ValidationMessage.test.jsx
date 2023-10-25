import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import ValidationMessage from '../ValidationMessage';

describe('ValidationMessage component', () => {
  render(<ValidationMessage message='Test message' />);

  it('renders without crashing with correct message', () => {
    screen.getByText('Test message');
  });
});
