import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.success};
`;

export const Left = styled.div`
  height: 100%;
  width: 100%;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const Right = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding: 20px;
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  }
`;