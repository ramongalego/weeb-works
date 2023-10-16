import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Browse from './pages/Browse';
import AnimeDetails from './features/anime/AnimeDetails';

const queryClient = new QueryClient();

const App = () => (
  <Router>
    <Navbar />
    <main className='text-gray-800 tracking-wide'>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/anime' element={<Browse />} />
          <Route path='/anime/:filter' element={<Browse />} />
          <Route path='/anime/details/:id' element={<AnimeDetails />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </main>
  </Router>
);

export default App;
