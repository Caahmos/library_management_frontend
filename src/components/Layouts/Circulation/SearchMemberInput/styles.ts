import styled from "styled-components";

interface DropdownProps {
  $isopen: boolean
};

export const CloseButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.white};
  margin-right: 12px;
  font-size: 18px;
`

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 10px;   

  @media (max-width: 1000px) {
    width: 100%;
}
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

export const Dropdown = styled.div<DropdownProps>`
  display: ${ props => props.$isopen ? 'block' : 'none'};
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

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.tertiary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.success || "#00a293"};
  }
`;

export const SelectMethod = styled.select`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  outline: none;
  margin-right: 8px;
  font-size: 14px;
  cursor: pointer;
  
  option {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ResultsContainer = styled.div`
  width: 100%;
  height: 2000px;
  background-color: ${props => props.theme.colors.secondary};
`