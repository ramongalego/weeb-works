import AnimeDetailsSection from './AnimeDetailsSection';

const renderDetailsSection = (title, data) => {
  const hasData = Array.isArray(data) ? data.length > 0 : data && data !== 'Unknown';

  if (hasData) {
    return <AnimeDetailsSection title={title} data={data} />;
  }
  return null;
};

const AnimeDetailsInfo = ({ data }) => (
  <div className='mb-4 mt-80 sm:mt-14 min-h-[600px] rounded bg-gray-50 p-4 text-sm text-gray-500'>
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

export default AnimeDetailsInfo;
