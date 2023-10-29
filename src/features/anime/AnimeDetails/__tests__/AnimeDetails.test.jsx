import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, render } from '@testing-library/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router';
import { describe, it } from 'vitest';

import AnimeDetails from '../AnimeDetails';

describe('AnimeDetails component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = () => (
    <QueryClientProvider client={queryClient}>
      <Router initialEntries={['/anime/1']}>
        <Routes>
          <Route path='/anime/:id' element={<AnimeDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );

  it('renders loading state initially', async () => {
    render(<Wrapper />);

    await screen.findByAltText('Loading Spinner');
  });

  it('renders data correctly when data is fetched', async () => {
    render(<Wrapper />);

    await screen.findByText('Mock Title');
    await screen.findByAltText('Mock Title');
    await screen.findByText('Mock Synopsis');
  });
});
