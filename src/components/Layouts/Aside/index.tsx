import React, { useState, useRef, useEffect } from 'react';
import {
  IoBook, IoLogOutOutline, IoClose
} from "react-icons/io5";
import { FaBookOpenReader } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import MotionAccordion from '../MotionAccordion';
import { useMediaQuery } from 'react-responsive';

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
  const isMobile = useMediaQuery({ maxWidth: 1000 });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        open();
      }
    }

    if (isMobile && isOpenMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu, open, isMobile]);

  // Render sempre visível para desktop
  const renderAsideContent = (
    <Container
      ref={menuRef}
      $isopen={isMobile ? isOpenMenu : true} // true para desktop
      as={isMobile ? motion.aside : undefined}
      initial={isMobile ? { x: "-100%" } : undefined}
      animate={isMobile ? { x: 0 } : undefined}
      exit={isMobile ? { x: "-100%" } : undefined}
      transition={isMobile ? { duration: 0.3, ease: "easeInOut" } : undefined}
      style={{ position: !isMobile ? 'relative' : undefined }}
    >
      <MenuBox>
        <Brand>
          <Logo />
          {isMobile && (
            <CloseMenuButton onClick={open}>
              <IoClose />
            </CloseMenuButton>
          )}
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

  return (
    <>
      {isMobile && (
        <AnimatePresence>
          {isOpenMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 9998
              }}
              onClick={open}
            />
          )}
        </AnimatePresence>
      )}

      {isMobile ? (
        <AnimatePresence>{isOpenMenu && renderAsideContent}</AnimatePresence>
      ) : (
        renderAsideContent
      )}
    </>
  );
};

export default React.memo(Aside);
