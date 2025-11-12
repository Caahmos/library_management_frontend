import React, { useState } from "react";
import {
    Container,
    Title,
    Button
} from "./styles";
import InputForm from "../../Input";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import type { LoginStaffRequest } from "../../../../../model/Staff/LoginStaffRequest";

interface ILoginForm {
    button_text: string;
    handleSubmit(data: LoginStaffRequest): void;
}

const LoginForm: React.FC<ILoginForm> = ({ handleSubmit, button_text }) => {
    const [loginData, setLoginData] = useState<LoginStaffRequest>({
        username: "aluno",
        password: "!123456a"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(loginData);
    }

    return (
        <Container onSubmit={handleOnSubmit}>
            <Title>
                Para acessar o <b>Lybup, realize o login abaixo</b>
            </Title>
            <InputForm
                label="Nome de usuário"
                name="username"
                id="username"
                placeholder="Seu nome de usuário!"
                onChange={handleChange}
                value={loginData.username}
                icon={<FaUser />}
            />
            <InputForm
                label="Senha"
                name="password"
                id="password"
                placeholder="Sua senha!"
                type="password"
                onChange={handleChange}
                value={loginData.password}
                icon={<RiLockPasswordFill />}
            />
            <Button>{button_text}</Button>
        </Container>
    );
}

export default LoginForm;
