import styled from "styled-components";
import { FaGithub } from "react-icons/fa";

export const Container = styled.footer`
    width: 100%;
    color: ${ props => props.theme.colors.white };
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 1;
    `;

export const Content = styled.div`
    align-self: self-end;
    flex-wrap: wrap;
    width: 100%;
    flex-grow: 1;
    padding: 70px;
    text-align: center;
    background-color: ${ props => props.theme.colors.secondary };
    display: flex;
    justify-content: space-between;
`

export const Sign = styled.div`
    flex-wrap: wrap;
    width: 100%;
    padding: 20px;
    background-color: ${ props => props.theme.colors.primary };
    display: flex;
    justify-content: space-between;
`

export const GithubIcon = styled(FaGithub)`
    font-size: 1rem;
    color: ${ props => props.theme.colors.success };
    `
export const Copyright = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

export const AppAuthor = styled.a`
    display: flex;
    color: ${ props => props.theme.colors.white };
    align-items: center;
    text-decoration: none;
    gap: 5px;
    transition: 0.4s all ease;
    
    &:hover{
        color: ${ props => props.theme.colors.success };
    }
`
