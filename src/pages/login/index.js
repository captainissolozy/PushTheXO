import BasicTextFields from "../../components/common/Form";
import {useState} from "react";

import {signInWithEmailAndPassword, getAuth} from "firebase/auth";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAction = (id) => {
        console.log(id);
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, email, password).then(
            (response) => {
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                console.log(response);
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
