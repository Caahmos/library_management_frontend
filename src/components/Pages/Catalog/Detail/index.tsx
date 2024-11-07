import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import api from "../../../../utils/api";

import {
    Container,
    ImageContainer,
    InfoContainer
} from './styles'

const Detail: React.FC = () => {
    const { id } = useParams();
    const [bookInfo, setBookInfo] = useState<Biblio>();
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    useEffect(() => {
        api.get(`/biblio/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((respose) => {
                setBookInfo(respose.data.biblio)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <Container>
            {
                bookInfo && bookInfo.BiblioMedia
                    ? (
                        <>
                            <ImageContainer>
                                <img src={`http://localhost:5000/imgs/biblio/${bookInfo.BiblioMedia[0]?.imageUrl || 'semcapa.png'}`} />
                            </ImageContainer>
                            <InfoContainer></InfoContainer>
                        </>
                    )
                    : <></>

            }
        </Container>
    );
}

export default Detail;
