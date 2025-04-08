import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

export const Text = styled.div``;

export const Select = styled.select`
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  `;

export const Option = styled.option`
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.primary};
    
    `

