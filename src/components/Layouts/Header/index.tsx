import api from '../../../utils/api';
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect, useMemo } from 'react';
import { Biblio } from '../../../model/Biblio/Biblio/SearchBiblioResponse';
import { useHandleSearch } from '../../../hooks/useHandleSearch';
import { GiHamburgerMenu } from "react-icons/gi";
import { useMenu } from '../../../hooks/useOpenMenu';

import {
  Container,
  MenuIcon
} from './styles';
import SearchInput from '../Forms/SearchInput';

const Header: React.FC = () => {
  const {isOpenMenu, open} = useMenu();
  const { changeOpen, isOpen, searchText, changeSearchText } = useHandleSearch();

  const [books, setBooks] = useState<Biblio[]>([]);
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
      <MenuIcon onClick={() => { open() }}>
        <GiHamburgerMenu />
      </MenuIcon>
      <SearchInput
        icon={<IoIosSearch />}
        placeholder='Pesquise por algum livro'
        onChange={handleOnChange}
        value={searchText}
        isOpen={isOpen || false}
        searchResults={books}
      />
    </Container>
  );
};

export default Header;
