import React, {useEffect, useState} from 'react';
import GamePlayWrapper from "./GamePlayWrapper";
import { onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../../config/firebase-config";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const Game = () => {

    const [gameData, setGameData] = useState({});
    const [disable, setDisable] = useState(false);
    const [playerDataX, setPlayerDataX] = useState("Waiting for Player")
    const [playerDataY, setPlayerDataY] = useState("Waiting for Player")
    const gameKey = sessionStorage.getItem('gameKey')
    const navigate = useNavigate();
    const docRef = doc(db, 'Game', gameKey)

    const boardGame = () => {
        const row = [];

        Object.entries(gameData).map(([key, cellState]) => {
            if (!isNaN(key)) {
                row.push(<div key={key} id={key} className="xo" onClick={handleXO}>{cellState}</div>);
            }
        })
        return row;
    };

    const handleXO = async (el) => {
        console.log(el.target.id)
        await updateDoc(docRef, {[el.target.id]: 1})
    }

    const joinX = async (el) => {

        if (gameData.playerX === "") {
            setDisable(true)
            await updateDoc(docRef, {playerX: sessionStorage.getItem('email')})
            toast.success('success')
        } else {
            toast.error('Please Choose another role');
        }

    }

    const joinY = async (el) => {

        if (gameData.playerY === "") {
            setDisable(true)
            await updateDoc(docRef, {playerY: sessionStorage.getItem('email')})
            toast.success('success')
        } else {
            toast.error('Please Choose another role');
        }

    }

    const handleReset = async () => {

        const initialBoard = Object.keys(gameData).filter((key) => {
            if (!isNaN(key)) {
                return true
            } else return false

        })
        await updateDoc(docRef, Object.fromEntries(initialBoard.map((key) => [key, 0])))
        await updateDoc(docRef, {gameState: true, playerX: "", playerY: "", turn: 0,})
        setDisable(false)

    }
    useEffect(() => {
        onSnapshot(doc(db, "Game", gameKey), (snapshot) => {
            setGameData(snapshot.data())
        });
    }, [])

    if (Object.keys(gameData).length === 0) return null
    return (
        <GamePlayWrapper>
            <h2 className="text-center mb-4 p-2">Room Key : {gameKey}</h2>
            <h2 className="text-center m-4">Turn : </h2>
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-3">
                        <Button disabled={disable} variant="contained" className="w-100 mb-3" onClick={joinX}>JOIN AS
                            Player: X</Button>
                    </div>
                    <div className="col-3">
                        <Button disabled={disable} variant="contained" className="w-100 mb-3" onClick={joinY}>JOIN AS
                            Player: Y</Button>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-center">

                    <div className="col-5 d-flex justify-content-center">
                        <div>
                            <div className="game-container">
                                {
                                    boardGame()
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <h2 className="text-center">PlayerX</h2>
                        <p className="text-center mt-3">{playerDataX}</p>
                        <h2 className="text-center">PlayerO</h2>
                        <p className="text-center mt-3">{playerDataY}</p>
                    </div>
                </div>
            </div>
            <div>
                <Button variant="contained" onClick={handleReset}>Reset</Button>
            </div>
            <ToastContainer/>
        </GamePlayWrapper>
    )
}

export default Game;