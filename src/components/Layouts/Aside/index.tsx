import React, { useState, useRef, useEffect } from 'react';
import { IoBook, IoSettingsSharp, IoLogOutOutline, IoClose } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../hooks/useAuth';
import { useMenu } from '../../../hooks/useOpenMenu';

import {
  Container,
  MenuContainer,
  MenuItem,
  AccordionContent,
  TitleContainer,
  CircleIcon,
  Brand,
  LinkItem,
  ListItem,
  MenuBox,
  UserBox,
  Profile,
  User,
  Button,
  Logo,
  CloseMenuButton
} from './styles'

import ThemeChanger from '../ThemeChanger';

const Aside: React.FC = () => {
  const { isOpenMenu, open } = useMenu();
  const { signOut, userData } = useAuth();
  const { theme, changeTheme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectTheme, setSelectTheme] = useState(theme.title === 'dark');

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        open(); 
      }
    }

    if (isOpenMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu, open]);

  return (
    <Container isOpen={isOpenMenu} ref={menuRef}>
      <MenuBox>
        <Brand>
          <Logo><ImBooks/> Library</Logo>
          <CloseMenuButton onClick={open}>
            <IoClose />
          </CloseMenuButton>
        </Brand>
        <MenuContainer>
          <TitleContainer>Menus</TitleContainer>
          <li>
            <MenuItem to='/' onClick={() => handleToggle(3)}>
              <CircleIcon>
                <BiSolidDashboard />
              </CircleIcon>
              <p>Início</p>
            </MenuItem>
          </li>

          <li>
            <MenuItem to='/circulation' onClick={() => handleToggle(0)}>
              <CircleIcon>
                <FaCartShopping />
              </CircleIcon>
              <p>Circulação</p>
            </MenuItem>
            <AccordionContent isOpen={openIndex === 0}>
              <ul>
                <li>Subitem 1</li>
                <li>Subitem 2</li>
              </ul>
            </AccordionContent>
          </li>

          <li>
            <MenuItem to='/catalog' onClick={() => handleToggle(1)}>
              <CircleIcon>
                <IoBook />
              </CircleIcon>
              <p>Catálogo</p>
            </MenuItem>
            <AccordionContent isOpen={openIndex === 1}>
              <ul>
                <li>Subitem 1</li>
                <li>Subitem 2</li>
              </ul>
            </AccordionContent>
          </li>

          <li>
            <MenuItem to='/admin' onClick={() => handleToggle(2)}>
              <CircleIcon>
                <MdAdminPanelSettings />
              </CircleIcon>
              <p>Admin</p>
            </MenuItem>
            <AccordionContent isOpen={openIndex === 2}>
              <ul>
                <li><LinkItem to={'/admin/adminlist'}>Lista de Admins</LinkItem></li>
                <li>Tipos de Usuários</li>
                <li>Tipos de Materiais</li>
                <li>Tipos de Categorias</li>
              </ul>
            </AccordionContent>
          </li>
        </MenuContainer>
        <MenuContainer>
          <TitleContainer>Configurações</TitleContainer>
          <li>
            <ListItem onClick={() => changeTheme()}>
              <CircleIcon>
                <ThemeChanger theme={selectTheme} />
              </CircleIcon>
              <p>Alterar o tema</p>
            </ListItem>
          </li>
        </MenuContainer>
      </MenuBox>
      <UserBox>
        <Profile>
          <User>
            <p>Bem-vindo(a)</p>
            <span>
              {userData?.first_name || 'Carlos'}
            </span>
          </User>
          <Button onClick={signOut}>
            <IoLogOutOutline />
            <span>Sair</span>
          </Button>
        </Profile>
      </UserBox>
    </Container>
  );
}

export default Aside;
