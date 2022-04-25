import logo from "./logoXO.png"
import InitialWrapper from "./InitialWrapper";
import {useNavigate} from "react-router-dom";

const Initial = () => {

    const navigate = useNavigate();
    
    const handleClick = () => {
      navigate("/lobby")
    }
    
    return (
        <InitialWrapper>
            <div className="d-flex justify-content-center">
                <img className="my-auto" src={logo} onClick={handleClick}/>
            </div>
            <div className="d-flex justify-content-center flex-column r-box my-auto px-3">
                <h1 className="align-self-center">Rules</h1>
                <h3 className="mx-3">How to Win</h3>
                <p> - Players alternate turns placing X or O on an empty box. X plays first.
                    The winner is the first player to form an unbroken chain of five XO horizontally, vertically,
                    or diagonally.</p>
                <h4 className="mx-3">IRONXO</h4>
                <p> - IronXO are the pawn that can't be destroy by the Bomb. Player Can only place 1 IronXO</p>
                <h4 className="mx-3">Bomb</h4>
                <p> - Bomb are the Action that perform an act of destroying the target XO that you choose. Player can only use Bomb once</p>
            </div>
        </InitialWrapper>

    )
}
export default Initial