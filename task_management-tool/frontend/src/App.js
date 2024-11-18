import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <>
      <div className='bg-gray-900 text-white w-full h-[100vh]'>
        <Navbar></Navbar>
        <Home></Home>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
