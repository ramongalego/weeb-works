const SkeletonLoading = ({ count }) => {
  const items = Array(count).fill(null);

  return (
    <div className='mt-4 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
      {items.map((_, index) => (
        <div key={index} className='mb-12 h-52 w-32 cursor-pointer rounded sm:h-60 sm:w-40'>
          <div
            className='skeleton-loading h-full w-full rounded'
            data-testid='skeleton-loading'
          ></div>
          <div className='skeleton-loading mt-2 h-4 w-1/2 rounded'></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
