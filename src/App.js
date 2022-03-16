
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import Lobby from "./pages/game/lobby";
import LoginPage from "./pages/login";
import RegisPage from "./pages/signup";


function App() {

    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route
                        path="/login"
                        element={
                            <LoginPage
                            />
                        }
                    />
                    <Route
                        path="/regis"
                        element={
                            <RegisPage
                            />
                        }
                    />
                    <Route path="/lobby" element={<Lobby/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
