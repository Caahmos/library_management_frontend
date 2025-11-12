import React, { useEffect } from "react";
import LoginForm from "../../../Layouts/Forms/Auth/LoginForm";
import { AppAuthor, Container, Copyright, FooterContainer, GithubIcon, Left, Right, Sign } from './styles';
import type { LoginStaffRequest } from "../../../../model/Staff/LoginStaffRequest";
import { useAuth } from "../../../../hooks/useAuth";
import OutlinedLogo from "../../../../assets/logo/OutlinedLogo";
import students from '../../../../assets/imgs/students.png';
import Logowhite from "../../../../assets/logo/Logowhite";
import useFlashMessage from "../../../../hooks/useFlashMessages";

const Login: React.FC = () => {
    const { signIn } = useAuth();
    const { setFlashMessage } = useFlashMessage();

    const loginStaff = (data: LoginStaffRequest) => {
        signIn(data);
    };

    useEffect(() => {
        setFlashMessage('Tudo pronto! O usuário e a senha do aluno já estão preenchidos, é só entrar!', 'success');
    }, [])

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
