import spinner from '../assets/spinner.gif';

const Loading = () => (
  <div className='flex items-center justify-center'>
    <img src={spinner} alt='Loading Spinner' className='my-10 h-10 w-10' />
  </div>
);

export default Loading;
