import styled from 'styled-components'

export const Container = styled.main`
    background-color: ${ props => props.theme.colors.primary};
    display: flex;
    justify-content: center;
    grid-area: CT;
    overflow-y: scroll;

    &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.tertiary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.success};
  }
`