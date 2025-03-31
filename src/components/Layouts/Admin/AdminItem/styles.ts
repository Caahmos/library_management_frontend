import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.white};
    padding: 20px;
    margin-bottom: 20px;

    @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`
export const FirstName = styled.div`
    width: 20%;

    @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const LastName = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const Username = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const Circ = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const UpdMember = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const Catalog = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const Admin = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const Suspended = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const Functions = styled.div`
    width: 10%;

    @media screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 10px;
  }
`
