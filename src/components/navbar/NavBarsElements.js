import styled from "styled-components";
import {FaBars} from "react-icons/fa";


export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  
  @media screen and (max-width: 768px){
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-120%, 75%);
    font-size: 1.4rem;
    cursor: pointer;
  }
`
