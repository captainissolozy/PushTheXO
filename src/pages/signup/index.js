import BasicTextFieldsRegis from "../../components/common/RegisForm";
import {app} from "../../config/firebase-config";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {useState} from "react";
import Lobby from "../game/lobby";
import {useNavigate} from "react-router-dom";

const RegisPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = (useNavigate());


    const handleAction = (id) => {
        console.log(id);
        const authentication = getAuth();
        createUserWithEmailAndPassword(authentication, email, password).then(
            (response) => {
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                navigate("/lobby");
                console.log(response);
            }
        );
    }

    return (
        <div>
            <BasicTextFieldsRegis setEmail={setEmail}
                                  setPassword={setPassword}
                                  handleAction={() => handleAction(2)}/>
        </div>
    )
}
export default RegisPage;