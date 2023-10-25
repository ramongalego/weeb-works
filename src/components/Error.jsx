const Error = ({ message }) => (
  <div className='my-10 flex items-center justify-center'>
    <div className='rounded border border-red-400 bg-red-100 px-10 py-2 text-red-700 '>
      {message}
    </div>
  </div>
);

export default Error;
