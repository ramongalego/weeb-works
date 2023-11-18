import { Routes, Route } from 'react-router-dom';

import PrivateRoutes from '../components/PrivateRoutes';
import { AnimeDetails } from '../features/anime/AnimeDetails';

import Browse from './Browse';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import SignUp from './SignUp';

const Pages = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/anime' element={<Browse />} />
      <Route path='/anime/:filter' element={<Browse />} />
      <Route path='/anime/details/:id' element={<AnimeDetails />} />
      <Route path='*' element={<NotFound />} />

      <Route path='/user/:username' element={<Profile />} />

      <Route element={<PrivateRoutes />}>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Pages;
