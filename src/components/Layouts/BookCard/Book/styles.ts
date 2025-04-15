import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
  width: 180px;
  min-height: 330px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  cursor: grab;
  padding: 12px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  
  &:hover{
    border: 2px solid ${(props) => props.theme.colors.success};
  }
`;
export const ImageBook = styled.img`
  width: 100%;
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
