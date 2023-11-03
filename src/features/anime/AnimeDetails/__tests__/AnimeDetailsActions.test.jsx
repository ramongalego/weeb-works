import { screen, render } from '@testing-library/react';
import { describe, it } from 'vitest';

import AnimeDetailsActions from '../AnimeDetailsActions';

describe('AnimeDetailsActions component', () => {
  it('renders without crashing', () => {
    render(<AnimeDetailsActions />);

    screen.getByText('Add to Watchlist');
  });
});
