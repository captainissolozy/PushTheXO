
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
              <div className="col-12 t-tab border border-black">
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
            </div>
          <div className="row mt-3 d-flex justify-content-center">
            <div className="col-6 p-0">
            <SearchBar />
            </div>
            <div className="col-2 d-flex justify-content-center m-1">
              <BasicButtons title={'Search'} onClick={'search'}/>
            </div>
              <div className="col-2 d-flex justify-content-center m-1">
                <BasicButtons title={'Create Room'} onClick={'createLobby'}/>
              </div>
          </div>
          </div>
        </div>
      </LobbyWrapper>
  );
}
