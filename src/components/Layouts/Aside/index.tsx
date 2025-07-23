import React, { useState, useRef, useEffect } from 'react';
import {
  IoBook, IoLogOutOutline, IoClose
} from "react-icons/io5";
import { FaBookOpenReader } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import MotionAccordion from '../MotionAccordion';

import { useTheme } from '../../../hooks/useTheme';
import { useAuth } from '../../../hooks/useAuth';
import { useMenu } from '../../../hooks/useOpenMenu';

import {
  Container,
  MenuContainer,
  MenuItem,
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
  CloseMenuButton
} from './styles';

import ThemeChanger from '../ThemeChanger';
import Logo from '../../../assets/logo/Logo';

const Aside: React.FC = () => {
  const { isOpenMenu, open } = useMenu();
  const { signOut, userData } = useAuth();
  const { theme, changeTheme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const selectTheme = theme.title === 'dark';
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
    <Container $isopen={isOpenMenu} ref={menuRef}>
      <MenuBox>
        <Brand>
          <Logo/>
          <CloseMenuButton onClick={open}>
            <IoClose />
          </CloseMenuButton>
        </Brand>

        <MenuContainer>
          <TitleContainer>Menus</TitleContainer>

          <li>
            <MenuItem to='/' onClick={() => handleToggle(99)}>
              <CircleIcon>
                <BiSolidDashboard />
              </CircleIcon>
              <p>Início</p>
            </MenuItem>
          </li>

          {userData?.circ_flg && (
            <li>
              <MenuItem to='/circulation' onClick={() => handleToggle(0)}>
                <CircleIcon>
                  <FaBookOpenReader />
                </CircleIcon>
                <p>Circulação</p>
              </MenuItem>
              <MotionAccordion isOpen={openIndex === 0}>
                <ul>
                  <li><LinkItem to='/circulation/checkin'>Check-in</LinkItem></li>
                  <li><LinkItem to='/member/findmember'>Buscar Membro</LinkItem></li>
                  <li><LinkItem to='/member/register'>Adicionar Membro</LinkItem></li>
                  <li><LinkItem to='/member/blocked'>Membros Bloqueados</LinkItem></li>
                </ul>
              </MotionAccordion>
            </li>
          )}

          {userData?.catalog_flg
            ? (
              <li>
                <MenuItem to='/catalog' onClick={() => handleToggle(1)}>
                  <CircleIcon>
                    <IoBook />
                  </CircleIcon>
                  <p>Catálogo</p>
                </MenuItem>
                <MotionAccordion isOpen={openIndex === 1}>
                  <ul>
                    <li><LinkItem to='/catalog/createbook'>Registrar Livro</LinkItem></li>
                  </ul>
                </MotionAccordion>
              </li>
            )
            : <MenuItem to='/catalog' onClick={() => handleToggle(1)}>
              <CircleIcon>
                <IoBook />
              </CircleIcon>
              <p>Catálogo</p>
            </MenuItem>
          }

          {userData?.admin_flg && (
            <li>
              <MenuItem to='/admin' onClick={() => handleToggle(2)}>
                <CircleIcon>
                  <MdAdminPanelSettings />
                </CircleIcon>
                <p>Admin</p>
              </MenuItem>
              <MotionAccordion isOpen={openIndex === 2}>
                <ul>
                  <li><LinkItem to='/admin/adminlist'>Lista de Admins</LinkItem></li>
                  <li><LinkItem to='/mbrclassify'>Tipos de Usuários</LinkItem></li>
                  <li><LinkItem to='/material'>Tipos de Materiais</LinkItem></li>
                  <li><LinkItem to='/collection'>Tipos de Categorias</LinkItem></li>
                  <li><LinkItem to='/mbrfield'>Campos de Usuários</LinkItem></li>
                </ul>
              </MotionAccordion>
            </li>
          )}
        </MenuContainer>

        <MenuContainer>
          <TitleContainer>Configurações</TitleContainer>
          <li>
            <ListItem onClick={changeTheme}>
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
            <span>{userData?.first_name || 'Usuário'}</span>
          </User>
          <Button onClick={signOut}>
            <IoLogOutOutline />
            <span>Sair</span>
          </Button>
        </Profile>
      </UserBox>
    </Container>
  );
};

export default React.memo(Aside);
