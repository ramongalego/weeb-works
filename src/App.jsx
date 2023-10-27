import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import { AnimeDetails } from './features/anime/AnimeDetails';
import Browse from './pages/Browse';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

const App = () => (
  <Router>
    <Navbar />
    <main className='mb-10 tracking-wide text-gray-800'>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/anime' element={<Browse />} />
          <Route path='/anime/:filter' element={<Browse />} />
          <Route path='/anime/details/:id' element={<AnimeDetails />} />
          <Route path='/user/:username' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </main>
  </Router>
);

export default App;
