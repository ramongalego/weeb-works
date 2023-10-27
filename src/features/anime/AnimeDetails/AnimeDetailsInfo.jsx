import AnimeDetailsSection from './AnimeDetailsSection';

const renderDetailsSection = (title, data) => {
  if (data && data !== 'Unknown') {
    return <AnimeDetailsSection title={title} data={data} />;
  }

  return null;
};

const AnimeDetailsInfo = ({ data }) => {
  return (
    <div className='mb-4 mt-14 min-h-[600px] rounded bg-gray-50 p-4 text-sm text-gray-500'>
      {renderDetailsSection('Format', data.type)}
      {renderDetailsSection('Episodes', data.episodes)}
      {renderDetailsSection('Episodes Duration', data.duration)}
      {renderDetailsSection('Status', data.status)}
      {renderDetailsSection('Score', data.score)}
      {renderDetailsSection('Year', data.year)}
      {renderDetailsSection('Season', data.season)}
      {renderDetailsSection('Studios', data.studios)}
      {renderDetailsSection('Themes', data.themes)}
      {renderDetailsSection('Genres', data.genres)}
      {renderDetailsSection('Source', data.source)}
      {renderDetailsSection('Rating', data.rating)}
    </div>
  );
};

export default AnimeDetailsInfo;
