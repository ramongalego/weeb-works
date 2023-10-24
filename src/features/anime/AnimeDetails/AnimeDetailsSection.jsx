const AnimeDetailsSection = ({ title, data }) => (
  <div className='mb-4'>
    <h1 className='font-bold mb-1'>{title}</h1>
    <p className='capitalize'>{data}</p>
  </div>
);

export default AnimeDetailsSection;
