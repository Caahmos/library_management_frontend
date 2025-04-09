import styled from "styled-components";

interface ActiveSelect {
  isOpen?: boolean;
  active?: boolean;
}

export const Container = styled.div`
  width: 100%;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

export const Text = styled.div`
  color: ${(props) => props.theme.colors.white};
`;

export const Select = styled.select<ActiveSelect>`
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.active ? props.theme.colors.success : props.theme.colors.primary};
  cursor: pointer;
  transition: background-color 0.3s, border 0.3s;
  border-radius: 6px;
`;

export const Option = styled.option`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
`;
