import styled from 'styled-components'

export const Container = styled.header`
    grid-area: HD;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    background-color: ${props => props.theme.colors.primary};
    
    min-height: 80px;
    height: auto;
`;

export const MenuIcon = styled.div`
    display: none;
    color: ${props => props.theme.colors.white};
    font-size: 25px;
    cursor: pointer;
    transition: 0.2s all ease-in;
    
    &:hover{
        color: ${props => props.theme.colors.success};
    }

    @media (max-width: 1000px) {
    display: block;
}
`

