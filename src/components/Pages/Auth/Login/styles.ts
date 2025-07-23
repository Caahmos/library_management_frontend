import { FaGithub } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.success};
`;

export const Left = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const Right = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  padding: 20px;
  overflow: hidden;

  @media screen and (max-width: 1000px) {
    border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  }
`;

export const FooterContainer = styled.footer`
    width: 80%;
    color: ${ props => props.theme.colors.white };
    display: flex;
    justify-content: center;
    flex-direction: column;
    z-index: 1;
    `;

export const Content = styled.div`
    align-self: self-end;
    flex-wrap: wrap;
    width: 100%;
    flex-grow: 1;
    padding: 70px;
    text-align: center;
    background-color: ${ props => props.theme.colors.secondary };
    display: flex;
    justify-content: space-between;
`

export const Sign = styled.div`
    flex-wrap: wrap;
    width: 100%;
    padding: 20px 40px;
    background-color: ${(props) => props.theme.colors.secondary};
    display: flex;
    border-radius: 70px;
    justify-content: space-between;
`

export const GithubIcon = styled(FaGithub)`
    font-size: 1rem;
    color: ${ props => props.theme.colors.success };
    `
export const Copyright = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`

export const AppAuthor = styled.a`
    display: flex;
    color: ${ props => props.theme.colors.white };
    align-items: center;
    text-decoration: none;
    gap: 5px;
    transition: 0.4s all ease;
    
    &:hover{
        color: ${ props => props.theme.colors.success };
    }
`
