import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContexts";
import Loginbtn from "../common/Loginbtn";
import LogoutBtn from "../common/Logoutbtn";
import {Box, Button, Typography} from "@mui/material";
import Modal from "@material-ui/core/Modal";
import * as React from "react";
import {useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import db from "../../config/firebase-config";


const Navbar = () => {

    const {user} = useUserContext()
    const [open, setOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    const handleUser = () => {
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false)
    }

    useEffect(() => {
        if (user){
        onSnapshot(doc(db, "UsersDetail", user.email), (snapshot) => {
            setUserInfo(snapshot.data())
        });
        }

    }, [open])

    return (
        <nav className="navbar navbar-light bg-dark">
            <div className="container-fluid">
                <Link to={"/home"} className="navbar-brand text-white">
                    Push, The XO
                </Link>{user? <Button variant="text" onClick={handleUser}>{user.email}</Button> : <Button></Button>}
                <Link to={"/home"} className="navbar-brand text-white">
                    {user ? <LogoutBtn/> : <Loginbtn/>}
                </Link>
            </div>
            <Modal
                open={open}
                className="d-flex justify-content-center align-items-center p-3"
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-light p-3 border border-primary rounded-3" sx={{ width: 380 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="border-bottom border-dark d-flex justify-content-center align-items-center mx-4">
                        User Information
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="m-4">
                        Email : {userInfo.email}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="m-4">
                        Win : {userInfo.Win}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="m-4">
                        Loses : {userInfo.Loses}
                    </Typography>
                </Box>
            </Modal>
        </nav>
    )
}
export default Navbar;
