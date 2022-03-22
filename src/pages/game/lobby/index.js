
import LobbyWrapper from "./LobbyWrapper";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../context/UserContexts";
import SearchBar from "../../../components/common/SearchBar";
import BasicButtons from "../../../components/common/Button";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import Modal from "@material-ui/core/Modal";
import * as React from "react";


export default function Lobby(){
  const navigate = useNavigate();
  const {user} = useUserContext()
  const [open, setOpen] = useState(false)

  useEffect(() =>{
    if (!user){
      navigate('/login')
    }
  },[navigate, user])

  const handleCreate = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
      <LobbyWrapper>
        <div className="wrapper-box">
          <div className="container pt-5">
            <div className="row mt-2">
              <div className="col-12 t-tab border border-black">
                <table className="table">
                  <thead>
                  <tr>
                    <th scope="col" className="t-stick">#</th>
                    <th scope="col" className="t-stick">Rooms</th>
                    <th scope="col" className="t-stick">Owner</th>
                  </tr>
                  </thead>
                </table>
              </div>
            </div>
          <div className="row mt-3 d-flex justify-content-center">
            <div className="col-6 p-0">
            <SearchBar />
            </div>
            <div className="col-2 d-flex justify-content-center m-1">
              <BasicButtons title={'Search'} onClick={'search'}/>
            </div>
              <div className="col-2 d-flex justify-content-center m-1" onClick={handleCreate}>
                <BasicButtons title={'Create Room'}/>
              </div>
          </div>
          </div>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            className="d-flex justify-content-center align-items-center"

        >
          <form className="border border-secondary p-4 m-2 rounded-2 row bg-white">
            <div className="heading-container mt-2 d-flex flex-row-reverse justify-content-center">
              <h3>Create-Lobby</h3>
            </div>
            <TextField className="my-3"
                       label="Title"
                       variant="filled"
                       type="text"
                       required
            />
            <TextField className="my-3 mb-4"
                       label="PrivateKey"
                       variant="filled"
                       type="text"
                       required
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Win-condition</FormLabel>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="2"
                  name="radio-buttons-group"
              >
                <FormControlLabel value="2" control={<Radio/>} label="Best of 2"/>
                <FormControlLabel value="3" control={<Radio/>} label="Best of 3"/>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Time Limit</FormLabel>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="10"
                  name="radio-buttons-group"
              >
                <FormControlLabel value="10" control={<Radio/>} label="10 minute"/>
                <FormControlLabel value="1000" control={<Radio/>} label="No time limit"/>
              </RadioGroup>
            </FormControl>

            <div className="pt-2">
              <div className="col d-flex justify-content-center">
                <Button type="submit" variant="contained" color="secondary" className="mx-3"
                        onClick={handleClose}>
                  Close
                </Button>

                <Button type="submit" variant="contained" color="primary" className="mx-3"
                        onClick={handleCreate}>
                  Create
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      </LobbyWrapper>

  );
}
