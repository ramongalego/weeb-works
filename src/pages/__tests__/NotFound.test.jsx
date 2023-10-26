import { describe, it } from 'vitest';
import { screen, render } from '@testing-library/react';

import NotFound from '../NotFound';

describe('NotFound component', () => {
  it('renders without crashing', () => {
    render(<NotFound />);

    screen.getByText('404');
    screen.getByText('Not Found');
  });
});
