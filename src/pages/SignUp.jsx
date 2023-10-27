import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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
    <div className='mt-14 flex justify-center pt-16'>
      <div className='flex flex-col items-center justify-center rounded bg-white px-14 py-8'>
        <h1 className='my-4 px-4 text-2xl font-semibold'>Sign up to WeebWorks</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex w-full flex-col'>
          <input
            {...register('email')}
            type='text'
            placeholder='Email'
            className='mb-2 mt-4 rounded bg-gray-100 px-3 py-2 outline-none'
          />
          <ValidationMessage message={errors.email?.message} />
          <input
            {...register('username')}
            type='text'
            placeholder='Username'
            className='mb-2 mt-4 rounded bg-gray-100 px-3 py-2 outline-none'
          />
          <ValidationMessage message={errors.username?.message} />
          <input
            {...register('password')}
            type='password'
            placeholder='Password'
            className='mb-2 mt-4 rounded bg-gray-100 px-3 py-2 outline-none'
          />
          <ValidationMessage message={errors.password?.message} />
          <input
            {...register('passwordConfirmation')}
            type='password'
            placeholder='Confirm Password'
            className='mb-2 mt-4 rounded bg-gray-100 px-3 py-2 outline-none'
          />
          <ValidationMessage message={errors.passwordConfirmation?.message} />
          <button
            type='submit'
            className='mx-auto my-8 w-28 cursor-pointer rounded bg-indigo-500 py-2 font-semibold text-white'
          >
            Sign up
          </button>
        </form>

        <p className='mb-2 mt-16 px-6 text-sm'>
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
