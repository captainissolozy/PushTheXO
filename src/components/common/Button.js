import { Button } from "@mui/material"
import * as React from 'react';

function BasicButtons({title, handleAction}) {



    return (
        <Button variant="contained" className="w-100" onClick={handleAction}>{title}</Button>
    );
}
export default BasicButtons