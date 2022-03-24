
import LobbyWrapper from "./LobbyWrapper";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../../context/UserContexts";
import SearchBar from "../../../components/common/SearchBar";
import BasicButtons from "../../../components/common/Button";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import Modal from "@material-ui/core/Modal";
import * as React from "react";
import db from "../../../config/firebase-config"
import { setDoc, doc } from "firebase/firestore"
import { v4 as uuid } from 'uuid';



export default function Lobby(){

  const initialFormData = Object.freeze({
    email: sessionStorage.getItem('email'),
    title: "",
    winCon: 0,
    timeLimit: 0
  });
  const navigate = useNavigate()
  const {user} = useUserContext()
  const [open, setOpen] = useState(false)
  const [formData, updateFormData] = useState(initialFormData)
  const [pKey, generatePKey] = useState("")

  useEffect(() =>{
    if (!user){
      navigate('/login')
    }
  },[navigate, user])

  const generateKey = function(){
    const unique_id = uuid();
    return unique_id.slice(0,8);
  }
  const handleCreate = () => {
    setOpen(true)
    generatePKey(generateKey)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()
    const docRef = doc(db, "User", pKey);
    await setDoc(docRef, formData);
    console.log(formData)
  };

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
              <BasicButtons title={'Join'} onClick={'search'}/>
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
                       label="email"
                       disabled={true}
                       value={sessionStorage.getItem('email')}
                       onChange={handleChange}
            />
            <TextField className="my-3"
                       label="Title"
                       name="title"
                       variant="filled"
                       type="text"
                       required
                       onChange={handleChange}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Win-condition</FormLabel>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="winCon"
                  onChange={handleChange}
              >
                <FormControlLabel value="2" control={<Radio/>} label="Best of 2"/>
                <FormControlLabel value="3" control={<Radio/>} label="Best of 3"/>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Time Limit</FormLabel>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="timeLimit"
                  required
                  onChange={handleChange}
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
                        onClick={handleSubmit}>
                  Create
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      </LobbyWrapper>

  );
}
