import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import useAuthStore from './app/useAuthStore';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Pages from './pages/Pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 404 errors
        if (error instanceof AxiosError && error.response?.status === 404) {
          return false;
        }
        // Retry up to 3 times on rate limit (429) or server errors (5xx)
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status === 429 || (status && status >= 500)) {
            return failureCount < 3;
          }
        }
        // Default: retry once for other errors
        return failureCount < 1;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const App = () => {
  const fetchUserData = useAuthStore(state => state.fetchUserData);

  useEffect(() => {
    fetchUserData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <ScrollToTop />
        <Navbar />
        <main className='mb-10 tracking-wide text-gray-800'>
          <QueryClientProvider client={queryClient}>
            <Pages />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </main>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
