import Square from "./Square";
import GamePlayWrapper from "./GamePlayWrapper";

const Board = ({squares, onClick}) => {

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
                </div>
            </div>
        </GamePlayWrapper>
    )
}

export default Board