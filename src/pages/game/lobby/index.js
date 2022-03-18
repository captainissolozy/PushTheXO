
import LobbyWrapper from "./LobbyWrapper";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../context/UserContexts";
import SearchBar from "../../../components/common/SearchBar";
import BasicButtons from "../../../components/common/Button";


export default function Lobby(){
  const navigate = useNavigate();
  const {user} = useUserContext()

  useEffect(() =>{
    if (!user){
      navigate('/login')
    }
  },[navigate, user])

  return (
      <LobbyWrapper>
        <div className="wrapper-box">
          <div className="container pt-5">
            <div className="row mt-2">
              <div className="col-7 t-tab border border-black">
                <table className="table">
                  <thead>
                  <tr>
                    <th scope="col" className="t-stick">#</th>
                    <th scope="col" className="t-stick">Rooms</th>
                    <th scope="col" className="t-stick">Owner</th>
                  </tr>
                  </thead>
                </table>
              </div>
              <div className="col-4">
                <div className="row">

                </div>
                <div className="row">

                </div>
              </div>

            </div>
          <div className="row mt-3">
            <div className="col-7 p-0">
            <SearchBar />
            </div>
            <div className="col-4 d-flex justify-content-center">
            <BasicButtons title={'Search'}/>
            </div>
          </div>
          </div>
        </div>
      </LobbyWrapper>
  );
}
