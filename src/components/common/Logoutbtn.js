import { Button } from "@mui/material"
import * as React from 'react';
import BtnWrapper from "./BtnWrapper";
import {useUserContext} from "../../context/UserContexts";


function LogoutBtn() {

    const {user, setUser} = useUserContext()
    function handleLogout() {
        sessionStorage.removeItem('User');
        setUser(undefined)
    }


    return (
        <BtnWrapper>
            <Button variant="contained" className="login-out" onClick={handleLogout}>Logout</Button>
        </BtnWrapper>
    );
}
export default LogoutBtn