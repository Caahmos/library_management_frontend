import styled from "styled-components";

interface IContainer {
  $type: string;
}

interface IBarLine {
  $type: string;
  $percentLine: number;
}

export const Container = styled.div<IContainer>`
  position: fixed;
  right: 20px;
  top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 20px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) =>
    props.$type === "success" ? props.theme.colors.success : "red"};
  box-shadow: 0px 0px 44px 2px rgba(0, 0, 0, 0.50);
  -webkit-box-shadow: 0px 0px 44px 2px rgba(0, 0, 0, 0.50);
  -moz-box-shadow: 0px 0px 44px 2px rgba(0, 0, 0, 0.50);
  border-radius: 8px;
  z-index: 1000;
`;

export const MessageContent = styled.div`

`;

export const Button = styled.div`
  margin-left: 20px;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const About = styled.div`
  display: flex;
`;

export const Progress = styled.div`
  width: 100%;
`;

export const BarLine = styled.div<IBarLine>`
  width: ${(props) => props.$percentLine + "%"};
  margin-top: 10px;
  border-bottom: 2px solid
    ${(props) =>
      props.$type === "green" ? props.theme.colors.primary : "red"};
`;
