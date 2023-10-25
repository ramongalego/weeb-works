const AnimeDetailsSection = ({ title, data }) => (
  <div className='mb-4'>
    <h1 className='mb-1 font-bold'>{title}</h1>
    <p className='capitalize'>{data}</p>
  </div>
);

export default AnimeDetailsSection;
