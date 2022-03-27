import React, {useEffect, useState} from 'react';
import GamePlayWrapper from "./GamePlayWrapper";
import {collection, onSnapshot, doc, getDoc} from "firebase/firestore";
import db from "../../../config/firebase-config";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Game = () => {

    const [gameData, setGameData] = useState([]);
    const gameKey = sessionStorage.getItem('gameKey')
    const navigate = useNavigate();
    const docRef = doc(db, 'Game', gameKey)

    const boardGame = () => {
        const row = [];
        for (let i = 1; i <= 225; i++) {
            const string = i.toString()
            const id = string
            row.push(<div key={i} id={id} className="xo" onClick={handleXO}/>);
        }
        return row;
    };

    const handleXO = () => {

    }

    console.log(gameData)

    useEffect(() => {
        onSnapshot(doc(db, "Game", gameKey), (snapshot) => {
            setGameData(snapshot.data())
        });
    }, [])

    return (
        <GamePlayWrapper>
            <h2 className="text-center m-4">Room Key : {gameKey}</h2>
            <h2 className="text-center m-4">Turn : </h2>
            <div className="container">
            <div className="row justify-content-center">

                <div className="col-3">
                    <Button variant="contained" className="w-100 mb-3">JOIN AS Player: X</Button>
                </div>
                <div className="col-3">
                    <Button variant="contained" className="w-100 mb-3">JOIN AS Player: Y</Button>
                </div>
            </div>
            </div>
            <div className="container-fluid">
            <div className="row justify-content-center">
                    <div className="game-container">
                        {
                            boardGame()
                        }
                    </div>

            </div>
            </div>

        </GamePlayWrapper>
    )
}

export default Game;