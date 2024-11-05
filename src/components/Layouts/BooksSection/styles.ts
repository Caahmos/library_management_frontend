import styled from 'styled-components'

export const Container = styled.main`
    width: 100%;
    min-height: 300px;
    padding: 20px;
`

export const Title = styled.h3`
    margin-bottom: 10px;
    color: ${props => props.theme.colors.white}
`