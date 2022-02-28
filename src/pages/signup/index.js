import BasicTextFieldsRegis from "../../components/common/RegisForm";
import { app } from "../../config/firebase-config";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {useState} from "react";

const RegisPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAction = (id) => {
        console.log(id);
        const authentication = getAuth();
        createUserWithEmailAndPassword(authentication, email, password).then(
            (response) => {
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
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