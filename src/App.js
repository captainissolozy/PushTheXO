import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import Lobby from "./pages/game/lobby";
import LoginPage from "./pages/login";
import RegisPage from "./pages/signup";
import Game from "./pages/game/gamePlay/Game";


function App() {

    return (<>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route
                        path="/login"
                        element={<LoginPage
                        />}
                    />
                    <Route
                        path="/regis"
                        element={<RegisPage
                        />}
                    />
                    <Route path="/lobby" element={<Lobby/>}/>
                    <Route path="/game" element={<Game/>}/>
                </Routes>
            </BrowserRouter>
        </>);
}

export default App;
