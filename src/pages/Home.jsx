import AnimeCards from '../features/anime/AnimeCards';

const Home = () => {
  return (
    <div>
      <h1 className='text-4xl'>Explore Anime</h1>
      <input
        className='w-9/12 p-5 text-xl mt-6 rounded-md outline-none'
        placeholder='What are you searching for?'
      />
      <AnimeCards />
    </div>
  );
};

export default Home;
