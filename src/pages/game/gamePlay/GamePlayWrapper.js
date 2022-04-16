import styled from "styled-components";

const GamePlayWrapper = styled.div`
.game-container{
  display: grid;
  grid-template: repeat(15, 1fr) / repeat(15, 1fr);
  height: 700px;
  width: 700px;
  border: #383b3e 1px solid;
  margin: 0;
  padding: 0;
}
.xo{
  border: 1px solid black;
  cursor: pointer;
  text-align: center;
  padding: 9px;
}
  .returnl-box{
    height: 200px;
    width: 300px;
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`
export default GamePlayWrapper