import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import { Copies } from "../../../../model/Biblio/BiblioCopy/Copies";
import api from "../../../../utils/api";
import { Rating as StarsRating } from 'react-simple-star-rating';
import { FaCalendar } from "react-icons/fa";

import {
    Container,
    Content,
    BookSection,
    BookImage,
    BookInfo,
    TextContainer,
    BookTitle,
    Author,
    Rating,
    Description,
    DateBook,
    BookContent,
    Title,
    CopyList,
    CopyItem,
    CopyTitle,
    CopyNumber,
    CopyDescription,
    CopyStatus,
    CopyButtons
} from './styles';
import ReturnButton from "../../../Layouts/ReturnButton";
import { ViewStatusRequest } from "../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest";
import BooksSection from "../../../Layouts/BooksSection";
import Footer from "../../../Layouts/Footer";

const Detail: React.FC = () => {
    const { id } = useParams();
    const [books, setBooks] = useState<Biblio[]>([]);
    const [bookCollection, setBookCollection] = useState<string>("");
    const [bookInfo, setBookInfo] = useState<Biblio>();
    const [bookCopies, setBookCopies] = useState<Copies[]>([]);
    const [codeStatus, setCodeStatus] = useState<ViewStatusRequest[]>([]);
    const [subfieldsDescriptions, setSubfieldsDescriptions] = useState<string[]>();
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        console.log(`/biblio/search?method=collection&data=${bookCollection}`);
        api.get(`/biblio/search?method=collection&data=${bookCollection}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((respose) => {
                setBooks(respose.data.biblios)
                console.log(respose.data.biblios)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [id, token, bookCollection, bookInfo]);

    useEffect(() => {
        api.get(`/biblio/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setBookInfo(response.data.biblio);
                setSubfieldsDescriptions(response.data.subfieldsDescriptions);
                setBookCollection(response.data.collection.description);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token]);

    useEffect(() => {
        api.get(`/bibliocopy/viewcopies/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setBookCopies(response.data.copies);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token, bookInfo]);

    useEffect(() => {
        api.get(`/bibliohist/viewstatus`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setCodeStatus(response.data.statusDescription);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token, bookCopies]);

    const styledStatusCode = (code: string) => {
        const description = codeStatus.find((item) => {
            return item.code === code
        })

        return description?.description
    };

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
            <ReturnButton />
            {bookInfo && bookInfo.BiblioMedia ? (
                <BookSection onClick={() => { console.log(bookInfo + ' ' + subfieldsDescriptions) }}>
                    <BookImage>
                        <img src={`http://localhost:5000/imgs/biblio/${bookInfo.BiblioMedia[0]?.imageUrl || 'semcapa.png'}`} alt="Capa do Livro" />
                    </BookImage>
                    <BookInfo>
                        <TextContainer>
                            <BookTitle>{bookInfo.title}{bookInfo.title_remainder ? ' - ' + bookInfo.title_remainder : ''}</BookTitle>
                            <Author>por {bookInfo.author}</Author>
                            <Rating>
                                <StarsRating size={14} readonly={true} initialValue={bookInfo?.BiblioMedia[0]?.rank || 0} />
                                ({bookInfo?.BiblioMedia[0]?.count_ranks || 0})
                            </Rating>
                            <Description>{getDescription()}</Description>
                            <DateBook><FaCalendar /> {getDate()}</DateBook>
                        </TextContainer>
                    </BookInfo>
                    <BookContent>
                        <Title>Cópias cadastradas</Title>
                        <CopyList>
                            {
                                bookCopies && bookCopies.length > 0
                                    ?
                                    bookCopies.map((copyInfo) => (
                                        <CopyItem key={copyInfo.copyid}>
                                            <CopyTitle>
                                                <CopyNumber>{copyInfo.copyid}</CopyNumber>
                                                <CopyDescription>{copyInfo.copy_desc || 'Sem descrição'}</CopyDescription>
                                            </CopyTitle>
                                            <CopyStatus>{styledStatusCode(copyInfo.status_cd)}</CopyStatus>
                                            <CopyButtons>Botão</CopyButtons>
                                        </CopyItem>
                                    ))
                                    : <p>Nenhuma cópia desse livro encontrada.</p>
                            }
                        </CopyList>
                    </BookContent>
                    <Content>
                        <Title>Livros relacionados a { bookCollection }</Title>
                    <BooksSection collection={bookCollection} title="" biblioData={books} />
                    <Footer/>
                    </Content>
                </BookSection>
            ) : (
                <p>Carregando...</p>
                )}
        </Container>
    );
};

export default Detail;
