import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import api from "../../../../utils/api";
import { Rating as StarsRating } from 'react-simple-star-rating'
import { FaCalendar } from "react-icons/fa";

import {
    Container,
    ImageContainer,
    InfoContainer,
    TextContainer,
    ButtonsContainer,
    Title,
    Author,
    Rating,
    Description,
    DateBook
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

    const getDescription = (): string => {
        if(bookInfo && bookInfo.biblio_field){
            const findedDescription = bookInfo.biblio_field.find((field) => {
                return field.tag === 520 && field.subfield_cd == 'a'
            });

            if(findedDescription){
                return findedDescription.field_data;
            }
        }
        return 'Nenhuma descrição encontrada ...'
    }

    const getDate = (): string => {
        if(bookInfo && bookInfo.biblio_field){
            const findedDate = bookInfo.biblio_field.find((field) => {
                return field.tag === 260 && field.subfield_cd == 'c';
            });

            if(findedDate){
                return findedDate.field_data;
            }
        }
        return '0000'
    }

    return (
        <Container>
            {
                bookInfo && bookInfo.BiblioMedia
                    ? (
                        <>
                            <ImageContainer>
                                <img src={`http://localhost:5000/imgs/biblio/${bookInfo.BiblioMedia[0]?.imageUrl || 'semcapa.png'}`} />
                            </ImageContainer>
                            <InfoContainer>
                                <TextContainer>
                                    
                                    <Title>{bookInfo.title}{bookInfo.title_remainder ? ' - ' + bookInfo.title_remainder : ''}</Title>
                                    <Author>por {bookInfo.author}</Author>
                                    <Rating><StarsRating size={14} readonly={true} initialValue={bookInfo?.BiblioMedia[0]?.rank || 0}/> ({bookInfo?.BiblioMedia[0]?.count_ranks || 0}) </Rating>
                                    <Description>
                                        {
                                            getDescription()
                                        }
                                    </Description>
                                    <DateBook>
                                        <FaCalendar/> {getDate()}
                                    </DateBook>
                                </TextContainer>
                                <ButtonsContainer></ButtonsContainer>
                            </InfoContainer>
                        </>
                    )
                    : <></>

            }
        </Container>
    );
}

export default Detail;
