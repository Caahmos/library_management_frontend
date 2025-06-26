import styled from "styled-components";
import { MdFilterListOff } from "react-icons/md";

interface ActiveSelect {
  isOpen?: boolean;
  $active?: boolean;
}

export const Container = styled.div`
  width: 100%;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  `;

export const Filters = styled.div`
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
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

export const Select = styled.select<ActiveSelect>`
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.$active ? props.theme.colors.success : props.theme.colors.primary};
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
  border-radius: 4px;

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
