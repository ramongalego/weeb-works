import { Outlet, Navigate } from 'react-router-dom';

import useUserStore from '../app/store';

const PrivateRoutes = () => {
  const user = useUserStore(state => state.user);

  return user ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
