import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface RowProps {
  columns: number;
}

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  margin-bottom: 20px;
  padding: 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const Row = styled.div<RowProps>`
  width: ${({ columns }) => `calc(100% / ${columns})`};
  display: flex;
  align-items: center;

  @media screen and (max-width: 1200px) {
    width: 100%;
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
