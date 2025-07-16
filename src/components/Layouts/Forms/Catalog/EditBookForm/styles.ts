import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
  min-width: 350px;
  width: 900px;
  padding: 30px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  text-align: left;
`;

export const Title = styled.h2`
  font-size: 1.4em;
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 20px;
`;

export const Call = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 100%;
  padding: 18px;
  background-color: ${(props) => props.theme.colors.success};
  color: #fff;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    opacity: 0.9;
    transition: ease 0.4s all;
  }
`;

export const Select = styled.select`
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
  border-radius: 4px;
  margin-bottom: 10px;
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
