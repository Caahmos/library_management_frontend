import React from 'react';

import {
    Container,
    Content,
    Sign
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
                <p>©Todos os diretos reservados - Cauã Morales</p>
            </Sign>
        </Container>
    )
}

export default Footer;