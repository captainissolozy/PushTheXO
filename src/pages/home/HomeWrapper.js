import styled from "styled-components";

const HomeWrapper = styled.div`
  html{
    overflow: hidden;
  }
  .box {
    height: calc(100vh - 62.5px);
  }
  .c-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 350px !important;
  }
  .home-btn {
    width: 100%;
  }
`;
export default HomeWrapper
