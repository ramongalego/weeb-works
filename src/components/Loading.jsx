import spinner from '../assets/spinner.gif';

const Loading = () => (
  <div className='flex justify-center items-center'>
    <img src={spinner} alt='Loading Spinner' className='w-10 h-10 my-10' />
  </div>
);

export default Loading;
