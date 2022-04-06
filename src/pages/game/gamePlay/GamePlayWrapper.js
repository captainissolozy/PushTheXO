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
`
export default GamePlayWrapper