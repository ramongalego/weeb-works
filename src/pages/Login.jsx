import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='mt-14 flex justify-center pt-16'>
      <div className='flex flex-col items-center justify-center rounded bg-white px-16 py-8'>
        <h1 className='my-4 px-4 text-2xl font-semibold'>Login</h1>
        <form className='mt-4 flex w-full flex-col'>
          <input
            type='text'
            placeholder='Email'
            className='my-4 rounded bg-gray-100 px-3 py-2 outline-none'
          />
          <input
            type='password'
            placeholder='Password'
            className='my-4 rounded bg-gray-100 px-3 py-2 outline-none'
          />
          <button
            type='submit'
            className='mx-auto my-8 w-28 cursor-pointer rounded bg-indigo-500 py-2 font-semibold text-white'
          >
            Login
          </button>
        </form>
        <p className='mb-2 mt-16 px-6 text-sm'>
          Not registered?{' '}
          <Link to='/signup' className='text-indigo-500 hover:text-indigo-700'>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
