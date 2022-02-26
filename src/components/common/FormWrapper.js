import styled from "styled-components";

const FormWrapper = styled.div`
  .box {
    height: calc(100% - 56px);
  }
  .c-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 350px !important;
  }
`;
export default FormWrapper;
