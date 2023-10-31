import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../app/store';
import Loading from '../components/Loading';
import ValidationMessage from '../components/ValidationMessage';
import { loginSchema } from '../constants/formSchemas';
import { useRedirectIfAuthenticated } from '../hooks/authHooks';

const Login = () => {
  useRedirectIfAuthenticated();

  const navigate = useNavigate();

  const loginUser = useAuthStore(state => state.loginUser);
  const isLoading = useAuthStore(state => state.isLoading);
  const authErrors = useAuthStore(state => state.errors);

  const invalidCredentials = authErrors?.type === 'user_invalid_credentials';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = async data => {
    await loginUser(data.email, data.password);

    if (!isLoading && !authErrors) navigate('/');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='mt-14 flex justify-center pt-20'>
      <div className='flex flex-col items-center justify-center rounded bg-white px-16 py-8'>
        <h1 className='my-4 px-4 text-2xl font-semibold'>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 flex w-full flex-col'>
          <input
            {...register('email')}
            type='text'
            placeholder='Email'
            className='my-4 rounded bg-gray-100 px-3 py-2 outline-none'
          />
          <ValidationMessage message={errors.email?.message} />
          <input
            {...register('password')}
            type='password'
            placeholder='Password'
            className='my-4 rounded bg-gray-100 px-3 py-2 outline-none'
          />
          <ValidationMessage message={errors.password?.message} />
          {invalidCredentials && <ValidationMessage message={authErrors.message} />}
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
