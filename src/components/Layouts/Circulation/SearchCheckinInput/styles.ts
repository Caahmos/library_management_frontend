import { RiFingerprint2Fill } from "react-icons/ri";
import styled from "styled-components";

interface DropdownProps {
  $isopen: boolean;
}

export const CloseButton = styled.div`
  background-color: transparent;
  color: ${(props) => props.theme.colors.white};
  margin-right: 12px;
  font-size: 18px;
  cursor: pointer;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const InputContainer = styled.form`
  position: relative;
  display: flex;
  gap: 10px;
  width: 100%;
  margin: 0 10px;

  @media (max-width: 1000px) {
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Button = styled.button`
  width: 50%;
  padding: 12px;
  background-color: ${(props) => props.theme.colors.success};
  color: #fff;
  border-radius: 5px;

  &:hover {
    opacity: 0.9;
    transition: ease 0.4s all;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const StyledInputContainer = styled.div`
  display: flex;
  border-radius: 8px;
  align-items: center;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.success};
  width: 100%;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  color: ${(props) => props.theme.colors.success};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.success};
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const Dropdown = styled.div<DropdownProps>`
  display: ${(props) => (props.$isopen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 400px;
  overflow-y: scroll;
  background: ${(props) => props.theme.colors.primary};
  padding: 20px;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 26px rgba(0, 0, 0, 0.4);
  z-index: 100;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.tertiary};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.success || "#00a293"};
  }
`;

export const SelectMethod = styled.select`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  outline: none;
  margin-right: 8px;
  font-size: 14px;
  cursor: pointer;

  option {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ResultsContainer = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 7px;
`;

export const BookSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const BookImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  gap: 10px;

  > img {
    width: 300px;
  }
`;

export const Image = styled.div<{ image: string }>`
  width: 320px;
  height: 480px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-color: #000;
`;

export const BookInfo = styled.div`
  width: 60%;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.secondary};
  height: fit-content;

  > img {
    width: 200px;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const Author = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.gray};
`;

export const DateBook = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  > svg {
    color: ${(props) => props.theme.colors.success};
  }
`;

export const InfoItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const TextContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 800px) {
    width: 100%;
    padding: 0px;
  }
`;

export const BookTitle = styled.div`
  font-size: 1.5rem;
`;

export const FingerprintIcon = styled(RiFingerprint2Fill)`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.success};

`

export const ObservationContent = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`
export const Title = styled.div`
  font-size: 1.5rem;
`

export const ObservationTitle = styled.div`
  
`

export const ObservationText = styled.textarea`
  font-size: 1.1rem;
  min-height: 200px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 7px;
  padding: 10px;
`

export const ButtonCheckin = styled.button`
  width: 100%;
  padding: 18px;
  background-color: ${(props) => props.theme.colors.success};
  color: #fff;
  border-radius: 5px;

  &:hover {
    opacity: 0.9;
    transition: ease 0.4s all;
  }
`;