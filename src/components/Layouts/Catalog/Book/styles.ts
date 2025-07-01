import styled from "styled-components";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

export const Container = styled.div`
  width: 150px;
  height: 270px;
  position: relative;
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

export const Content = styled(Link)<LinkProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 10px;
`;

export const Circle = styled(Link)`
  width: 30px;
  height: 30px;
  position: absolute;
  border-radius: 30px;
  right: 10px;
  background-color: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`

export const Image = styled.div<{ image: string }>`
  width: 100px;
  height: 150px;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-color: #000;
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
