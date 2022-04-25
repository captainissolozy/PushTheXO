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
  @media screen and (max-width: 713px){
    height: 650px;
    width: 650px;
  }
  @media screen and (max-width: 660px){
    height: 550px;
    width: 550px;
  }
  @media screen and (max-width: 560px){
    height: 450px;
    width: 450px;
  }
  @media screen and (max-width: 460px){
    height: 400px;
    width: 350px;
  }
}
.xo{
  border: 1px solid black;
  cursor: pointer;
  text-align: center;
  padding: 9px;
  @media screen and (max-width: 713px){
    padding: 7px;
  }
  @media screen and (max-width: 660px){
    padding: 5px;
  }
  @media screen and (max-width: 560px){
    padding: 4px;
  }
  @media screen and (max-width: 460px){
    padding: 0px;
  }
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
  .user-content{
    @media screen and (max-width: 1300px){
      display: none;
    }
  }
  .void{
    @media screen and (max-width: 1300px){
      display: none;
    }
  }
`
export default GamePlayWrapper