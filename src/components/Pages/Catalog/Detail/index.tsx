import React, { useState, useEffect, type JSX } from "react";
import { useParams } from "react-router-dom";
import type { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import type { Copies } from "../../../../model/Biblio/BiblioCopy/Copies";
import api from "../../../../utils/api";
import { Rating as StarsRating } from 'react-simple-star-rating';
import { FaCalendar } from "react-icons/fa";
import { FaBookmark, FaBarcode } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";

import {
    Container,
    Content,
    BookSection,
    BookImage,
    Image,
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
    AdminButton,
    EditIcon,
    InfoItems,
    BookContainer,
    DueDate,
    DateInfo,
    DateDesc
} from './styles';
import ReturnButton from "../../../Layouts/ReturnButton";
import type { ViewStatusRequest } from "../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest";
import BooksSection from "../../../Layouts/BooksSection";
import Footer from "../../../Layouts/Footer";
import { useAuth } from '../../../../hooks/useAuth';


const Detail: React.FC = () => {
    const { id } = useParams();
    const [books, setBooks] = useState<Biblio[]>([]);
    const [bookCollection, setBookCollection] = useState<string>("");
    const [bookInfo, setBookInfo] = useState<Biblio>();
    const [bookCopies, setBookCopies] = useState<Copies[]>([]);
    const [codeStatus, setCodeStatus] = useState<ViewStatusRequest[]>([]);
    const defaultImage = 'http://localhost:5000/imgs/biblio/semcapa.png';
    const [imageSrc, setImageSrc] = useState(defaultImage);
    const token = localStorage.getItem("@library_management:token") || "";
    const { userData } = useAuth();

    useEffect(() => {
        const el = document.getElementById("top");
        el?.scrollIntoView({ behavior: "smooth" });
    }, [id]);

    useEffect(() => {
        api.get(`/biblio/search?method=collection&data=${bookCollection}&limit=50`, {
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

    }, [id, token, bookCollection, bookInfo]);

    useEffect(() => {
        api.get(`/biblio/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setBookInfo(response.data.biblio);
                const imageUrl = response.data.biblio.BiblioMedia?.[0]?.imageUrl;
                setImageSrc(imageUrl
                    ? `http://localhost:5000/imgs/biblio/${imageUrl}`
                    : defaultImage
                );
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

    const getIsbn = (): string => {
        if (bookInfo?.biblio_field) {
            const foundDescription = bookInfo.biblio_field.find(
                (field) => field.tag === 20 && field.subfield_cd === 'a'
            );
            return foundDescription ? foundDescription.field_data : 'ISBN';
        }
        return 'ISBN';
    };

    const getDescription = (): JSX.Element | string => {
        if (bookInfo?.biblio_field) {
            const foundDescription = bookInfo.biblio_field.find(
                (field) => field.tag === 520 && field.subfield_cd === 'a'
            );
            return foundDescription ? (
                foundDescription.field_data
            ) : (
                <span><BsStars /> Gerando descrição...</span>
            );
        }
        return <span><BsStars /> Gerando descrição...</span>;
    };

    const getDate = (): string => {
        if (bookInfo?.biblio_field) {
            const foundDate = bookInfo.biblio_field.find(
                (field) => field.tag === 260 && field.subfield_cd === 'c'
            );
            return foundDate ? foundDate.field_data : 'Data';
        }
        return 'Data';
    };

    const getPages = (): string => {
        if (bookInfo?.biblio_field) {
            const foundDate = bookInfo.biblio_field.find(
                (field) => field.tag === 300 && field.subfield_cd === 'a'
            );
            return foundDate ? foundDate.field_data : 'Páginas';
        }
        return 'Páginas';
    };

    const formatDate = (date?: string | Date | null) => {
        if (!date) return '-';
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    };

    return (
        <Container id="top">
            <ReturnButton />
            <BookContainer>
                {bookInfo && bookInfo.BiblioMedia ? (
                    <BookSection>
                        <BookImage>
                            <Image image={imageSrc} />
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
                                <InfoItems>
                                    <DateBook><FaCalendar title="Data de lançamento" /> {getDate()}</DateBook>
                                    <DateBook><FaBookmark title="Número de páginas" /> {getPages()}</DateBook>
                                    <DateBook><FaBarcode title="ISBN" /> {getIsbn()}</DateBook>
                                </InfoItems>
                                {
                                    userData?.admin_flg && <AdminButton to={`/catalog/info/${id}`}>
                                        <EditIcon />
                                        <span>Mais Informações</span>
                                    </AdminButton>
                                }
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
                                                    <CopyNumber>{copyInfo.barcode_nmbr}</CopyNumber>
                                                    <CopyDescription>{copyInfo.copy_desc || 'Sem descrição'}</CopyDescription>
                                                </CopyTitle>
                                                <CopyStatus>{styledStatusCode(copyInfo.status_cd)}</CopyStatus>
                                                {
                                                    copyInfo.status_cd == 'out' &&
                                                        <DueDate>
                                                            <DateInfo>Previsão de entrega:</DateInfo>
                                                            <DateDesc>{formatDate(copyInfo.due_back_dt)}</DateDesc>
                                                        </DueDate>
                                                }
                                            </CopyItem>
                                        ))
                                        : <p>Nenhuma cópia desse livro encontrada.</p>
                                }
                            </CopyList>
                        </BookContent>
                        <Content>
                            <Title>Livros relacionados a {bookCollection}</Title>
                            <BooksSection collection={bookCollection} title="" biblioData={books} />
                            <Footer />
                        </Content>
                    </BookSection>
                ) : (
                    <p>Carregando...</p>
                )}
            </BookContainer>
        </Container>
    );
};

export default Detail;
