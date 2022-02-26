import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Lobby from './pages/game/lobby';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;
