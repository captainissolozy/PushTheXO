import Modal from '@material-ui/core/Modal';
import {useNavigate} from "react-router-dom";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import * as React from "react";



const CreateGameModal = ({open}) => {

    const navigate = useNavigate();
    const handleClose = () => {

    }
    const handleCreate = () => {
        navigate("/game")
    }

    return (

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
    )
}

export default CreateGameModal;