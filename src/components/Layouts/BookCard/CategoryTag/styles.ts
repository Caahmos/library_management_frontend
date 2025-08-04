import styled from "styled-components";

export const Container = styled.div<{color1?: string | null, color2?: string | null}>`
  width: fit-content;
  font-size: 0.6rem;
  padding: 3px 8px;
  align-self: center;
  border-radius: 5px;
  color: ${(props) => props.color1 || props.color2 || props.theme.colors.success};
  border: 1px solid ${(props) => props.color1 || props.color2 || props.theme.colors.success};
  font-weight: bold;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  gap: 5px;
`;

export const Circle = styled.div<{color1?: string | null}>`
  width: 10px;
  height: 10px;  
  border-radius: 100%;
  background-color: ${(props) => props.color1 };
`;

export const Line = styled.div<{color1?: string | null}>`
  width: 20px;
  height: 7px;  
  background-color: ${(props) => props.color1 };
`;

export const LineGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  justify-content: center;
`
