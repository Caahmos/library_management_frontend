import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  color: ${(props) => props.theme.colors.white};
`;

export const BookSection = styled.div`
  justify-self: center;
  max-width: 70%;
  padding: 20px 0 20px 0;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 800px) {
    padding: 20px;
    max-width: 100%;
  }
`;

export const BookImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 300px;
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
  
`;

export const TextContainer = styled.div`
  padding: 20px;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 800px) {
    padding: 0px;
  }
`;

export const BookTitle = styled.div`
  font-size: 1.5rem;
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

export const Content = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font-size: 2rem;
`;

export const CopyList = styled.ul`
margin: 20px 0 20px 0;

`

export const CopyItem = styled.li`
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 20px;
  list-style: none;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
`

export const CopyTitle = styled.div`
  display: flex;
`

export const CopyNumber = styled.div`
  
`

export const CopyDescription = styled.span`
  margin-left: 30px;
`

export const CopyStatus = styled.span`
`

export const CopyButtons = styled.div`

`

export const AdminButton = styled(Link)`
  width: fit-content;
  margin-top: 30px;
  padding: 15px;
  border: 1px solid ${props => props.theme.colors.success};
  display: flex;
  align-items: center;
  gap: 7px;
  color: white;
  text-decoration: none;
  border-radius: 7px;

  &:hover{
    transition: 0.4s ease;
    background-color: ${props => props.theme.colors.success + '55'};
  }
`

export const EditIcon = styled(MdEdit)`
  color: ${props => props.theme.colors.success}
`
