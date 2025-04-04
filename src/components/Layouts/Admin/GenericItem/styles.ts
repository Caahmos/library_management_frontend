import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 20px;
  padding: 20px;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 20%;
  align-items: center;

  @media screen and (max-width: 1200px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
`;

export const Label = styled.div`
  display: none;

  @media screen and (max-width: 1200px) {
    display: block;
    width: 50%;
    color: ${(props) => props.theme.colors.success};
  }
`;

export const Cell = styled.div`
  width: 100%;

  @media screen and (max-width: 1200px) {
    width: 50%;
  }
`;

export const Functions = styled.div`
  display: flex;
  width: 20%;
  justify-content: flex-start;
  gap: 8px;

  @media screen and (max-width: 1200px) {
    width: 50%;
  }
`;

export const LinkIcon = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.success};
  font-size: 20px;
  transition: 0.3s all ease-in;

  &:hover {
    opacity: 0.7;
  }
`;
