import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    padding: 20px;
    margin-bottom: 20px;
    `

export const Content = styled.div`
  width: 100%;
  display: flex;
  
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  `
export const HiddenHeaders = styled.div`
  display: none;
  width: 50%;
  color: ${props => props.theme.colors.success};
  border-right: 1px solid ${props => props.theme.colors.success};

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`

export const FirstName = styled.div`
    width: 20%;

    @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`

export const LastName = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`

export const Username = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`

export const Circ = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`

export const UpdMember = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`

export const Catalog = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`

export const Admin = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`

export const Suspended = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`

export const Functions = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 50%;
    height: 20%;
  }
`

export const LinkIcon = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.success};
  font-size: 20px;
  margin-right: 8px;
  transition: 0.3s all ease-in;
  
  &:hover{
    opacity: 0.7;
  }
`
