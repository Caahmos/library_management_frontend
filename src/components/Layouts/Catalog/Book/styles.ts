import styled from "styled-components";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

export const Container = styled(Link)<LinkProps>`
  width: 150px;
  height: 270px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  text-decoration: none;
  transition: 0.4s all ease-in;
  
  &:hover{
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;
export const ImageBook = styled.img`
  width: 100px;
  align-self: center;
  margin-bottom: 20px;
  background-color: #fff;
`;

export const Title = styled.span`
  font-weight: bold;
  margin-bottom: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%; 
  display: block; 
`;

export const Author = styled.span`
  margin-bottom: 7px;
  font-size: 0.6rem;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  > span {
    color: ${(props) => props.theme.colors.success};
    font-weight: lighter;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`

export const Rating = styled.span`
  font-size: 0.7rem;
`;
