import { useAuth } from '../../../hooks/useAuth';
import { IoLogOutOutline } from "react-icons/io5";
import { useTheme } from '../../../hooks/useTheme';
import { IoIosSearch } from "react-icons/io";
import { useState } from 'react';

import {
  Container,
  Profile,
  User,
  Button,
  Theme
} from './styles'
import ThemeChanger from '../ThemeChanger';
import InputForm from '../Forms/Input';
import SearchInput from '../Forms/SearchInput';

const Header: React.FC = () => {
  const { signOut, userData } = useAuth();
  const { theme, changeTheme } = useTheme();
  const [selectTheme, setselectTheme] = useState(() => theme.title === 'dark' ? true : false);

  return (
    <Container>
      <SearchInput icon={<IoIosSearch/>} placeholder='Pesquise por algum livro'/>
      <Profile>
        <Theme onClick={changeTheme}>
          <ThemeChanger theme={selectTheme} />
        </Theme>
        <User>
          <p>Bem vindo(a)</p>
          <span>
            {
              userData
                ? userData.first_name
                : <p>Carlos</p>
            }
          </span>
        </User>
        <Button onClick={signOut}>
          <IoLogOutOutline />
          <span>Sair</span>
        </Button>
      </Profile>
    </Container>
  );
}

export default Header;