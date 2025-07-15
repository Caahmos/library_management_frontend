import styled from "styled-components";

export const Container = styled.div`
  width: fit-content;
  font-size: 0.7rem;
  padding: 5px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.success};
  border: 1px solid ${(props) => props.theme.colors.success};
  font-weight: bold;
`;
