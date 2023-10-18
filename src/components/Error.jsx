const Error = ({ message }) => {
  return (
    <div className='flex justify-center items-center my-10'>
      <div className='bg-red-100 border border-red-400 text-red-700 px-10 py-2 rounded '>
        {message}
      </div>
    </div>
  );
};

export default Error;
