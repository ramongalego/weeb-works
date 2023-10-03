const AnimeCards = ({ isPreview, title, data }) => {
  const mockData = [{ title: 'a' }, { title: 'b' }, { title: 'c' }, { title: 'd' }, { title: 'e' }];

  return (
    <div className='w-10/12'>
      <div className='mt-16 flex items-center justify-between'>
        <h1 className='text-2xl'>Trending Now</h1>
        <p className='cursor-pointer'>View All</p>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        {mockData.map(item => (
          <div key={item.title} className='w-48 h-64 bg-indigo-500 rounded'></div>
        ))}
      </div>
    </div>
  );
};

export default AnimeCards;
