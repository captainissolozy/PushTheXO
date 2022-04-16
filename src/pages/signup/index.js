import BasicTextFieldsRegis from "../../components/common/RegisForm";

import {
    getAuth,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useUserContext} from "../../context/UserContexts";
import db from "../../config/firebase-config"
import {setDoc, doc} from "firebase/firestore"

const RegisPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = (useNavigate());
    const {user, setUser} = useUserContext()


    const handleAction = () => {
        const authentication = getAuth();
        createUserWithEmailAndPassword(authentication, email, password).then(
            (response) => {
                sessionStorage.setItem('email', response.user.email)
                const docRef = doc(db, "UsersDetail", response.user.email);
                sessionStorage.setItem('User', JSON.stringify(response.user))
                setDoc(docRef, {email: response.user.email, Win: 0, Loses: 0}).then()
                setUser(response.user)
                navigate("/lobby");

            }
        ).catch((error) => {
            if(error.code === 'auth/email-already-in-use'){
                toast.error('Email Already in Use');
            }
        });
    }

    return (
        <div>
            <BasicTextFieldsRegis setEmail={setEmail}
                                  setPassword={setPassword}
                                  handleAction={() => handleAction()}/>
            <ToastContainer />
        </div>
    )
}
export default RegisPage;