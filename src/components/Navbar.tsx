import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import useAuthStore from '../app/useAuthStore';
import logo from '../assets/ww.png';

import Search from './Search';

const Navbar = () => {
  const user = useAuthStore(state => state.user);
  const logoutUser = useAuthStore(state => state.logoutUser);

  const lastScrollTop = useRef(0);
  const [isSticky, setIsSticky] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navbarHeight = 60;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop.current && currentScrollTop > navbarHeight) {
        setIsSticky(false);
      } else if (currentScrollTop < lastScrollTop.current || currentScrollTop <= navbarHeight) {
        setIsSticky(true);
      }

      lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-10 bg-[#2B2D42] tracking-wide text-white
        transition-transform duration-300 ease-in-out
        ${isSticky ? 'translate-y-0 transform' : '-translate-y-20 transform'}`}
    >
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          {/* Hamburger menu button - visible on mobile */}
          <button
            className='sm:hidden p-2'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className='h-6 w-6' />
            ) : (
              <Bars3Icon className='h-6 w-6' />
            )}
          </button>

          {/* Desktop navigation */}
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

          {/* Search and auth buttons - always visible */}
          <div className='flex items-center'>
            <Search isNavbar />
            <p className='ml-4 sm:ml-6 cursor-pointer'>
              {user ? <button onClick={logoutUser}>Logout</button> : <Link to='/login'>Login</Link>}
            </p>
            {!user && (
              <p className='ml-3 sm:ml-6 cursor-pointer rounded bg-indigo-500 px-2 py-1 text-center font-semibold sm:px-3'>
                <Link to='/signup'>Sign Up</Link>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className='sm:hidden bg-[#2B2D42] border-t border-gray-600 px-4 py-4'>
          <Link to='/' onClick={closeMobileMenu} className='flex items-center mb-4'>
            <img className='h-8 w-auto' src={logo} alt='WeebWorks' />
          </Link>
          <ul className='flex flex-col space-y-3'>
            {user && (
              <li>
                <Link to={`/user/${user?.name}`} onClick={closeMobileMenu}>
                  Profile
                </Link>
              </li>
            )}
            <li>
              <Link to='/anime' onClick={closeMobileMenu}>
                Browse
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
