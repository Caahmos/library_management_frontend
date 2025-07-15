import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";

export const Header = styled.div`
  width: 100%;
  margin: 20px 0 20px 0;
  padding: 0 20px 0 20px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.white};
`;

export const BookContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const BookSection = styled.div`
  justify-self: center;
  max-width: 1000px;
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const EditIcon = styled(MdEdit)`
  color: ${(props) => props.theme.colors.success};
  margin-right: 7px;
`;

export const BookImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  > img {
    width: 300px;
  }
`;

export const UpdateImage = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  /* border: 1px solid ${(props) => props.theme.colors.white}; */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
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

export const Overlay = styled(Link)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000055;
  transition: 0.4s all ease-in;

  ${EditIcon} {
    transition: 0.4s all ease-in;
    color: ${(props) => props.theme.colors.white};
  }

  &:hover {
    cursor: pointer;
    background-color: #000000d9;

    /* box-shadow: 3px 1px 31px 5px ${(props) =>
      props.theme.colors.success + "22"};
    -webkit-box-shadow: 3px 1px 31px 5px ${(props) =>
      props.theme.colors.success + "22"};
    -moz-box-shadow: 3px 1px 31px 5px ${(props) =>
      props.theme.colors.success + "22"}; */

    ${EditIcon} {
      color: ${(props) => props.theme.colors.success};
    }
  }
`;

export const BookInfo = styled.div`
  width: 60%;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;

  > img {
    width: 200px;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const TextContainer = styled.div`
  padding: 20px;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 800px) {
    width: 100%;
    padding: 0px;
  }
`;

export const BookTitle = styled.div`
  font-size: 2rem;
`;

export const Author = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.gray};
`;

export const Rating = styled.div`
  font-size: 0.8rem;
`;

export const Description = styled.div`
  font-size: 0.9rem;
`;

export const DateBook = styled.div`
  > svg {
    color: ${(props) => props.theme.colors.success};
  }
`;

export const BookContent = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font-size: 2rem;
`;

export const CopyList = styled.ul`
  margin: 15px 0 20px 0;
`;

export const CopyItem = styled.li`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 20px;
  list-style: none;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
`;

export const FormContainer = styled.form`
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  flex-wrap: wrap;
  padding: 20px;
  list-style: none;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
`;

export const FormItem = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const FormGroup = styled.div`
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const CopyTitle = styled.div`
  display: flex;
`;

export const CopyNumber = styled.div``;

export const CopyDescription = styled.span`
  margin-left: 30px;
`;

export const CopyStatus = styled.span``;

export const CopyButtons = styled.div``;

export const AdminButton = styled(Link)`
  width: 100%;
  margin-top: 30px;
  padding: 15px;
  color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.success};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  border-radius: 7px;

  &:hover {
    transition: 0.4s ease;
    background-color: ${(props) => props.theme.colors.success + "55"};
  }
`;

export const DeleteContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const DeleteInput = styled.input`
  width: 450px;
  padding: 20px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 7px;
  transition: border 0.3s ease;

  &:hover,
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.warning};
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const DeleteButton = styled.button`
  width: 100%;
  padding: 20px;
  color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.warning};
  background-color: ${(props) => props.theme.colors.warning};
  display: flex;
  align-items: center;
  font-size: 1rem;
  justify-content: center;
  text-decoration: none;
  border-radius: 7px;
  transition: 0.4s ease;
  
  &:hover {
    color: ${(props) => props.theme.colors.warning};
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export const Content = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const InfoItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
`;

export const Tag = styled.div``;

export const Data = styled.div``;

export const Button = styled(Link)`
  display: inline-block;
  padding: 18px;
  background-color: ${(props) => props.theme.colors.success};
  color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  &:hover {
    opacity: 0.9;
    transition: ease 0.4s all;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const Functions = styled.div`
  display: flex;
  justify-content: end;

  @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`;

export const LinkIcon = styled.div`
  text-decoration: none;
  color: ${(props) => props.theme.colors.success};
  font-size: 20px;
  margin-right: 8px;
  transition: 0.3s all ease-in;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
