import api from '../../../utils/api';
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect, useMemo } from 'react';
import type { Biblio } from '../../../model/Biblio/Biblio/SearchBiblioResponse';
import { useHandleSearch } from '../../../hooks/useHandleSearch';
import { GiHamburgerMenu } from "react-icons/gi";
import { useMenu } from '../../../hooks/useOpenMenu';

import {
  Container,
  MenuIcon,
  Notifications
} from './styles';
import SearchInput from '../Forms/SearchInput';

const Header: React.FC = () => {
  const { open } = useMenu();
  const { changeOpen, isOpen, searchText, changeSearchText, method, setMethod } = useHandleSearch();

  const [books, setBooks] = useState<Biblio[]>([]);
  const token = localStorage.getItem("@library_management:token") || ""

  useMemo(() => {
    changeOpen(searchText);
  }, [searchText]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeSearchText(e.target.value);
  };

  useEffect(() => {
    api.get(`/biblio/search?method=${method}&data=${searchText}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        setBooks(response.data.biblios);
      })
      .catch((err) => {
        console.error(err)
      })
  }, [searchText, method]);

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
        method={method}
        onChangeMethod={setMethod}
      />
      <Notifications/>
    </Container>
  );
};

export default Header;
