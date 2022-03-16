import { Button } from "@mui/material"
import * as React from 'react';
import BtnWrapper from "./BtnWrapper"

function LoginBtn() {


    return (
        <BtnWrapper>
            <Button variant="contained" className="login-out" >Login</Button>
        </BtnWrapper>
    );
}
export default LoginBtn