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
