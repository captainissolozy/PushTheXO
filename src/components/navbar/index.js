import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid">
        <Link
          to={"/"}
          className="navbar-brand justify-content-center text-white"
        >
          Logo
        </Link>
        <Link to={"/"} className="navbar-brand text-white">
          Push, The XO
        </Link>
        <Link to={"/home"} className="navbar-brand text-white">
          Login
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
