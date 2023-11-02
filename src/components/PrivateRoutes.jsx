import { Outlet, Navigate } from 'react-router-dom';

import useAuthStore from '../app/useAuthStore';

const PrivateRoutes = () => {
  const user = useAuthStore(state => state.user);

  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
