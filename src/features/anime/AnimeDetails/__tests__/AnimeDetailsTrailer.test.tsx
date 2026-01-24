import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import AnimeDetailsTrailer from '../AnimeDetailsTrailer';

describe('AnimeDetailsTrailer component', () => {
  it('renders without crashing with the trailer player and correct url', () => {
    render(<AnimeDetailsTrailer trailerUrl='https://example.com' />);

    screen.getByText('Trailer');

    const trailerPlayer = screen.getByTitle('YouTube Trailer Player');
    expect(trailerPlayer).toHaveAttribute('src', 'https://example.com');
  });
});
