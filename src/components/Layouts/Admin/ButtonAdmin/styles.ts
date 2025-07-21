import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
    text-decoration: none;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    width: 100%;
    /* border-bottom: 1px solid ${props => props.theme.colors.white}; */
    padding: 20px;
    border-radius: 7px;
    display: flex; 
    justify-content: space-between;
    align-items: center;
`
export const Content = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 15px;

    > svg {
        font-size: 1.6rem;
        color: ${props => props.theme.colors.success};
    }
`

export const Count = styled.div`
    margin-right: 5px;
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
`

export const Rank = styled.div`
`

export const Title = styled.div`
`

export const Author = styled.div`
    font-size: 0.8rem;
    color: ${props => props.theme.colors.success};
`

