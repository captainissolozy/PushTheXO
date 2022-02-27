import * as React from "react";
import { Box, TextField } from "@mui/material";
import BasicButtons from "./Button";
import FormWrapper from "./FormWrapper";

const BasicTextFields = (setPassword, setEmail, handleAction) => {
  return (
    <FormWrapper>
      <div className="box">
        <div className="container my-3 justify-content-center d-flex c-box">
          <div className="row my-3 border border-primary w-100">
            <div className="col">
              <div className="heading-container mt-3 d-flex justify-content-center">
                <h3>Login</h3>
              </div>
              <div className="d-flex flex-column justify-content-center py-3">
                <Box
                  className="pb-3"
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    className="pb-2"
                    id="username"
                    label="Enter the username"
                    variant="outlined"
                    onChange={e => setEmail(e.target.value)}
                  />

                  <TextField
                    className="pb-3"
                    id="password"
                    label="Enter the Password"
                    variant="outlined"
                    onChange={e => setPassword(e.target.value)}
                  />
                </Box>
                <BasicButtons title="Login" handleAction={handleAction}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};
export default BasicTextFields;
