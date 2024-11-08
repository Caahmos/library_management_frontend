import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import api from "../../../../utils/api";
import { Rating as StarsRating } from 'react-simple-star-rating';
import { FaCalendar } from "react-icons/fa";

import {
    Container,
    BookSection,
    BookImage,
    BookInfo,
    TextContainer,
    Title,
    Author,
    Rating,
    Description,
    DateBook,
    ButtonsContainer
} from './styles';
import ReturnButton from "../../../Layouts/ReturnButton";

const Detail: React.FC = () => {
    const { id } = useParams();
    const [bookInfo, setBookInfo] = useState<Biblio>();
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get(`/biblio/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setBookInfo(response.data.biblio);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token]);

    const getDescription = (): string => {
        if (bookInfo?.biblio_field) {
            const foundDescription = bookInfo.biblio_field.find(
                (field) => field.tag === 520 && field.subfield_cd === 'a'
            );
            return foundDescription ? foundDescription.field_data : 'Nenhuma descrição encontrada ...';
        }
        return 'Nenhuma descrição encontrada ...';
    };

    const getDate = (): string => {
        if (bookInfo?.biblio_field) {
            const foundDate = bookInfo.biblio_field.find(
                (field) => field.tag === 260 && field.subfield_cd === 'c'
            );
            return foundDate ? foundDate.field_data : '0000';
        }
        return '0000';
    };

    return (
        <Container>
            <ReturnButton/>
            {bookInfo && bookInfo.BiblioMedia ? (
                <>
                    <BookSection>
                        <BookImage>
                            <img src={`http://localhost:5000/imgs/biblio/${bookInfo.BiblioMedia[0]?.imageUrl || 'semcapa.png'}`} alt="Capa do Livro" />
                        </BookImage>
                        <BookInfo>
                            <TextContainer>
                                <Title>{bookInfo.title}{bookInfo.title_remainder ? ' - ' + bookInfo.title_remainder : ''}</Title>
                                <Author>por {bookInfo.author}</Author>
                                <Rating>
                                    <StarsRating size={14} readonly={true} initialValue={bookInfo?.BiblioMedia[0]?.rank || 0} />
                                    ({bookInfo?.BiblioMedia[0]?.count_ranks || 0})
                                </Rating>
                                <Description>{getDescription()}</Description>
                                <DateBook><FaCalendar /> {getDate()}</DateBook>
                            </TextContainer>
                            <ButtonsContainer></ButtonsContainer>
                        </BookInfo>
                    </BookSection>
                </>
            ) : (
                <p>Carregando...</p>
            )}
        </Container>
    );
};

export default Detail;
