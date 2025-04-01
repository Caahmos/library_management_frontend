import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

interface isActive {
  isOpen: boolean
};

export const CloseButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.white};
  margin-right: 12px;
  font-size: 18px;
`

export const Container = styled.div`
  position: relative;
  width: 550px;
  margin: 0 10px;   
`;

export const StyledInputContainer = styled.div`
  display: flex;
  border-radius: 8px;
  align-items: center;
  position: relative;
  border: 1px solid ${props => props.theme.colors.success};
  width: 100%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  color: ${props => props.theme.colors.success};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.success};
  }
`;

export const Dropdown = styled.div<isActive>`
  display: ${ props => props.isOpen ? 'block' : 'none'};
  position: absolute;
  top: 100%;         
  left: 0;
  width: 100%;
  max-height: 400px;
  overflow-y: scroll;
  background: ${props => props.theme.colors.primary};
  padding: 20px;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 26px rgba(0, 0, 0, 0.4);
  z-index: 100;      
`;