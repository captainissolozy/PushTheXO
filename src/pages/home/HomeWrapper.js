import styled from "styled-components";

const HomeWrapper = styled.div`
  .box {
    height: calc(100vh - 56px);
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
