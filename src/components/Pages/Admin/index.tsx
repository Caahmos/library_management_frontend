import React, { useState, useEffect } from "react";
import { TopBooksInterface } from "../../../model/Biblio/BiblioReports/TopBooksInterface";
import api from "../../../utils/api";

import {
    Container,
    Square1,
    Square2,
    Square3,
    Square4,
    RetangleGrid,
    SquareTitle,
    SquareSpan,
    SquareContent,
    ChartGrid1,
    ChartGrid2,
    AsideGrid,
    IconAdm,
    IconUsers,
    IconBooks,
    IconCategory,
    Title
} from './styles';
import BookItem from "../../Layouts/Admin/BookItem";

const Admin: React.FC = () => {
    const [topBooks, setTopBooks] = useState<TopBooksInterface[]>([]);
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    useEffect(() => {
        api.get('/biblioreports/topbooks', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(( respose ) => {
            setTopBooks(respose.data.topBooks)
        })
        .catch(( err ) => {
            console.log(err)
        })
    }, [])

    return (
        <Container>
            <Square1>
                <SquareContent>
                    <SquareTitle>Lista de Admins</SquareTitle>
                    <SquareSpan>Acessar painel </SquareSpan>
                </SquareContent>
                <IconAdm />
            </Square1>
            <Square2>
                <SquareContent>
                    <SquareTitle>Tipos de Usuários</SquareTitle>
                    <SquareSpan>Acessar painel </SquareSpan>
                </SquareContent>
                <IconUsers />
            </Square2>
            <Square3>
                <SquareContent>
                    <SquareTitle>Tipos de Materiais</SquareTitle>
                    <SquareSpan>Acessar painel </SquareSpan>
                </SquareContent>
                <IconBooks />
            </Square3>
            <Square4>
                <SquareContent>
                    <SquareTitle>Tipos de Categorias</SquareTitle>
                    <SquareSpan>Acessar painel </SquareSpan>
                </SquareContent>
                <IconCategory />
            </Square4>
            <RetangleGrid>
                Frequencia de Leitura
            </RetangleGrid>
            <ChartGrid1>
                Top Autores
            </ChartGrid1>
            <ChartGrid2>
                Top Categorias
            </ChartGrid2>
            <AsideGrid>
                <Title>Mais lidos</Title>
                {
                    topBooks && topBooks.length > 0 ?
                    topBooks.map((book) => {
                        return <BookItem bibid={book.bibid} author={book.author} count={book.count} title={book.title} />
                    }):
                    <>
                        Nenhum livro encontrado...
                    </>
                }
            </AsideGrid>
        </Container>
    );
}

export default Admin;
