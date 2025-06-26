import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import {
    Container
} from './styles';
import BooksSection from "../../Layouts/BooksSection";
import type { Biblio } from "../../../model/Biblio/Biblio/SearchBiblioResponse";
import RandomBooksSection from "../../Layouts/RandomBooksSection";
import type { RandomBiblio } from "../../../model/Biblio/Biblio/RandomSearchBiblioResponse";
import Footer from "../../Layouts/Footer";

const Home: React.FC = () => {
    const [books, setBooks] = useState<Biblio[]>([]);
    const [randomBooks, setRandomBooks] = useState<RandomBiblio[]>([]);
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    useEffect(() => {
        api.get('/biblio/search', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((respose) => {
                setBooks(respose.data.biblios)
            })
            .catch((err) => {
                console.log(err)
            })

    }, []);

    useEffect(() => {
        api.get('/biblio/randomsearch?method=collection&number=4', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((respose) => {
                setRandomBooks(respose.data.biblios)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Container>
            {books.length > 0 && randomBooks.length > 0 ? (
                <>
                    <BooksSection collection="" biblioData={books} title="Novidades na biblioteca" />
                    <RandomBooksSection randomBiblios={randomBooks} />
                    <Footer />
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </Container>
    );

}

export default Home;
