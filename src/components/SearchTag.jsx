const SearchTag = ({ value }) => {
  return (
    <div className='text-sm'>
      <h1 className=' bg-indigo-500 text-white py-1 px-3 rounded-lg'>
        Search: <span className='capitalize font-bold'>{value}</span>
      </h1>
    </div>
  );
};

export default SearchTag;
