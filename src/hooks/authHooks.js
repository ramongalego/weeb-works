import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUserStore from '../app/store';

export const useRedirectIfAuthenticated = (redirectTo = '/') => {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);

  useEffect(() => {
    if (user) navigate(redirectTo);
  }, [user, navigate, redirectTo]);
};
