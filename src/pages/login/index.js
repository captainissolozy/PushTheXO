import BasicTextFields from "../../components/common/Form";
import {useState} from "react";
import  { useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useUserContext} from "../../context/UserContexts";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {user, setUser} = useUserContext()


    const handleAction = () => {
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, email, password).then(
            (response) => {
                sessionStorage.setItem('email', response.user.email)
                sessionStorage.setItem('User', JSON.stringify(response.user))
                setUser(response.user)
                navigate("/lobby");
            }
        ).catch((error) => {
            if(error.code === 'auth/wrong-password'){
                toast.error('Please use the correct Password');
            }
            if (error.code === 'auth/user-not-found'){
                toast.error('Please use the correct Email');
            }
        });
    }

    return (
        <div>
            <BasicTextFields setEmail={setEmail} 
              setPassword={setPassword} handleAction={() => handleAction()}/>
            <ToastContainer />
        </div>
    )
}
export default LoginPage;
