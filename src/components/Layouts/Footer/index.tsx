import React from 'react';

import {
    Container,
    Content,
    Sign,
    GithubIcon,
    Copyright,
    AppAuthor,
} from './styles';

const Footer: React.FC = () => {
    return (
        <Container>
            <Content>
                <p>Nosso aplicativo de gestão de bibliotecas foi cuidadosamente elaborado para facilitar o acesso ao acervo e a organização da sua experiência de leitura. A biblioteca física está aberta de segunda a sexta-feira, das 08:00 às 18:00, podendo haver alterações nos horários devido a imprevistos. O bibliotecário responsável, Alex, estará à disposição para ajudá-lo sempre que necessário.
                </p>
            </Content>
            <Sign>
                <p>Library App - Livros e Documentos</p>
                <Copyright>
                    <span>©Todos os diretos reservados - </span><AppAuthor href='https://github.com/Caahmos'><GithubIcon/><span> Cauã Morales</span></AppAuthor>
                </Copyright>
            </Sign>
        </Container>
    )
}

export default Footer;