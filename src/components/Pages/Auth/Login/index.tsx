import React from "react";
import LoginForm from "../../../Layouts/Forms/Auth/LoginForm";
import { Container } from './styles';
import type { LoginStaffRequest } from "../../../../model/Staff/LoginStaffRequest";
import { useAuth } from "../../../../hooks/useAuth";

const Login: React.FC = () => {
    const {signIn} = useAuth();

    const loginStaff = (data: LoginStaffRequest) => {
        signIn(data);
    };

    return (
        <Container>
            <LoginForm handleSubmit={loginStaff} button_text="Entrar"/>
        </Container>
    );
}

export default Login;
