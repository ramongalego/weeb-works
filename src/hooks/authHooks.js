import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../app/useAuthStore';

export const useRedirectIfAuthenticated = (redirectTo = '/') => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    if (user) navigate(redirectTo);
  }, [user, navigate, redirectTo]);
};
