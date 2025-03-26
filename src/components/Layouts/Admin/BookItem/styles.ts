import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.colors.white};
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.white};
    display: flex; 
    justify-content: space-between;
    align-items: center;
`
export const Content = styled.div`
    display: flex;
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

