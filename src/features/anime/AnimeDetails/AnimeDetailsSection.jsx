const AnimeDetailsSection = ({ title, data }) => {
  const content = Array.isArray(data) ? (
    data.map(studio => (
      <div key={studio.name} className='mt-1 capitalize'>
        {studio.name}
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
