import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import {
    Container
} from './styles';
import BooksSection from "../../Layouts/BooksSection";
import { Biblio } from "../../../model/Biblio/Biblio/SearchBiblioResponse";
import RandomBooksSection from "../../Layouts/RandomBooksSection";
import { RandomBiblio } from "../../../model/Biblio/Biblio/RandomSearchBiblioResponse";

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
        .then(( respose ) => {
            setBooks(respose.data.biblios)
        })
        .catch(( err ) => {
            console.log(err)
        })

    }, []);

    useEffect(() => {
        api.get('/biblio/randomsearch?method=collection&number=4', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(( respose ) => {
            setRandomBooks(respose.data.biblios)
        })
        .catch(( err ) => {
            console.log(err)
        })
    }, [])

    return (
        <Container onClick={() => {
            console.log(randomBooks)
        }}>
            <BooksSection biblioData={books} title="Novidades na biblioteca"/>
           <RandomBooksSection randomBiblios={randomBooks}/>
        </Container>
    );
}

export default Home;
