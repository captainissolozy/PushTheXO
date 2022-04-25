import styled from "styled-components";

const NavWrapper = styled.div`
.btn-res{
  @media screen and (max-width: 768px){
    display: none;
  }
}
  .collapsible .content {
    padding: 6px;
    background-color: #eeeeee;
    @media screen and (min-width: 768px){
      display: none;
    }
  }
  .btn-no{
    cursor: pointer;
    @media screen and (min-width: 768px){
      display: none;
    }
  }
  .hidden{
    display: none;
    @media screen and (max-width: 768px){
      display: block;
    }
  }
`
export default NavWrapper