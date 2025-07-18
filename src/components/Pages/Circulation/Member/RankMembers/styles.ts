import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 1280px;
    /* background: linear-gradient(35deg,rgba(212, 40, 40, 0) 60%, rgba(212, 40, 40, 0.86) 100%); */
    display: flex;
    flex-direction: column;
    `;

export const ListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px;
    `

export const ButtonMore = styled.button`
    padding: 18px;
    background-color: transparent;
    color: ${props => props.theme.colors.success};
    border: 1px solid ${props => props.theme.colors.success};
    border-radius: 7px;
    transition: 0.4s all ease-in;
    
    &:hover{
        background-color: ${props => props.theme.colors.success};
        color: ${props => props.theme.colors.white};
    }
`
