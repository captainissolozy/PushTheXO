import BasicTextFields from "../../components/common/Form";
import { app } from "../../config/firebase-config";
import {useState} from "react";

import {signInWithEmailAndPassword, getAuth} from "firebase/auth";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAction = (id) => {
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, email, password).then(
            (response) => {
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                console.log(id);
            }
        );
    }
    return (
        <div>
            <BasicTextFields setEmail={setEmail} 
              setPassword={setPassword}
                             handleAction={() => handleAction(1)}/>
        </div>
    )
}
export default LoginPage;
