import React from "react";
import LoginForm from "../../../Layouts/Forms/Auth/LoginForm";
import { Container, Left, Right } from './styles';
import type { LoginStaffRequest } from "../../../../model/Staff/LoginStaffRequest";
import { useAuth } from "../../../../hooks/useAuth";
import OutlinedLogo from "../../../../assets/logo/OutlinedLogo";

const Login: React.FC = () => {
    const {signIn} = useAuth();

    const loginStaff = (data: LoginStaffRequest) => {
        signIn(data);
    };

    return (
        <Container>
            <Left></Left>
            <Right>
                <LoginForm handleSubmit={loginStaff} button_text="Entrar"/>
                <div style={{ position: "absolute", zIndex: 1}}><OutlinedLogo/></div>
            </Right>
        </Container>
    );
}

export default Login;
