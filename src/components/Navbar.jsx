import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/ww.png';

import Search from './Search';

const Navbar = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

      if (currentScrollTop < lastScrollTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
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
        <div className='relative flex h-20 items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/'>
              <div className='flex cursor-pointer items-center'>
                <img className='h-10 w-auto' src={logo} alt='WeebWorks' />
              </div>
            </Link>
            <ul className='ml-10 flex cursor-pointer'>
              <li className='ml-4'>
                <Link to='/user/Ankrath'>Profile</Link>
              </li>
              <li className='ml-6'>
                <Link to='/anime'>Browse</Link>
              </li>
            </ul>
          </div>
          <div className='flex items-center'>
            <Search isNavbar />
            <p className='ml-6 cursor-pointer'>
              <Link to='/login'>Login</Link>
            </p>
            <p className='ml-6 cursor-pointer rounded bg-indigo-500 px-3 py-1 font-semibold'>
              <Link to='/signup'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
