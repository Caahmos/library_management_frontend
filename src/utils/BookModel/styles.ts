import styled from 'styled-components';
import BookModel from './BookModel';
import type { BookModelProps } from './BookModel';

export const StyledBookModel = styled(BookModel)<BookModelProps>`
  path.fil0 {
    fill: ${props => props.fillColor || props.theme.colors.white};
  }
`;

export const RankWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
`;

export const RankNumber = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;