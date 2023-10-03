import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => (
  <div>
    <Navbar />
    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 mt-20 text-gray-800'>
      <Home />
    </main>
  </div>
);

export default App;
