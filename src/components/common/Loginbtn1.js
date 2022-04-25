import { Button } from "@mui/material"
import * as React from 'react';
import BtnWrapper1 from "./BtnWrapper1";

function LoginBtn1() {


    return (
        <BtnWrapper1>
            <Button variant="contained" className="login-out" >Login</Button>
        </BtnWrapper1>
    );
}
export default LoginBtn1