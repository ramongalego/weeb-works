import { useEffect } from 'react';

import useAuthStore from '../app/useAuthStore';
import useFavoritesStore from '../app/useFavoritesStore';
import useWatchlistStore from '../app/useWatchlistStore';
import defaultProfileImage from '../assets/defaultProfileImage.png';
import UserAnimeList from '../components/UserAnimeList';

const Profile = () => {
  const user = useAuthStore(state => state.user);

  const fetchUserWatchlistData = useWatchlistStore(state => state.fetchUserWatchlistData);
  const watchlist = useWatchlistStore(state => state.watchlist);

  const fetchUserFavoritesData = useFavoritesStore(state => state.fetchUserFavoritesData);
  const favorites = useFavoritesStore(state => state.favorites);

  useEffect(() => {
    if (user) {
      fetchUserWatchlistData();
      fetchUserFavoritesData();
    }
  }, [user, fetchUserWatchlistData, fetchUserFavoritesData]);

  return (
    <>
      <div className='mt-20 h-72 bg-[#242538]'>
        <div className='mx-auto flex max-w-7xl items-end px-2 pt-24 sm:px-6 lg:px-8'>
          <div className='relative top-8 h-40 w-48 rounded'>
            <img
              src={defaultProfileImage}
              alt='Profile Image'
              className='h-full w-full rounded bg-indigo-500'
            />
          </div>
          <div className='relative top-2 w-full px-8 text-white'>
            <h1 className='text-2xl font-semibold'>{user.name}</h1>
          </div>
        </div>
      </div>

      <div className='mx-auto my-14 flex max-w-7xl flex-col px-2 sm:px-6 lg:px-8'>
        {watchlist.length > 0 && <UserAnimeList data={watchlist} title='watchlist' />}
        {favorites.length > 0 && <UserAnimeList data={favorites} title='favorites' />}
      </div>
    </>
  );
};

export default Profile;
