import { Link } from "react-router-dom";
import HomeWrapper from "./HomeWrapper";

const Home = () => {
  const btnArray = [
    {
      txt: "Log-in",
      path: "/login"
    },
    {
      txt: "Sign-in",
      path: "/signin"
    },
    {
      txt: "Guest",
      path: "/lobby"
    }
  ];
  return (
    <HomeWrapper>
      <div className="box">
        <div className="container my-3 justify-content-center d-flex c-box">
          <div className="row my-3 border border-primary w-100">
            <div className="col">
              <div className="col align-self-center py-3">
                {btnArray.map(({ txt, path }) => (
                  <div className="row m-3" key={txt}>
                    <div className="col align-self-center m-3">
                      <Link to={path} className="btn btn-dark home-btn">
                        {txt}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeWrapper>
  );
};
export default Home;
