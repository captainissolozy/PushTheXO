import styled from "styled-components";

const FormWrapper = styled.div`
  .regis-b {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
  }
  .box {
    height: calc(100vh - 56px);
    z-index: -10;
  }
  .c-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 350px !important;
  }
  .font{
    font-size: 1.2em;
  }
`;
export default FormWrapper;
