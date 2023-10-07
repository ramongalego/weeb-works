import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';

const queryClient = new QueryClient();

const App = () => (
  <Router>
    <Navbar />
    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-20 text-gray-800 tracking-wide mb-8'>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Browse />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </main>
  </Router>
);

export default App;
