import React, { useState } from 'react';
import { IoBook, IoSettingsSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";

import {
  Container,
  MenuContainer,
  MenuItem,
  AccordionContent,
  TitleContainer,
  CircleIcon,
  Brand
} from './styles'

const Aside: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <Brand>Library</Brand>
      <MenuContainer>
        <TitleContainer>Menus</TitleContainer>
        <li>
          <MenuItem to='/' onClick={() => handleToggle(0)}>
            <CircleIcon>
              <BiSolidDashboard />
            </CircleIcon>
            <p>Início</p>
          </MenuItem>
          <AccordionContent isOpen={openIndex === 0}>
            <ul>
              <li>Subitem 1</li>
              <li>Subitem 2</li>
            </ul>
          </AccordionContent>
        </li>

        <li>
          <MenuItem to='/circulation' onClick={() => handleToggle(1)}>
            <CircleIcon>
              <FaCartShopping />
            </CircleIcon>
            <p>Circulação</p>
          </MenuItem>
          <AccordionContent isOpen={openIndex === 1}>
            <ul>
              <li>Subitem 1</li>
              <li>Subitem 2</li>
            </ul>
          </AccordionContent>
        </li>

        <li>
          <MenuItem to='/catalog' onClick={() => handleToggle(2)}>
            <CircleIcon>
              <IoBook />
            </CircleIcon>
            <p>Catálogo</p>
          </MenuItem>
          <AccordionContent isOpen={openIndex === 2}>
            <ul>
              <li>Subitem 1</li>
              <li>Subitem 2</li>
            </ul>
          </AccordionContent>
        </li>

        <li>
          <MenuItem to='/admin' onClick={() => handleToggle(3)}>
            <CircleIcon>
              <MdAdminPanelSettings />
            </CircleIcon>
            <p>Admin</p>
          </MenuItem>
          <AccordionContent isOpen={openIndex === 3}>
            <ul>
              <li>Subitem 1</li>
              <li>Subitem 2</li>
            </ul>
          </AccordionContent>
        </li>
      </MenuContainer>
    </Container>
  );
}

export default Aside;
