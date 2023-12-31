/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, render } from '@testing-library/react';
import {
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';
import { MemoryRouter, Routes, Route } from 'react-router';
import { describe, it, expect } from 'vitest';

import Browse from '../Browse';

describe('Browse component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = () => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/anime']}>
        <Routes>
          <Route path='/anime' element={<Browse />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  it('renders filters', () => {
    render(<Wrapper />);

    screen.getAllByRole('combobox');
  });

  it('renders genre options correctly', async () => {
    render(<Wrapper />);

    const genreOptions = await screen.findAllByText('Mock Genre');

    expect(genreOptions).toHaveLength(3);
  });

  it('renders data correctly when it is fetched', async () => {
    render(<Wrapper />);

    const itemsTitle = await screen.findAllByText('Mock Title');
    const itemsImage = await screen.findAllByAltText('Mock Title');

    expect(itemsTitle).toHaveLength(3);
    expect(itemsImage).toHaveLength(3);
  });
});
