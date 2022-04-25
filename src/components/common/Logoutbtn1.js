import { Button } from "@mui/material"
import * as React from 'react';
import {useUserContext} from "../../context/UserContexts";
import BtnWrapper1 from "./BtnWrapper1";


function LogoutBtn1() {

    const {user, setUser} = useUserContext()
    function handleLogout() {
        sessionStorage.removeItem('User');
        setUser(undefined)
    }


    return (
        <BtnWrapper1>
            <Button variant="contained" className="login-out" onClick={handleLogout}>Logout</Button>
        </BtnWrapper1>
    );
}
export default LogoutBtn1