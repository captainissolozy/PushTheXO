import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContexts";
import Loginbtn from "../common/Loginbtn";
import LogoutBtn from "../common/Logoutbtn";


const Navbar = () => {

    const {user} = useUserContext()

    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand text-white">
                    Push, The XO
                </Link>
                <Link to={"/home"} className="navbar-brand text-white">
                    {user ? <LogoutBtn/> : <Loginbtn/>}
                </Link>
            </div>
        </nav>
    )
}
export default Navbar;
