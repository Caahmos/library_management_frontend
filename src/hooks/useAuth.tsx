import React, { createContext, useState, useContext, useEffect } from "react";
import type { LoginStaffRequest } from "../model/Staff/LoginStaffRequest";
import type { LoginStaffResponse } from "../model/Staff/LoginStaffResponse";
import { AxiosError } from "axios";
import api from "../utils/api";
import useFlashMessage from "./useFlashMessages";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
  logged: boolean;
  userData: LoginStaffResponse | null;
  signIn(user: LoginStaffRequest): void;
  signOut(): void;
}

const AuthContext = createContext({} as IAuthContext);

interface IAuthProviderProps {
  children: React.ReactNode;
}

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch (e) {
    return true;
  }
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const [logged, setLogged] = useState<boolean>(() => {
    const token = localStorage.getItem('@library_management:token');
    if (token) {
      const parsed = JSON.parse(token);
      return !isTokenExpired(parsed);
    }
    return false;
  });

  const [userData, setUserData] = useState<LoginStaffResponse | null>(() => {
    const user = localStorage.getItem('@library_management:user');
    const token = localStorage.getItem('@library_management:token');
    if (user && token && !isTokenExpired(JSON.parse(token))) {
      return JSON.parse(user);
    }
    return null;
  });

  const signIn = async (staffData: LoginStaffRequest) => {
    let msgText = '';
    let msgType = '';

    try {
      const response = await api.post('/staff/login', staffData);
      const data = response.data;
      authUser(data.staffLogged);
      msgText = data.message;
      msgType = 'success';
    } catch (error) {
      const err = error as AxiosError;
      console.error(err);
      msgText = err.response?.data
        ? (err.response.data as { message: string }).message
        : 'Erro desconhecido';
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  };

  const signOut = () => {
    localStorage.removeItem('@library_management:token');
    localStorage.removeItem('@library_management:user');
    setLogged(false);
    setUserData(null);
    setFlashMessage('Saiu com sucesso!', 'success');
    navigate('/');
  };

  const authUser = (data: LoginStaffResponse) => {
    if (data.token) {
      localStorage.setItem('@library_management:token', JSON.stringify(data.token));
      localStorage.setItem('@library_management:user', JSON.stringify(data));
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setLogged(true);
      setUserData(data);
    }
  };

  useEffect(() => {
    const tokenRaw = localStorage.getItem('@library_management:token');
    const userRaw = localStorage.getItem('@library_management:user');

    if (tokenRaw && userRaw) {
      const token = JSON.parse(tokenRaw);

      if (isTokenExpired(token)) {
        signOut();
      } else {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setLogged(true);
        setUserData(JSON.parse(userRaw));
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ logged, userData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
