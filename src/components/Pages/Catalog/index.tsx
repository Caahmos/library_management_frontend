import React, { useState, useEffect } from "react";
import api from "../../../utils/api";

import {
    Container, Content
} from './styles';
import Book from "../../Layouts/Catalog/Book";
import { Biblio } from "../../../model/Biblio/Biblio/SearchBiblioResponse";
import Filter from "../../Layouts/Filter";
import Footer from "../../Layouts/Footer";

const Catalog: React.FC = () => {
    const [booksInfo, setBooksInfo] = useState<Biblio[]>();
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get(`/biblio/search`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setBooksInfo(response.data.biblios);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [token]);

    return (
        <Container>
            <Filter />
            <Content>
                {
                    booksInfo && booksInfo.length > 0
                        ? booksInfo.map((bookInfo) => (
                            <Book
                                order="block"
                                id={bookInfo.bibid}
                                title={bookInfo.title}
                                author={bookInfo.author}
                                img={bookInfo.BiblioMedia && bookInfo.BiblioMedia[0]?.imageUrl || 'semcapa.png'}
                                rank={bookInfo.BiblioMedia && bookInfo.BiblioMedia[0]?.rank || 0}
                            />
                        ))
                        : <span> Nenhum livro encontrado! </span>
                }
            </Content>
            <Footer/>
        </Container>
    );
}

export default Catalog;
