import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
  width: 100%;
  padding: 30px;
  color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  text-align: left;
`;

export const Title = styled.h2`
  font-size: 1.4em;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 50%;
  padding: 18px;
  background-color: ${(props) => props.theme.colors.success};
  color: ${(props) => props.theme.colors.white};
  border-radius: 5px;

  &:hover {
    opacity: 0.9;
    transition: ease 0.4s all;
  }
`;

export const Select = styled.select`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
  border-radius: 4px;
  padding: 18px;

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

export const InfoFields = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Label = styled.div`
  width: 100%;
  margin-bottom: 3px;
`

export const Content = styled.div`
  width: 100%;
  /* height: 50px; */
  display: flex;
  gap: 20px;
  align-items: center;
`

export const StyledInput = styled.input`
    width: 100%;
    padding: 18px 18px 18px 40px; 
    margin: 3px 0 3px 0;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};
    border-radius: 5px;
    border: 1px solid transparent;
    transition: border 0.3s ease;

    &:hover, &:focus {
        border: 1px solid ${props => props.theme.colors.success};
    }
`;