import React, { createContext, useState, useContext, useEffect } from "react";
import { LoginStaffRequest } from "../model/Staff/LoginStaffRequest";
import axios, { AxiosError } from "axios";
import api from "../utils/api";
import useFlashMessage from "./useFlashMessages";
import { LoginStaffResponse } from "../model/Staff/LoginStaffResponse";

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

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const { setFlashMessage } = useFlashMessage();
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@library_management:token');

        if(isLogged){
            return true;
        }else{
            return false;
        };

    });
    const [userData, setuserData] = useState<LoginStaffResponse | null>(() => {
        const userExists = localStorage.getItem('@library_management:user');

        if(userExists){
            return JSON.parse(userExists)
        }else{
            return null
        }
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
            if (err.response && err.response.data) {
                msgText = (err.response.data as { message: string }).message;
            } else {
                msgText = 'Erro desconhecido';
            }
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    };

    const signOut = () => {
        localStorage.removeItem('@library_management:token');
        localStorage.removeItem('@library_management:user');
        setLogged(false);
        setuserData(null);
        let msgText = 'Saiu com sucesso!';
        let msgType = 'success';
        setFlashMessage(msgText, msgType);
    };

    const authUser = (data: LoginStaffResponse) => {
        if (data.token) {
            console.log(data);
            localStorage.setItem('@library_management:token', JSON.stringify(data.token));
            localStorage.setItem('@library_management:user', JSON.stringify(data));
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            setLogged(true);
            setuserData(data);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('@library_management:token');
        const data = localStorage.getItem('@library_management:user');
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setLogged(true);
        }
        if (data) {
            setuserData(JSON.parse(data));
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