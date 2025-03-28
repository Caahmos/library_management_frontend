import styled from "styled-components"

export const ArrowBack = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.4s all ease;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};

  &:hover{
    color: ${(props) => props.theme.colors.success};
  }
`