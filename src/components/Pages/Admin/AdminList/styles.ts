import styled from "styled-components";
import { LiaUserEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const List = styled.div`
  width: 90%;
  padding: 20px;
  align-self: center;
`;

export const NewAdmin = styled(Link)`
  display: flex;
  align-items: center;
  color: ${ props => props.theme.colors.white};
  text-decoration: none;
  transition: 0.1s all ease-in;
  margin-bottom: 20px;
  
  &:hover{
    color: ${ props => props.theme.colors.success};
  }
  `
  
  export const NewAdminIcon = styled(LiaUserEditSolid)`
  font-size: 25px;
  margin-right: 10px;
  color: ${ props => props.theme.colors.success};
`
export const AdminHeaders = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.success};
    padding: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.success};

    @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const FirstName = styled.div`
    width: 20%;
    
`

export const LastName = styled.div`
    width: 10%;
`

export const Username = styled.div`
    width: 10%;
`

export const Circ = styled.div`
    width: 10%;
`

export const UpdMember = styled.div`
    width: 10%;
`

export const Catalog = styled.div`
    width: 10%;
`

export const Admin = styled.div`
    width: 10%;
`

export const Suspended = styled.div`
    width: 10%;
`

export const Functions = styled.div`
    width: 10%;
`