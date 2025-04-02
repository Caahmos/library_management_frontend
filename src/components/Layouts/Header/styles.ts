import styled from 'styled-components'

export const Container = styled.header`
    grid-area: HD;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};
    
    min-height: 80px;
    height: auto;
`;

