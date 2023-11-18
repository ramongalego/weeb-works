import spinner from '../assets/spinner.svg';

const Loading = () => (
  <div className='flex h-screen items-center justify-center'>
    <img src={spinner} alt='Loading Spinner' className='h-28 w-28' />
  </div>
);

export default Loading;
