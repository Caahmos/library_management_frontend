import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiCalendarLine, RiFingerprint2Fill } from "react-icons/ri";

export const Container = styled.div`
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: fit-content;
  max-width: 1000px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
  gap: 20px;
`;

export const RanksContainer = styled.div`
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: fit-content;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  gap: 20px;
`;

export const MemberContainer = styled.div<{$order: number}>`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  order: ${props => props.$order};
  transform: ${props => props.$order === 2 ? "translateY(-50px)" : "none"};
`;

export const MemberContent = styled.div<{ $img: string | undefined }>`
  width: 100%;
  height: 60%;
  background-image: ${(props) =>
    props.$img ? `url(${props.$img})` : undefined};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 0;
  position: relative;
`;

export const MemberText = styled.p`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
`;

export const MemberImage = styled.div<{ $img: string | undefined }>`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-image: ${(props) =>
    props.$img ? `url(${props.$img})` : undefined};
  background-size: cover;
  background-color: ${ props => props.theme.colors.secondary};
  position: absolute;
  right: 15px;
  `;

export const RankText = styled.p`
  font-size: 0.8rem;
  color: ${ props => props.theme.colors.success};
`;

export const InfoRank = styled.p`
  text-align: center;
`;
