import styled from 'styled-components';

interface RowProps {
  columns: number;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.success};
  color: ${(props) => props.theme.colors.white};

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

export const Row = styled.div<RowProps>`
  width: ${({ columns }) => `calc(100% / ${columns})`};
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.success};
`;
