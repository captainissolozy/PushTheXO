import React, {useEffect, useState} from 'react';
import GamePlayWrapper from "./GamePlayWrapper";
import {onSnapshot, doc, getDoc, updateDoc, deleteDoc} from "firebase/firestore";
import db from "../../../config/firebase-config";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Modal from "@material-ui/core/Modal";

const Game = () => {

    const [gameData, setGameData] = useState({});
    const [userXData, setUserXData] = useState({});
    const [userOData, setUserOData] = useState({});
    const [lobbyData, setLobbyData] = useState({});
    const [disableX, setDisableX] = useState(false);
    const [disableO, setDisableO] = useState(false);
    const [disableCancel, setDisableCancel] = useState(true);
    const [disableIron, setDisableIron] = useState(false);
    const [disableBomb, setDisableBomb] = useState(false);
    const [userInfo, setUserInfo] = useState({})
    const [modal, setModal] = useState("");
    const [open, setOpen] = useState(false)
    const [winX, setWinX] = useState(0)
    const [winY, setWinY] = useState(0)
    const [pawnState, setPawnState] = useState(0)
    const [winCon, setWinCon] = useState(0)
    const gameKey = sessionStorage.getItem('gameKey')
    const [turn, setTurn] = useState('Waiting')
    const navigate = useNavigate();
    const docRef = doc(db, 'Game', gameKey)
    const docRef2 = doc(db, 'User', gameKey)

    const boardGame = () => {
        const row = [];

        Object.entries(gameData).map(([key, cellState]) => {
            if (!isNaN(key)) {
                row.push(<div key={key} id={key} className="xo" onClick={handleXO}>{cellState}</div>);
            }
        })
        return row;
    };

    useEffect(async () => {
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            navigate('/lobby')
        }
    }, [gameData])

    const handleTerminate = () => {
        sessionStorage.setItem('Iron', "no")
        sessionStorage.setItem('Bomb', "no")
        const confirmBox1 = window.confirm(
            "Do you really want to Terminate the room?"
        )
        if (confirmBox1 === true) {
            if (Object.keys(lobbyData).length !== 0) {
                if (lobbyData.email === sessionStorage.getItem('email')) {
                    deleteDoc(docRef)
                    deleteDoc(docRef2)
                    navigate('/lobby')
                } else {
                    toast.error('Only Host can terminate Game', {toastId: 5});
                }
            }
        }

    }

    const handleXO = async (el) => {
        if (gameData.gameState === true) {
            if (gameData.turn % 2 === 0 && sessionStorage.getItem('email') === gameData.playerX) {
                if (gameData[el.target.id] === "" && sessionStorage.getItem('Iron') === "yes") {
                    await updateDoc(docRef, {[el.target.id]: "X", turn: gameData.turn + 1, ironX: el.target.id})
                    sessionStorage.setItem('Iron', "used")
                    setDisableCancel(true)
                } else if (gameData[el.target.id] === "") {
                    await updateDoc(docRef, {[el.target.id]: "X", turn: gameData.turn + 1})
                } else if (gameData[el.target.id] !== "X" && sessionStorage.getItem('Bomb') === "yes" && gameData.ironO !== el.target.id) {
                    sessionStorage.setItem('Bomb', "used")
                    await updateDoc(docRef, {[el.target.id]: ""})
                    setDisableCancel(true)
                } else if (gameData[el.target.id] !== "X" && sessionStorage.getItem('Bomb') === "yes" && gameData.ironO === el.target.id) {
                    toast.error('This pawn is IRON pawn', {toastId: 10});
                }
            }
            if (gameData.turn % 2 === 1 && sessionStorage.getItem('email') === gameData.playerY) {
                if (gameData[el.target.id] === "" && sessionStorage.getItem('Iron') === "yes") {
                    await updateDoc(docRef, {[el.target.id]: "O", turn: gameData.turn + 1, ironO: el.target.id})
                    sessionStorage.setItem('Iron', "used")
                    setDisableCancel(true)
                } else if (gameData[el.target.id] === "") {
                    await updateDoc(docRef, {[el.target.id]: "O", turn: gameData.turn + 1})
                } else if (gameData[el.target.id] !== "O" && sessionStorage.getItem('Bomb') === "yes" && gameData.ironX !== el.target.id) {
                    sessionStorage.setItem('Bomb', "used")
                    await updateDoc(docRef, {[el.target.id]: ""})
                    setDisableCancel(true)
                } else if (gameData[el.target.id] !== "O" && sessionStorage.getItem('Bomb') === "yes" && gameData.ironX === el.target.id) {
                    toast.error('This pawn is IRON pawn', {toastId: 10});
                }
            }
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const joinX = async () => {

        if (gameData.playerX === "" && gameData.playerY !== sessionStorage.getItem('email')) {
            await updateDoc(docRef, {playerX: sessionStorage.getItem('email')})
            toast.success('success')
        } else {
            toast.error('Please Choose another role', {toastId: 2});
        }

    }

    const joinY = async () => {

        if (gameData.playerY === "" && gameData.playerX !== sessionStorage.getItem('email')) {
            await updateDoc(docRef, {playerY: sessionStorage.getItem('email')})
            toast.success('success')
        } else {
            toast.error('Please Choose another role', {toastId: 2});
        }

    }
    const resetBoard = async () => {
        const initialBoard = Object.keys(gameData).filter((key) => {
            return !isNaN(key);
        })
        await updateDoc(docRef, Object.fromEntries(initialBoard.map((key) => [key, ''])))
    }

    const handleGiveUp = async () => {
        if (gameData.gameState === true) {
            if (sessionStorage.getItem('email') === gameData.playerX) {
                await updateDoc(docRef, {turn: 0, winY: gameData.winY + 1, gameState: false})
            } else if (sessionStorage.getItem('email') === gameData.playerY) {
                await updateDoc(docRef, {turn: 0, winX: gameData.winX + 1, gameState: false})
            }
        }

    }

    const handleStart = () => {
        if (sessionStorage.getItem('email') === gameData.playerX) {
            if (gameData.playerX !== "" && gameData.playerY !== "" && gameData.gameState !== true) {
                updateDoc(docRef, {gameState: true})
                resetBoard().then()
                toast.success('Game Start', {toastId: 3});
            } else {
                toast.error('Please Choose Your role first', {toastId: 3});
            }
            updateDoc(docRef2, {WinState: true}).then()
        } else {
            toast.error('Only Player X can Start Game', {toastId: 7});
        }
    }

    const winMatch = (winner) => {
        setDisableX(false)
        setDisableO(false)
        sessionStorage.setItem('Iron', "no")
        sessionStorage.setItem('Bomb', "no")
        if (winner === gameData.playerX) {
            const docRef0 = doc(db, 'UsersDetail', winner)
            updateDoc(docRef0, {Win: userXData.Win + 1})
            const docRef1 = doc(db, 'UsersDetail', gameData.playerY)
            updateDoc(docRef1, {Loses: userOData.Loses + 1})

        } else {
            const docRef0 = doc(db, 'UsersDetail', winner)
            updateDoc(docRef0, {Win: userOData.Win + 1})
            const docRef1 = doc(db, 'UsersDetail', gameData.playerX)
            updateDoc(docRef1, {Loses: userXData.Loses + 1})
        }
        updateDoc(docRef, {turn: 0, playerX: "", playerY: "", winX: 0, winY: 0}).then()
    }

    useEffect(() => {
        onSnapshot(doc(db, "User", gameKey), (snapshot) => {
            setLobbyData(snapshot.data())
        });
        onSnapshot(doc(db, "UsersDetail", sessionStorage.getItem('email')), (snapshot) => {
            setUserInfo(snapshot.data())
        });
    }, [])

    useEffect(() => {
        onSnapshot(doc(db, "Game", gameKey), (snapshot) => {
            setGameData(snapshot.data())
        });
    }, [])

    useEffect(() => {
        if (Object.keys(gameData).length !== 0 && gameData.playerX !== "" && gameData.playerY !== "") {
            onSnapshot(doc(db, "UsersDetail", gameData.playerX), (snapshot) => {
                setUserXData(snapshot.data())
            });
            onSnapshot(doc(db, "UsersDetail", gameData.playerY), (snapshot) => {
                setUserOData(snapshot.data())
            });
        }
    }, [gameData])


    useEffect(() => {
        setWinX(gameData.winX)
        setWinY(gameData.winY)
        if (gameData.winCon === 3 && gameData.turn === 0) {
            setWinCon(2)
        } else if (gameData.winCon === 2 && gameData.turn === 0) {
            setWinCon(1)
        }
        if (gameData.turn % 2 === 0) {
            setTurn('X')
        } else if (gameData.turn % 2 === 1) {
            setTurn('O')
        }
        if (gameData.playerY !== "" && typeof gameData.playerY !== "undefined") {
            setDisableO(true)
        }
        if (gameData.playerX !== "" && typeof gameData.playerY !== "undefined") {
            setDisableX(true)
        } else if (gameData.gameState === false) {
            setDisableX(false)
            setDisableO(false)
        }
        if (gameData.gameState === true && gameData.turn >= 8) {
            for (let i = 1; i <= 225; i++) {
                if (gameData[i] !== "") {
                    if (gameData[i] === gameData[i + 1] && gameData[i] === gameData[i + 2]
                        && gameData[i] === gameData[i + 3] && gameData[i] === gameData[i + 4]) {
                        sessionStorage.setItem('Bomb', "no")
                        sessionStorage.setItem('Iron', "no")
                        if (turn === "X") {
                            updateDoc(docRef, {turn: 0, winX: gameData.winX + 1, gameState: false}).then()
                            gameData.gameState = false
                            toast.success('X win', {position: toast.POSITION.TOP_CENTER, toastId: 1});
                        } else if (turn === "O") {
                            updateDoc(docRef, {turn: 0, winY: gameData.winY + 1, gameState: false}).then()
                            gameData.gameState = false
                            toast.success('O win', {position: toast.POSITION.TOP_CENTER, toastId: 1});
                        }
                    }
                    if (gameData[i] === gameData[i + 16] && gameData[i] === gameData[i + 32]
                        && gameData[i] === gameData[i + 48] && gameData[i] === gameData[i + 64]) {
                        sessionStorage.setItem('Bomb', "no")
                        sessionStorage.setItem('Iron', "no")
                        if (turn === "X") {
                            updateDoc(docRef, {turn: 0, winX: gameData.winX + 1, gameState: false}).then()
                            gameData.gameState = false
                            toast.success('X win', {position: toast.POSITION.TOP_CENTER, toastId: 1});
                        } else if (turn === "O") {
                            updateDoc(docRef, {turn: 0, winY: gameData.winY + 1, gameState: false}).then()
                            gameData.gameState = false
                            toast.success('O win', {position: toast.POSITION.TOP_CENTER, toastId: 1});
                        }
                    }
                    if (gameData[i] === gameData[i + 15] && gameData[i] === gameData[i + 30]
                        && gameData[i] === gameData[i + 45] && gameData[i] === gameData[i + 60]) {
                        sessionStorage.setItem('Bomb', "no")
                        sessionStorage.setItem('Iron', "no")
                        if (turn === "X") {
                            updateDoc(docRef, {turn: 0, winX: gameData.winX + 1, gameState: false}).then()
                            gameData.gameState = false
                            toast.success('X win', {position: toast.POSITION.TOP_CENTER, toastId: 1});
                        } else if (turn === "O") {
                            updateDoc(docRef, {turn: 0, winY: gameData.winY + 1, gameState: false}).then()
                            gameData.gameState = false
                            toast.success('O win', {position: toast.POSITION.TOP_CENTER, toastId: 1});
                        }
                    }
                    if (gameData[i] === gameData[i + 14] && gameData[i] === gameData[i + 28]
                        && gameData[i] === gameData[i + 42] && gameData[i] === gameData[i + 56]) {
                        sessionStorage.setItem('Bomb', "no")
                        sessionStorage.setItem('Iron', "no")
                        if (turn === "X") {
                            updateDoc(docRef, {turn: 0, winX: gameData.winX + 1, gameState: false}).then()
                            gameData.gameState = false
                            toast.success('X win', {position: toast.POSITION.TOP_CENTER, toastId: 1});
                        } else if (turn === "O") {
                            updateDoc(docRef, {turn: 0, winY: gameData.winY + 1, gameState: false}).then()
                            gameData.gameState = false
                            toast.success('O win', {position: toast.POSITION.TOP_CENTER, toastId: 1});
                        }
                    }
                }
            }
        }
        if (gameData.gameState === false && lobbyData.WinState === true && (gameData.winX === winCon || gameData.winY === winCon)) {
            if (gameData.winX === winCon && gameData.playerX === sessionStorage.getItem('email')) {
                setOpen(true)
                setModal("You Win!!")
            } else if (gameData.winX === winCon && gameData.playerX !== sessionStorage.getItem('email')) {
                setOpen(true)
                setModal("You Loses!!")
            }
            if (gameData.winY === winCon && gameData.playerY === sessionStorage.getItem('email')) {
                setOpen(true)
                setModal("You Win!!")
            } else if (gameData.winY === winCon && gameData.playerY !== sessionStorage.getItem('email')) {
                setOpen(true)
                setModal("You Loses!!")
            }

        }
        if (lobbyData.WinState === true) {
            if (gameData.winX === winCon) {
                updateDoc(docRef2, {WinState: false}).then()
                lobbyData.WinState = false
                winMatch(gameData.playerX)
                resetBoard().then()

            } else if (gameData.winY === winCon) {
                updateDoc(docRef2, {WinState: false}).then()
                lobbyData.WinState = false
                winMatch(gameData.playerY)
                resetBoard().then()
            }
        }
        if (sessionStorage.getItem('Iron') === "yes" || sessionStorage.getItem('Iron') === "used") {
            setDisableIron(true)
        }
        if (sessionStorage.getItem('Bomb') === "yes" || sessionStorage.getItem('Bomb') === "used") {
            setDisableBomb(true)
        }
        if (sessionStorage.getItem('Iron') === "no") {
            setDisableIron(false)
        }
        if (sessionStorage.getItem('Bomb') === "no") {
            setDisableBomb(false)
        }
        if (sessionStorage.getItem('Iron') === "yes" || sessionStorage.getItem('Bomb') === "yes") {
            setDisableCancel(false)
        }

    }, [gameData])

    window.onerror = function () {
        toast.error('Host left', {toastId: 8})
        sessionStorage.setItem('Iron', "no")
        sessionStorage.setItem('Bomb', "no")
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }

    const handleCancel = () => {
        setDisableCancel(true)
        if (sessionStorage.getItem('Iron') === "yes") {
            setDisableIron(false)
            sessionStorage.setItem('Iron', "no")
        } else if (sessionStorage.getItem('Bomb') === "yes") {
            setDisableBomb(false)
            sessionStorage.setItem('Bomb', "no")
        }
    }

    const handleIron = () => {
        if (gameData.gameState === true) {
            if (sessionStorage.getItem('Bomb') !== "yes") {
                setDisableCancel(false)
                setDisableIron(true)
                sessionStorage.setItem('Iron', "yes")
            }
        }
    }

    const handleBomb = () => {
        if (gameData.gameState === true) {
            if (sessionStorage.getItem('Iron') !== "yes") {
                setDisableCancel(false)
                setDisableBomb(true)
                sessionStorage.setItem('Bomb', "yes")
            }
        }
    }

    if (Object.keys(gameData).length === 0) return null
    return (
        <GamePlayWrapper>
            <div className="col">
                <h2 className="text-center mb-2 p-2">Room Key : {gameKey} <Button variant="contained" color="error"
                                                                                  className="mx-4"
                                                                                  onClick={handleTerminate}>Terminate
                    Game</Button></h2>
            </div>

            <h4 className="text-center m-2">Best of {gameData.winCon} Turn : {turn}</h4>
            <div className="container">
                <div className="row justify-content-center r-join">

                    <div className="col-3 x-join">
                        <Button disabled={disableX} variant="contained" className="w-100 mb-3" onClick={joinX}>JOIN AS
                            Player: X</Button>
                    </div>
                    <div className="col-3 y-join">
                        <Button disabled={disableO} variant="contained" className="w-100 mb-3" onClick={joinY}>JOIN AS
                            Player: O</Button>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-2 user-content">
                        <div className="user-x">
                            <h2 className="text-center">Player X: {winX}</h2>
                            <p className="text-center mt-3">{gameData.playerX}</p>
                            <h3 className="text-center mt-3">20</h3>
                        </div>
                        <div className="user-o">
                            <h2 className="text-center">Player O: {winY}</h2>
                            <p className="text-center mt-3">{gameData.playerY}</p>
                            <h3 className="text-center mt-3">20</h3>
                        </div>
                        <div className="button-special d-flex justify-content-center">
                            <Button disabled={disableCancel} variant="contained" color="error" className="start-style"
                                    onClick={handleCancel}>cancel</Button>
                        </div>
                    </div>

                    <div className="col-6 d-flex justify-content-center">
                        <div>
                            <div className="game-container">
                                {
                                    boardGame()
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-2 mx-2">

                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4 mb-2">
                <Button disabled={disableIron} variant="outlined" className="mx-4 iron-style"
                        onClick={handleIron}>IronXO</Button>
                <Button disabled={disableBomb} variant="outlined" className="mx-4 bomb-style"
                        onClick={handleBomb}>Bomb</Button>
                <Button variant="contained" color="error" className="mx-4 giveUp-style" onClick={() => {
                    const confirmBox = window.confirm(
                        "Do you really want to give up?"
                    )
                    if (confirmBox === true) {
                        handleGiveUp().then()
                    }
                }}>Give up</Button>
                <Button variant="contained" className="mx-4 start-style" onClick={handleStart}>Start</Button>
            </div>

            <ToastContainer limit={4} autoClose={700}/>
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
                        {modal}
                    </Typography>

                </Box>
            </Modal>
        </GamePlayWrapper>
    )
}

export default Game;