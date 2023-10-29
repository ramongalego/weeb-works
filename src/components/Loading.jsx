import spinner from '../assets/spinner.gif';

const Loading = () => (
  <div className='flex h-screen items-center justify-center'>
    <img src={spinner} alt='Loading Spinner' className='h-20 w-20' />
  </div>
);

export default Loading;
