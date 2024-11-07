import styled from "styled-components";
import { Link } from "react-router-dom";

interface ImageProp {
  img: string;
}

export const Container = styled(Link)`
  width: 200px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
`;
export const ImageBook = styled.div<ImageProp>`
  width: 200px;
  height: 200px;
  align-self: center;
  background-image: url(${(props) => props.img});
  background-size: cover;
  border-radius: 20px;
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
  font-size: 0.9rem;
  font-weight: bold;

  > span {
    color: ${(props) => props.theme.colors.success};
    font-weight: lighter;
  }
`;

export const Rating = styled.span`
  font-size: 0.7rem;
`;
