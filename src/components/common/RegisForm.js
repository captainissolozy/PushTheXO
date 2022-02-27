import * as React from "react";
import { Box, TextField, Button } from "@mui/material";

import FormWrapper from "./FormWrapper";
import { Link } from "react-router-dom";

const BasicTextFieldsRegis = (setPassword, setEmail, handleAction) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <FormWrapper>
      <div className="box">
      <form className="regis-b c-box border border-primary p-4 rounded-2" onSubmit={handleSubmit}>
      <div className="heading-container mt-2 d-flex flex-row-reverse justify-content-center">
                <h3>Sign up</h3>
              </div>
        <TextField className="my-3"
          label="Email"
          variant="filled"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField className="my-3 mb-4"
          label="Password"
          variant="filled"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          
          
            <Link to={"/home"} className="font border border-primary px-4 pb-2 mx-3">
            back
            </Link>
            
          
          <Button type="submit" variant="contained" color="primary" className="mx-3">
            Signup
          </Button>
        </div>
      </form>
      </div>
    </FormWrapper>
  );
};
export default BasicTextFieldsRegis;
