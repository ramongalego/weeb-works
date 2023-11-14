import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useAuthStore from '../app/useAuthStore';
import logo from '../assets/ww.png';

import Search from './Search';

const Navbar = () => {
  const user = useAuthStore(state => state.user);
  const logoutUser = useAuthStore(state => state.logoutUser);

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isSticky, setIsSticky] = useState(true);
  const navbarHeight = 60;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop && currentScrollTop > navbarHeight) {
        setIsSticky(false);
      } else if (currentScrollTop < lastScrollTop || currentScrollTop <= navbarHeight) {
        setIsSticky(true);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-10 bg-[#2B2D42] tracking-wide text-white
        transition-transform duration-300 ease-in-out
        ${isSticky ? 'translate-y-0 transform' : '-translate-y-20 transform'}`}
    >
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-center sm:justify-between'>
          <div className='text-md hidden items-center sm:flex'>
            <Link to='/'>
              <div className='flex cursor-pointer items-center'>
                <img className='h-8 w-auto' src={logo} alt='WeebWorks' />
              </div>
            </Link>
            <ul className='ml-10 flex cursor-pointer'>
              {user && (
                <li className='ml-4 mr-2'>
                  <Link to={`/user/${user?.name}`}>Profile</Link>
                </li>
              )}
              <li className='ml-4 '>
                <Link to='/anime'>Browse</Link>
              </li>
            </ul>
          </div>
          <div className='flex items-center'>
            <Search isNavbar />
            <p className='ml-6 cursor-pointer'>
              {user ? <button onClick={logoutUser}>Logout</button> : <Link to='/login'>Login</Link>}
            </p>
            {!user && (
              <p className='ml-6 cursor-pointer rounded bg-indigo-500 px-2 py-1 text-center font-semibold sm:px-3'>
                <Link to='/signup'>Sign Up</Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
