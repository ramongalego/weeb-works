import { Link } from 'react-router-dom';
import Search from './Search';

const Navbar = () => (
  <nav className='bg-[#2B2D42] tracking-wide text-white'>
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
      <div className='relative flex h-16 items-center justify-between'>
        <div className='flex items-center'>
          <Link to='/'>
            <div className='flex cursor-pointer items-center'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                alt='WeebWorks'
              />
              <h1 className='ml-4 text-2xl'>WeebWorks</h1>
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

export default Navbar;
