import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiCalendarLine, RiFingerprint2Fill } from "react-icons/ri";

export const Container = styled.div<{ rankColor?: string }>`
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  max-width: 1000px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 7px;

  background: ${({ rankColor }) =>
    rankColor
      ? `linear-gradient(90deg, ${rankColor + '33'} 0%, rgba(0, 0, 0, 0) 70%)`
      : 'none'};
`;

export const Content = styled.div`
  display: flex;
  height: 100%;
`;

export const Count = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

export const Image = styled.div<{ image: string | undefined }>`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-color: ${(props) => props.theme.colors.secondary};
  `;

export const Title = styled.div`
  font-size: 1.3rem;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.success};
  `;

export const FingerprintIcon = styled(RiFingerprint2Fill)`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.success};

`

export const CalendarIcon = styled(RiCalendarLine)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
`;

export const Points = styled.p`
  font-size: 1rem;
  font-weight: bold;
`
