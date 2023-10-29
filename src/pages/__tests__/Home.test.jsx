import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, render } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router';
import { describe, it, expect } from 'vitest';

import Home from '../Home';

describe('Home component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = () => (
    <QueryClientProvider client={queryClient}>
      <Router initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );

  it('renders title and search bar', () => {
    render(<Wrapper />);

    screen.getByText('Explore Anime');
    screen.getByRole('textbox');
  });

  it('renders data correctly when it is fetched', async () => {
    render(<Wrapper />);

    const itemsTitle = await screen.findAllByText('Mock Title');
    const itemsImage = await screen.findAllByAltText('Mock Title');

    expect(itemsTitle).toHaveLength(3);
    expect(itemsImage).toHaveLength(3);
  });
});
