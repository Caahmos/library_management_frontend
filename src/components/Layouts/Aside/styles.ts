import styled from "styled-components";
import { Link } from "react-router-dom";

interface MenuToggle {
  $isopen: boolean;
}

export const Container = styled.aside<MenuToggle>`
  grid-area: AS;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.primary};
  transition: width 0.3s;
  box-shadow: 18px 10px 44px 2px rgba(0,0,0,0.15);
  -webkit-box-shadow: 18px 10px 44px 2px rgba(0,0,0,0.15);
  -moz-box-shadow: 18px 10px 44px 2px rgba(0,0,0,0.15);
  z-index: 9999;

  @media (max-width: 1000px) {
    position: fixed;
    width: 0;
    left: 0;
    bottom: 0;

    width: 260px;

    display: ${(props) => (props.$isopen ? "inline-block" : "none")};
    height: ${(props) => (props.$isopen ? "100vh" : "none")};
    overflow: hidden;
  }
`;

export const Brand = styled.h2`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.success};
`;

export const Logo = styled.div`
  font-size: 26px;
`;

export const CloseMenuButton = styled.div`
  display: none;
  color: ${(props) => props.theme.colors.white};
  font-size: 25px;
  cursor: pointer;
  transition: 0.2s all ease-in;

  &:hover {
    display: block;
    color: ${(props) => props.theme.colors.success};
  }

  @media (max-width: 1000px) {
    display: block;
}
`;

export const MenuBox = styled.nav`
  width: 100%;
  height: 95%;
  overflow-y: auto;
`;

export const UserBox = styled.div`
  width: 100%;
  height: auto;
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};

  li {
    list-style: none;
    width: 100%;
  }
`;

export const TitleContainer = styled.p`
  color: ${(props) => props.theme.colors.gray};
`;

export const CircleIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 15px;
  font-size: 23px;
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  padding: 8px;
  cursor: pointer;

  svg {
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
  }

  &:hover {
    transition: ease 0.4s all;
    color: ${(props) => props.theme.colors.success};

    svg {
      color: ${(props) => props.theme.colors.black};
    }

    ${CircleIcon} {
      background-color: ${(props) => props.theme.colors.success};
    }
  }

  p {
    margin-left: 15px;
    font-size: 16px;
  }
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  font-size: 23px;
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  padding: 8px;
  cursor: pointer;

  svg {
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
  }

  &:hover {
    transition: ease 0.4s all;
    color: ${(props) => props.theme.colors.success};

    svg {
      color: ${(props) => props.theme.colors.black};
    }

    ${CircleIcon} {
      background-color: ${(props) => props.theme.colors.success};
    }
  }

  p {
    margin-left: 15px;
    font-size: 16px;
  }
`;

export const AccordionContent = styled.div<{ $isopen: boolean }>`
  overflow: hidden;
  max-height: ${({ $isopen }) => ($isopen ? "200px" : "0")};
  transition: max-height 0.4s ease-in-out;
  margin-left: 25px;
  color: ${(props) => props.theme.colors.white};

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 14px;
  }
`;

export const LinkItem = styled(Link)`
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;

  &:hover {
    transition: ease 0.4s all;
    color: ${(props) => props.theme.colors.success};
  }
`;

export const Profile = styled.div`
  color: ${(props) => props.theme.colors.white};
  display: flex;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
`;

export const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;

  > p {
    font-size: 0.7rem;
  }

  > span {
    color: ${(props) => props.theme.colors.success};
    font-weight: bold;
  }
`;
export const Button = styled.div`
  margin-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    font-size: 1.3rem;
    margin-right: 5px;
  }

  &:hover {
    transition: ease 0.4s all;
    color: ${(props) => props.theme.colors.success};
    cursor: pointer;

    svg {
      color: ${(props) => props.theme.colors.success};
    }
  }
`;
