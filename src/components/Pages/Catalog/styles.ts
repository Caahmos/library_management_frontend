import styled from "styled-components";

export const Container = styled.div`
  max-width: 1920px;
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
`;

export const Content = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  transition: 0.4s all ease-in;
  gap: 10px;
`

export const LoadingContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ButtonMore = styled.button`
  padding: 18px;
  background-color: transparent;
  color: ${(props) => props.theme.colors.success};
  border: 1px solid ${(props) => props.theme.colors.success};
  border-radius: 7px;
  transition: 0.4s all ease-in;
  margin-bottom: 20px;

  &:hover {
    background-color: ${(props) => props.theme.colors.success};
    color: ${(props) => props.theme.colors.white};
  }
`;
