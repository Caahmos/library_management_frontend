import React, { useState, useEffect } from "react";
import api from "../../../utils/api";

import {
    Container, Content
} from './styles';

import Book from "../../Layouts/Catalog/Book";
import { Biblio } from "../../../model/Biblio/Biblio/SearchBiblioResponse";
import Filter from "../../Layouts/Filter";
import Footer from "../../Layouts/Footer";
import { useHandleSearch } from "../../../hooks/useHandleSearch";
const Catalog: React.FC = () => {
    const [booksInfo, setBooksInfo] = useState<Biblio[]>();
    const token = localStorage.getItem("@library_management:token") || "";
    const { filterData } = useHandleSearch();

    useEffect(() => {
        console.log(filterData);
        const params: any = {
            take: filterData.take,
        };

        if (filterData.collection) {
            params.collection = filterData.collection;
        }

        if (filterData.date) {
            params.date = filterData.date;
        }

        if (filterData.order) {
            params.order = filterData.order;
        }

        api.get(`/biblio/detailedsearch`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            },
            params
        })
            .then((response) => {
                setBooksInfo(response.data.biblios);
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [filterData, token]);

    return (
        <Container>
            <Filter />
            <Content>
                {
                    booksInfo && booksInfo.length > 0
                        ? booksInfo.map((bookInfo) => (
                            <Book
                                key={bookInfo.bibid}
                                order="block"
                                id={bookInfo.bibid}
                                title={bookInfo.title}
                                author={bookInfo.author}
                                img={bookInfo.BiblioMedia?.[0]?.imageUrl || 'semcapa.png'}
                                rank={bookInfo.BiblioMedia?.[0]?.rank || 0}
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
