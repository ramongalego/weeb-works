import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import useAuthStore from './app/useAuthStore';
import useFavoritesStore from './app/useFavoritesStore';
import useWatchlistStore from './app/useWatchlistStore';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Pages from './pages/Pages';

const queryClient = new QueryClient();

const App = () => {
  const fetchUserData = useAuthStore(state => state.fetchUserData);
  const fetchUserWatchlistData = useWatchlistStore(state => state.fetchUserWatchlistData);
  const fetchUserFavoritesData = useFavoritesStore(state => state.fetchUserFavoritesData);

  useEffect(() => {
    fetchUserData();
    fetchUserWatchlistData();
    fetchUserFavoritesData();
  }, [fetchUserData, fetchUserWatchlistData, fetchUserFavoritesData]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className='mb-10 tracking-wide text-gray-800'>
        <QueryClientProvider client={queryClient}>
          <Pages />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </main>
    </Router>
  );
};

export default App;
