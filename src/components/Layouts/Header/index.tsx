import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useAuth } from '../../../hooks/useAuth';

import { IoLogOutOutline } from "react-icons/io5";

import {
  Container,
  Profile,
  User,
  Button
} from './styles'

interface IUser {
  nome: string;
  sobrenome: string;
}

const Header: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('@library_management:token') || '');
  const [user, setUser] = useState({} as IUser);

  const { signOut } = useAuth();

  useEffect(() => {
    api.get('/staff/about', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token) || null}`
      }
    })
      .then((response) => {
        setUser(response.data.user);
        console.log('User');
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <Container>
      <h2></h2>
      <Profile>
        <User>
          <p>Bem vindo(a)</p>
          <span>{user.nome + ' ' + user.sobrenome}</span>
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