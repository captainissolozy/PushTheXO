import styled from "styled-components";

const LobbyWrapper = styled.div`
.wrapper-box{
    height: calc(100vh - 62.5px);
}
.t-tab{
    height: calc(75vh - 62.5px);
  border-bottom: black;
}

.t-stick{
    position: sticky; top: 0;
    border-top: white;
}
.table{
  border-bottom: solid black 2px;
}
  .box{
    border: solid black 2px;
  }
`
export default LobbyWrapper