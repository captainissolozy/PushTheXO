import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Home from './pages/home';

function App() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
