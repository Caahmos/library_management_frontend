import styled from 'styled-components'

export const Container = styled.main`
    background-color: ${ props => props.theme.colors.secondary};
    display: flex;
    justify-content: flex-start;
    grid-area: CT;
    overflow-y: scroll;
`