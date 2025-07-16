import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiFingerprint2Fill } from "react-icons/ri";

export const Container = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  /* border-bottom: 1px solid ${(props) => props.theme.colors.white}; */
  padding: 15px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Content = styled.div`
  display: flex;
`;

export const Count = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.div<{ image: string | undefined }>`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-color: ${(props) => props.theme.colors.primary};
  `;

export const Title = styled.div``;

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
