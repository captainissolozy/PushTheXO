import {Link, useNavigate} from "react-router-dom";
import HomeWrapper from "./HomeWrapper";
import {useEffect} from "react";
import {useUserContext} from "../../context/UserContexts";
import { getAuth, signInAnonymously } from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";
import db from "../../config/firebase-config";


const Home = () => {

  const navigate = useNavigate()
  const {user, setUser} = useUserContext()

  const btnArray = [
    {
      txt: "Log-in",
      path: "/login"
    },
    {
      txt: "Sign-up",
      path: "/regis"
    },
    {
      txt: "Guest",
      path: "/Lobby"
    }
  ];

  useEffect(() => {
    if (user) {
      navigate('/lobby')
    }
  }, [navigate, user])
  const handleClickGuest = (el) => {
    if (el.target.text === "Guest"){
      el.preventDefault()
      const authentication = getAuth();
      signInAnonymously(authentication).then((response) => {
        const docRef = doc(db, "UsersDetail", response.user.uid);
        setDoc(docRef, {email: response.user.uid, Win: 0, Loses: 0}).then()
        sessionStorage.setItem('email', response.user.uid)
        sessionStorage.setItem('User', JSON.stringify(response.user))
        setUser({email: response.user.uid})
        navigate('/lobby')
      })
    }
  }

  if (user) return null
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
                      <Link to={path} className="btn btn-dark home-btn" onClick={handleClickGuest}>
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
