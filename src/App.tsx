import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import useAuthStore from './app/useAuthStore';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Pages from './pages/Pages';

const queryClient = new QueryClient();

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
