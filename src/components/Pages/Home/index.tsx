import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import {
    Container,
    LoadingContent,
    Padding
} from './styles';
import BooksSection from "../../Layouts/BooksSection";
import type { Biblio } from "../../../model/Biblio/Biblio/SearchBiblioResponse";
import RandomBooksSection from "../../Layouts/RandomBooksSection";
import type { RandomBiblio } from "../../../model/Biblio/Biblio/RandomSearchBiblioResponse";
import Footer from "../../Layouts/Footer";
import load from '../../../assets/imgs/load.gif'
import BannerCarousel from "../../Layouts/BannerCarousel";

const Home: React.FC = () => {
    const [books, setBooks] = useState<Biblio[]>([]);
    const [randomBooks, setRandomBooks] = useState<RandomBiblio[]>([]);
    const token = localStorage.getItem("@library_management:token") || ""

    useEffect(() => {
        api.get('/biblio/search?limit=100', {
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
                    <BannerCarousel />
                    <Padding>
                        <BooksSection collection="" biblioData={books} title="Novidades na biblioteca" />
                        <RandomBooksSection randomBiblios={randomBooks} />
                        <Footer />
                    </Padding>
                </>
            ) : (
                <LoadingContent>
                    <img width={60} src={load} />
                </LoadingContent>
            )}
        </Container>
    );

}

export default Home;
