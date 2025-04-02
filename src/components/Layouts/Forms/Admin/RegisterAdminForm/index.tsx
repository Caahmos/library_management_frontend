import React from "react";
import {
    Container,
    Title
} from './styles';
import InputForm from '../../Input/index';

const RegisterAdminForm: React.FC = () => {
   
    return (
        <Container>
            <Title>Cadastrar Administrador</Title>
            <InputForm label="Nome" placeholder="Digite o nome" />
            <InputForm label="Sobrenome" placeholder="Digite o sobrenome" />
            <InputForm label="Nome de Usuário" placeholder="Digite o nome de usuário" />
            <InputForm label="Senha" placeholder="Digite a senha" />
            <InputForm label="Confirmar Senha" placeholder="Repita a senha" />
        </Container>
    )
};

export default RegisterAdminForm;