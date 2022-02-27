import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./pages/game/lobby";
import Regis from "./pages/signup";
import { useState } from "react";


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleAction = (id) => {
    console.log(id)
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login setEmail={setEmail} 
              setPassword={setPassword} 
              handleAction={() => handleAction(1)}/>}
          />
          <Route
            path="/regis"
            element={
              <Regis setEmail={setEmail} 
              setPassword={setPassword} 
              handleAction={() => handleAction(2)}/>}
          />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
