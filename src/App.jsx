import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useUserStore from './app/store';
import Navbar from './components/Navbar';
import PrivateRoutes from './components/PrivateRoutes';
import ScrollToTop from './components/ScrollToTop';
import { AnimeDetails } from './features/anime/AnimeDetails';
import Browse from './pages/Browse';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

const App = () => {
  const persistUserInfo = useUserStore(state => state.persistUserInfo);

  useEffect(() => {
    persistUserInfo();
  }, [persistUserInfo]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <main className='mb-10 tracking-wide text-gray-800'>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/anime' element={<Browse />} />
            <Route path='/anime/:filter' element={<Browse />} />
            <Route path='/anime/details/:id' element={<AnimeDetails />} />
            <Route path='*' element={<NotFound />} />

            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />

            <Route element={<PrivateRoutes />}>
              <Route path='/user/:username' element={<Profile />} />
            </Route>
          </Routes>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </main>
    </Router>
  );
};

export default App;
