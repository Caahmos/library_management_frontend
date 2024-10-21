import React, { createContext, useState, useContext, useEffect } from "react";
import { LoginStaffRequest } from "../model/Staff/LoginStaffRequest";
import axios, { AxiosError } from "axios";
import api from "../utils/api";
import useFlashMessage from "./useFlashMessages";

interface IAuthContext {
    logged: boolean;
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
        setLogged(false);
        let msgText = 'Saiu com sucesso!';
        let msgType = 'success';
        setFlashMessage(msgText, msgType);
    };

    const authUser = (data: any) => {
        if (data.token) {
            console.log(data);
            localStorage.setItem('@library_management:token', JSON.stringify(data.token));
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            setLogged(true);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('@library_management:token');
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setLogged(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ logged, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export { AuthProvider, useAuth };