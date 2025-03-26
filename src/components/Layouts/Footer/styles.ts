import styled from "styled-components";

export const Container = styled.footer`
    width: 100%;
    color: ${ props => props.theme.colors.white };
    display: flex;
    justify-content: center;
    flex-direction: column;
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