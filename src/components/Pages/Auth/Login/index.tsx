import React from "react";
import LoginForm from "../../../Layouts/Forms/Auth/LoginForm";
import { AppAuthor, Container, Content, Copyright, FooterContainer, GithubIcon, Left, Right, Sign } from './styles';
import type { LoginStaffRequest } from "../../../../model/Staff/LoginStaffRequest";
import { useAuth } from "../../../../hooks/useAuth";
import OutlinedLogo from "../../../../assets/logo/OutlinedLogo";
import students from '../../../../assets/imgs/students.png';
import Logowhite from "../../../../assets/logo/Logowhite";

const Login: React.FC = () => {
    const { signIn } = useAuth();

    const loginStaff = (data: LoginStaffRequest) => {
        signIn(data);
    };

    return (
        <Container>
            <Left>
                <img width={600} src={students} />
                <FooterContainer>
                    <Sign>
                        <Logowhite />
                        <Copyright>
                            <span>©Todos os diretos reservados - </span><AppAuthor href='https://github.com/Caahmos'><GithubIcon /><span> Cauã Morales</span></AppAuthor>
                        </Copyright>
                    </Sign>
                </FooterContainer>
            </Left>
            <Right>
                <LoginForm handleSubmit={loginStaff} button_text="Entrar" />
                <div style={{ position: "absolute", zIndex: 1 }}><OutlinedLogo /></div>
            </Right>
        </Container>
    );
}

export default Login;
