import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import {
    Container
} from './styles';
import BooksSection from "../../Layouts/BooksSection";
import { Biblio } from "../../../model/Biblio/Biblio/SearchBiblioResponse";

const Home: React.FC = () => {
    const [books, setBooks] = useState<Biblio[]>([]);
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    useEffect(() => {
        api.get('/biblio/search?title=Moby Dick', {
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

    return (
        <Container onClick={() => {
            console.log(books)
        }}>
            <BooksSection biblioData={books}/>
        </Container>
    );
}

export default Home;
