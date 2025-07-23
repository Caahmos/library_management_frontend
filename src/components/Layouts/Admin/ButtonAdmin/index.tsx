import React from "react";
import { IoIosArrowForward } from "react-icons/io";

import {
    Container,
    Content,
    Title
} from './styles';

interface IButtonAdmin {
    icon: React.ReactElement;
    text: string;
    link: string;
}

const ButtonAdmin: React.FC<IButtonAdmin> = ({ icon, text, link }) => {
    return (
        <Container to={link}>
            <Content>
                {icon}
                <Title>{text}</Title>
            </Content>
            <IoIosArrowForward/>
        </Container>
    );
};

export default ButtonAdmin;
