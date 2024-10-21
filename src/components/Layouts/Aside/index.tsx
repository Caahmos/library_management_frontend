import React, { useState } from 'react';
// import { useTheme } from '../../../hooks/useTheme';

import { IoBook, IoSettingsSharp } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { MdAdminPanelSettings } from "react-icons/md";

import {
  Container,
  MenuContainer,
  MenuItem,
} from './styles'

// import ThemeChanger from '../ThemeChanger';

const Aside: React.FC = () => {
  // const { theme, changeTheme } = useTheme();
  // const [selectTheme, setselectTheme] = useState(() => theme.title === 'dark' ? true : false);

  return (
    <Container>
      <div>
        <MenuContainer>
          <MenuItem to="/">
            <BiSolidDashboard />
            <p>Início</p>
          </MenuItem>
          <MenuItem to="/circulation">
            <FaCartShopping />
            <p>Circulação</p>
          </MenuItem>
          <MenuItem to="/catalog">
            <IoBook />
            <p>Catálogo</p>
          </MenuItem>
          <MenuItem to="/admin">
            <MdAdminPanelSettings />
            <p>Admin</p>
          </MenuItem>

        </MenuContainer>
      </div>
      {/* <Theme onClick={changeTheme}>
        <ThemeChanger theme={selectTheme} />
      </Theme> */}
    </Container>
  );
}

export default Aside;