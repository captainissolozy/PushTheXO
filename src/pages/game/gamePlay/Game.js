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
    const [userInfo, setUserInfo] = useState({})
    const [open, setOpen] = useState(false)
    const [winX, setWinX] = useState(0)
    const [winY, setWinY] = useState(0)
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
                if (gameData[el.target.id] === "") {

                    await updateDoc(docRef, {[el.target.id]: "X"})
                    await updateDoc(docRef, {turn: gameData.turn + 1})
                }
            }
            if (gameData.turn % 2 === 1 && sessionStorage.getItem('email') === gameData.playerY) {
                if (gameData[el.target.id] === "") {

                    await updateDoc(docRef, {[el.target.id]: "O"})
                    await updateDoc(docRef, {turn: gameData.turn + 1});
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
        const initialBoard = Object.keys(gameData).filter((key) => {
            return !isNaN(key);

        })
        await updateDoc(docRef, Object.fromEntries(initialBoard.map((key) => [key, ''])))
        if (sessionStorage.getItem('email') === gameData.playerX) {
            await updateDoc(docRef, {turn: 0, winY: gameData.winY + 1})
        } else if (sessionStorage.getItem('email') === gameData.playerY) {
            await updateDoc(docRef, {turn: 0, winX: gameData.winX + 1})
        }

    }

    const handleStart = () => {
        if (gameData.playerX !== "" && gameData.playerY !== "" && gameData.gameState !== true) {
            updateDoc(docRef, {gameState: true})
            resetBoard().then()
            toast.success('Game Start', {toastId: 3});
        } else {
            toast.error('Please Choose Your role first', {toastId: 3});
        }
        updateDoc(docRef2, {WinState: true}).then()
    }

    const winMatch = (winner) => {
        setDisableX(false)
        setDisableO(false)


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
        if (lobbyData.WinState === true) {
            if (gameData.winX === winCon && gameData.turn >= 8) {
                updateDoc(docRef2, {WinState: false}).then()
                lobbyData.WinState = false
                winMatch(gameData.playerX)
                resetBoard().then()
                setOpen(true)
            } else if (gameData.winY === winCon && gameData.turn >= 8) {
                updateDoc(docRef2, {WinState: false}).then()
                lobbyData.WinState = false
                winMatch(gameData.playerY)
                resetBoard().then()
                setOpen(true)
            }
        }

    }, [gameData])

    window.onerror = function() {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
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
            <h3 className="text-center m-4">Best of {gameData.winCon}</h3>
            <h4 className="text-center m-2">Turn : {turn}</h4>
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-3">
                        <Button disabled={disableX} variant="contained" className="w-100 mb-3" onClick={joinX}>JOIN AS
                            Player: X</Button>
                    </div>
                    <div className="col-3">
                        <Button disabled={disableO} variant="contained" className="w-100 mb-3" onClick={joinY}>JOIN AS
                            Player: O</Button>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-2">
                        <h1 className="text-center"> {winX}</h1>
                        <h2 className="text-center">Player X</h2>
                        <p className="text-center mt-3">{gameData.playerX}</p>
                        <h3 className="text-center mt-3">Time limit:</h3>

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

                    <div className="col-2">
                        <h1 className="text-center"> {winY}</h1>
                        <h2 className="text-center">Player O</h2>
                        <p className="text-center mt-3">{gameData.playerY}</p>
                        <h3 className="text-center mt-3">Time limit:</h3>

                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4 mb-2">
                <Button variant="outlined" className="mx-4">IronXO</Button>
                <Button variant="outlined" className="mx-4">Bomb</Button>
                <Button variant="contained" color="error" className="mx-4" onClick={() => {
                    const confirmBox = window.confirm(
                        "Do you really want to give up?"
                    )
                    if (confirmBox === true) {
                        handleGiveUp().then()
                    }
                }}>Give up</Button>
                <Button variant="contained" className="mx-4" onClick={handleStart}>Start</Button>
            </div>

            <ToastContainer limit={4} autoClose={700}/>
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
        </GamePlayWrapper>
    )
}

export default Game;