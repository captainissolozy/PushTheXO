import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContexts";
import Loginbtn from "../common/Loginbtn";
import LogoutBtn from "../common/Logoutbtn";
import LogoutBtn1 from "../common/Logoutbtn1";
import LoginBtn1 from "../common/Loginbtn1";
import {Box, Button, Typography} from "@mui/material";
import Modal from "@material-ui/core/Modal";
import * as React from "react";
import {useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import db from "../../config/firebase-config";
import {Bars} from "./NavBarsElements";
import useCollapse from 'react-collapsed';
import NavWrapper from "./NavWrapper";


const Navbar = () => {

    const {user} = useUserContext()
    const [open, setOpen] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const {getCollapseProps, getToggleProps, isExpanded} = useCollapse();

    const handleUser = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (user) {
            onSnapshot(doc(db, "UsersDetail", user.email), (snapshot) => {
                setUserInfo(snapshot.data())
            });
        }

    }, [open])

    return (
        <NavWrapper>
            <nav className="navbar navbar-light bg-dark">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand text-white">
                        Push The XO
                    </Link>
                    <Bars {...getToggleProps()}/>
                    <div className="d-flex flex-end" {...getCollapseProps()}>

                            {user ?
                               <Button className="btn-no m-2" variant="text"
                                                             onClick={handleUser}>{user.email}</Button> :
                                <Button className="btn-no m-2"/>}
                                <Link to={"/home"} className="navbar-brand text-white">
                                    {user ? <LogoutBtn1 className="m-2"/> : <LoginBtn1 className="m-2" />}
                                </Link>

                    </div>
                    <div className="d-flex btn-res">
                        {user ? <Button className="btn-res" variant="text" onClick={handleUser}>{user.email}</Button> :
                            <Button className="btn-res"/>}
                        <Link to={"/home"} className="navbar-brand text-white">
                            {user ? <LogoutBtn className="btn-res"/> : <Loginbtn className="btn-res"/>}
                        </Link>
                    </div>
                </div>
                <Modal
                    open={open}
                    className="d-flex justify-content-center align-items-center p-3"
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="bg-light p-3 border border-primary rounded-3" sx={{width: 380}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2"
                                    className="border-bottom border-dark d-flex justify-content-center align-items-center mx-4">
                            User Information
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}} className="m-4">
                            Email : {userInfo.email}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}} className="m-4">
                            Win : {userInfo.Win}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}} className="m-4 border-bottom border-dark">
                            Loses : {userInfo.Loses}
                        </Typography>
                        <h3 className="mx-3">How to Win</h3>
                        <p> - Players alternate turns placing X or O on an empty box. X plays first.
                            The winner is the first player to form an unbroken chain of five XO horizontally,
                            vertically,
                            or diagonally.</p>
                        <h4 className="mx-3">IRONXO</h4>
                        <p> - IronXO are the pawn that can't be destroy by the Bomb. Player Can only place 1 IronXO</p>
                        <h4 className="mx-3">Bomb</h4>
                        <p> - Bomb are the Action that perform an act of destroying the target XO that you choose.
                            Player can only use Bomb once</p>
                    </Box>
                </Modal>
            </nav>
        </NavWrapper>
    )
}
export default Navbar;
