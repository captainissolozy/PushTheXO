import { Button } from "@mui/material"
import * as React from 'react';

function BasicButtons({title}) {


    return (
        <Button variant="contained" className="w-100">{title}</Button>
    );
}
export default BasicButtons