import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen, render } from '@testing-library/react';
// import { http, HttpResponse } from 'msw';
import { MemoryRouter as Router, Routes, Route } from 'react-router';
import { describe, it } from 'vitest';

// import { server } from '../../../../mocks/server';
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

  // it('handles error correctly', async () => {
  //   queryCache.clear();

  //   server.use(
  //     http.get('https://api.jikan.moe/v4/anime/:id', () => {
  //       return HttpResponse.error();
  //     }),
  //   );

  //   render(<Wrapper />);

  //   screen.debug();

  //   await screen.findByText('Error');
  // });
});
