const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <div className='flex items-center cursor-pointer'>
              <img
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                alt='WeebWorks'
              />
              <h1 className='ml-4 text-2xl'>WeebWorks</h1>
            </div>
            <ul className='flex ml-10 cursor-pointer'>
              <li className='ml-4'>Profile</li>
              <li className='ml-6'>Anime List</li>
            </ul>
          </div>
          <div className='flex items-center'>
            <input
              className='py-2 px-4 rounded-md text-gray-800 outline-none w-60'
              placeholder='Search WeebWorks'
            />
            <p className='ml-4 cursor-pointer'>Sign Up</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;