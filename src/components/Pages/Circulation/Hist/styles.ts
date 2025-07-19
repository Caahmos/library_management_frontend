import { MdFilterListOff } from "react-icons/md";
import styled from "styled-components";

interface ActiveSelect {
  isOpen?: boolean;
  $active?: boolean;
}

export const Container = styled.div`
    width: 100%;
    max-width: 1280px;
    display: flex;
    flex-direction: column;
    `;

export const FiltersContainer = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  `;

export const FiltersContent = styled.div`
  width: 100%;
  padding: 15px;
  height: fit-content;
  background-color: ${(props) => props.theme.colors.secondary};
  display: grid;
  border-radius: 7px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  `;

export const Filters = styled.div`
  width: 100%;
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`

export const ClearFiltersIcon = styled(MdFilterListOff)`
  font-size: 1.6rem;
  cursor: pointer;
  transition: 0.4s all ease-in;

  &:hover{
    color: ${(props) => props.theme.colors.success};
  }
`

export const Text = styled.div`
  color: ${(props) => props.theme.colors.white};
`;

export const Select = styled.select`
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
  border-radius: 7px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.tertiary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.tertiary};
  }

  @media screen and (max-width: 1000px){
    width: 100%;
  }
`;

export const Option = styled.option`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
`;

export const Clean = styled.button`
  cursor: pointer;
  transition: 0.4s all ease-in;
  display: flex;
  align-items: center;
  font-size: 1rem;
  gap: 7px;
  background-color: transparent;
  color: ${(props) => props.theme.colors.white};

  &:hover{
    color: ${(props) => props.theme.colors.success};
  }

  > svg {
    font-size: 1.5rem;
  }
`

export const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    padding: 18px 18px 18px 40px; 
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};
    border-radius: 5px;
    border: 1px solid transparent;
    transition: border 0.3s ease;

    &:hover, &:focus {
        border: 1px solid ${props => props.theme.colors.success};
    }
`;

export const DataContent = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  min-height: fit-content;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
`;