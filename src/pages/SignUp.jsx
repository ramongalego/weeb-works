import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ValidationMessage from '../components/ValidationMessage';
import { signUpSchema } from '../constants/formSchemas';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className='flex justify-center mt-14'>
      <div className='bg-white py-8 px-14 rounded flex flex-col justify-center items-center'>
        <h1 className='text-2xl my-4 px-4 font-semibold'>Sign up to WeebWorks</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-4 w-full'>
          <input
            {...register('email')}
            type='text'
            placeholder='Email'
            className='bg-gray-100 rounded py-2 px-3 mt-4 mb-2 outline-none'
          />
          <ValidationMessage message={errors.email?.message} />
          <input
            {...register('username')}
            type='text'
            placeholder='Username'
            className='bg-gray-100 rounded py-2 px-3 mt-4 mb-2 outline-none'
          />
          <ValidationMessage message={errors.username?.message} />
          <input
            {...register('password')}
            type='password'
            placeholder='Password'
            className='bg-gray-100 rounded py-2 px-3 mt-4 mb-2 outline-none'
          />
          <ValidationMessage message={errors.password?.message} />
          <input
            {...register('passwordConfirmation')}
            type='password'
            placeholder='Confirm Password'
            className='bg-gray-100 rounded py-2 px-3 mt-4 mb-2 outline-none'
          />
          <ValidationMessage message={errors.passwordConfirmation?.message} />
          <button
            type='submit'
            className='cursor-pointer bg-indigo-500 rounded mx-auto w-28 py-2 font-semibold text-white my-8'
          >
            Sign up
          </button>
        </form>

        <p className='mt-16 mb-2 text-sm px-6'>
          Already registered?{' '}
          <Link to='/login' className='text-indigo-500 hover:text-indigo-700'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
