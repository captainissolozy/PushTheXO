import Square from "./Square";
import GamePlayWrapper from "./GamePlayWrapper";
import {Button} from "@mui/material";

const Board = ({squares, onClick, props, pKey}) => {

    const coords = [];
    for (let i = 1; i <= 225; i++) {
        coords.push(i);
    }

    const style = {
        borderRadius: "10px",
        margin: "0 auto",
        display: "grid",
        gridTemplate: "repeat(15, 1fr) / repeat(15, 1fr)",
    };

    const squareList = coords.map((item, index) => {
        return <Square key={index} value={item} onClick={() => onClick("dummy value")}/>
    })

    return (
        <GamePlayWrapper>
            <div className="box">
                <div className="row">
                    <div className="col-8 m-5">
                    <div style={style} className="container-fluid">
                        {squareList}
                    </div>
                    </div>
                    <div className="col-3 m-2 mt-5">
                        <h1>Title</h1>
                    </div>
                </div>
                <div className="row m-3">
                    <div className="col-8 mx-5">
                        <div className="d-flex justify-content-center">
                    <Button  variant="contained" className="col-3 m-2">Strong</Button>
                    <Button  variant="contained" className="col-3 m-2">Bomb</Button>
                    <Button  variant="contained" className="col-3 m-2">Obese</Button>
                        </div>
                    </div>
                </div>
            </div>
        </GamePlayWrapper>
    )
}

export default Board