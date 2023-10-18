import AnimeDetailsSection from './AnimeDetailsSection';

const renderDetailsSection = (title, data) => {
  if (data && data !== 'Unknown') {
    return <AnimeDetailsSection title={title} data={data} />;
  }

  return null;
};

const AnimeDetailsInfo = ({ data }) => {
  return (
    <div className='mt-8 mb-20 bg-gray-50 rounded p-4 text-sm text-gray-500'>
      {renderDetailsSection('Format', data.type)}
      {renderDetailsSection('Episodes', data.episodes)}
      {renderDetailsSection('Episodes Duration', data.duration)}
      {renderDetailsSection('Status', data.status)}
      {renderDetailsSection('Score', data.score)}
      {renderDetailsSection('Year', data.year)}
      {renderDetailsSection('Season', data.season)}
      {renderDetailsSection('Source', data.source)}
      {renderDetailsSection('Rating', data.rating)}
    </div>
  );
};

export default AnimeDetailsInfo;
