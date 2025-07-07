import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding: 20px;
`;

export const Header = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 7px;
    color: ${props => props.theme.colors.success};
    font-weight: bold;
`

export const Item = styled.div`
    width: 100%;
    display: grid;
    padding: 7px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

