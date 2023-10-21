import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='flex justify-center mt-14'>
      <div className='bg-white py-8 px-16 rounded flex flex-col justify-center items-center'>
        <h1 className='text-2xl my-4 px-4 font-semibold'>Login</h1>
        <form className='flex flex-col mt-4 w-full'>
          <input type='text' placeholder='Email' className='bg-gray-100 rounded py-2 px-3 my-4' />
          <input
            type='password'
            placeholder='Password'
            className='bg-gray-100 rounded py-2 px-3 my-4'
          />
        </form>
        <button className='ml-6 cursor-pointer bg-indigo-500 rounded py-2 px-6 font-semibold text-white my-8'>
          Login
        </button>
        <p className='mt-16 mb-2 text-sm px-6'>
          Not registered?{' '}
          <Link to='/signup' className='text-indigo-500 hover:text-indigo-700'>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
