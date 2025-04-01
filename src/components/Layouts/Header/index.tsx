import api from '../../../utils/api';
import { useAuth } from '../../../hooks/useAuth';
import { IoLogOutOutline } from "react-icons/io5";
import { useTheme } from '../../../hooks/useTheme';
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect, useMemo } from 'react';
import { Biblio } from '../../../model/Biblio/Biblio/SearchBiblioResponse';
import { useHandleSearch } from '../../../hooks/useHandleSearch';

import {
  Container,
  Profile,
  User,
  Button,
  Theme
} from './styles';
import ThemeChanger from '../ThemeChanger';
import SearchInput from '../Forms/SearchInput';

const Header: React.FC = () => {
  const {changeOpen, isOpen, searchText, changeSearchText} = useHandleSearch();

  const { signOut, userData } = useAuth();
  const { theme, changeTheme } = useTheme();
  const [books, setBooks] = useState<Biblio[]>([]);
  const [selectTheme, setSelectTheme] = useState(theme.title === 'dark');
  const [token, setToken] = useState(
    localStorage.getItem("@library_management:token") || ""
  );

  const handleIsOpen = useMemo(() => {
    changeOpen(searchText);
  }, [searchText]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSearchText(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    api.get(`/biblio/search?method=title&data=${searchText}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        setBooks(response.data.biblios);
        console.log(response.data.biblios);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [searchText]);

  return (
    <Container>
      <SearchInput
        icon={<IoIosSearch />}
        placeholder='Pesquise por algum livro'
        onChange={handleOnChange}
        value={searchText}
        isOpen={isOpen || false}
        searchResults={books}
      />
      <Profile>
        <Theme onClick={changeTheme}>
          <ThemeChanger theme={selectTheme} />
        </Theme>
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
    </Container>
  );
};

export default Header;
