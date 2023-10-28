const AnimeDetailsSection = ({ title, data }) => {
  const content = Array.isArray(data) ? (
    data.map(item => (
      <div key={item.name} className='mt-1 capitalize'>
        {item.name}
      </div>
    ))
  ) : (
    <p className='capitalize'>{data}</p>
  );

  return (
    <div className='mb-4'>
      <h1 className='mb-1 font-bold'>{title}</h1>
      {content}
    </div>
  );
};

export default AnimeDetailsSection;
