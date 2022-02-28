import BasicButtons from "../../../components/common/Button";
import LobbyWrapper from "./LobbyWrapper";

const Lobby = () => {
  return (
    <LobbyWrapper>
      <div className="wrapper-box">
        <div className="container pt-5">
          <div className="row mt-5">
            <div className="col-8 t-tab border border-black">
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
        </div>
      </div>
    </LobbyWrapper>
  );
};
export default Lobby;
