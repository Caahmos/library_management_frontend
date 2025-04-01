import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled(Link)`
    width: 100%;
    display: flex;
    margin-bottom: 25px;
    text-decoration: none;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.colors.white};
    transition: 0.1s all ease-in;

    &:hover{
        opacity: .5;
    }
`
export const Title = styled.div`
    font-weight: bold;
`;

export const Img = styled.img`
    width: 80px;
`;

export const Info = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    padding: 0 20px 0 25px;
`;

export const Button = styled.div`

`;

export const Author = styled.span`
  margin-bottom: 7px;
  font-size: 0.8rem;
  font-weight: bold;

  > span {
    color: ${(props) => props.theme.colors.success};
    font-weight: lighter;
  }
`;

export const Rating = styled.span`
  font-size: 0.7rem;
`;
