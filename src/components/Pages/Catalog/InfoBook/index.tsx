import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import type { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import type { Copies } from "../../../../model/Biblio/BiblioCopy/Copies";
import api from "../../../../utils/api";
import { AxiosError } from 'axios';
import useFlashMessage from '../../../../hooks/useFlashMessages';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

import {
    Container,
    Header,
    Button,
    BookSection,
    BookImage,
    BookInfo,
    UpdateImage,
    Content,
    Overlay,
    InfoItem,
    Tag,
    Data,
    TextContainer,
    BookTitle,
    Author,
    BookContent,
    Title,
    CopyList,
    CopyItem,
    CopyTitle,
    CopyNumber,
    CopyDescription,
    CopyStatus,
    Functions,
    LinkIcon,
    AdminButton,
    EditIcon,
    Image,
} from './styles';
import ReturnButton from "../../../Layouts/ReturnButton";
import type { ViewStatusRequest } from "../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest";
import { useAuth } from '../../../../hooks/useAuth';
import type { BiblioField } from "../../../Layouts/Forms/Catalog/EditBookForm";
import { FaEdit } from "react-icons/fa";

const InfoBook: React.FC = () => {
    const { id } = useParams();
    const [books, setBooks] = useState<Biblio[]>([]);
    const [bookCollection, setBookCollection] = useState<string>("");
    const [bookInfo, setBookInfo] = useState<Biblio>();
    const [bookFields, setBookFields] = useState<BiblioField[]>();
    const [bookCopies, setBookCopies] = useState<Copies[]>([]);
    const [codeStatus, setCodeStatus] = useState<ViewStatusRequest[]>([]);
    const [subfieldsDescriptions, setSubfieldsDescriptions] = useState<string[]>();
    const [formCopy, setFormCopy] = useState({
        barcode_nmbr: '',
        copy_desc: '',
    });
    const defaultImage = 'http://localhost:5000/imgs/biblio/semcapa.png';
    const [imageSrc, setImageSrc] = useState(defaultImage);
    const token = localStorage.getItem("@library_management:token") || "";
    const { userData } = useAuth();
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        const el = document.getElementById("top");
        el?.scrollIntoView({ behavior: "smooth" });
    }, [id]);

    useEffect(() => {
        api.get(`/biblio/search?method=collection&data=${bookCollection}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((respose) => {
                setBooks(respose.data.biblios)
            })
            .catch((err) => {
                console.log(err.response.data.message)
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
                setSubfieldsDescriptions(response.data.subfieldsDescriptions);
                setBookCollection(response.data.collection.description);
                setBookFields(response.data.biblio.biblio_field);
                console.log(response.data.biblio.biblio_field)
            })
            .catch((err) => {
                console.error(err.response.data.message);
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
                console.error(err.response.data.message);
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

    const deleteCopy = async (copyid: number) => {
        let msgText = '';
        let msgType = '';

        try {
            const response = await api.delete(`/bibliocopy/delete/${copyid}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            });

            msgText = response.data.message;
            msgType = 'success';

            setBookCopies((prev) => prev.filter(copy => copy.id !== copyid));
        } catch (error) {
            const err = error as AxiosError;
            console.error(err);
            if (err.response && err.response.data) {
                msgText = (err.response.data as { message: string }).message;
            } else {
                msgText = 'Erro desconhecido';
            }
            msgType = 'error';
        }

        setFlashMessage(msgText, msgType);
    };

    const editCopy = async (copyid: number) => {
        navigate(`/catalog/editcopy/${id}/${copyid}`);
    };

    const combinedSubfields = useMemo(() => {
        if (!bookFields || !subfieldsDescriptions) return [];

        return bookFields.map((field, index) => ({
            ...field,
            title: subfieldsDescriptions[index] || 'Sem título'
        }));
    }, [bookFields, subfieldsDescriptions]);


    return (
        <Container id="top" onClick={() => { console.log(bookCopies), console.log(subfieldsDescriptions) }}>
            <ReturnButton />
            {bookInfo && bookInfo.BiblioMedia ? (
                <>
                    <Header>
                        <BookTitle>{bookInfo.title}{bookInfo.title_remainder ? ' - ' + bookInfo.title_remainder : ''}</BookTitle>
                        <Author>Informações do item:</Author>
                    </Header>
                    <BookSection>
                        <BookImage>
                            <Image image={imageSrc}>
                                <Overlay to={`/catalog/changeimage/${id}`}>
                                    <UpdateImage>
                                        <EditIcon size={200} />
                                    </UpdateImage>
                                </Overlay>
                            </Image>
                        </BookImage>
                        <BookInfo>
                            <TextContainer>
                                <Content>
                                    {combinedSubfields.map((field, index) => (
                                        <InfoItem key={field.id}>
                                            <Tag>{field.title}</Tag>
                                            <Data>{field.field_data}</Data>
                                        </InfoItem>
                                    ))}
                                </Content>
                                {
                                    userData?.admin_flg && <AdminButton to={`/catalog/editbook/${id}`}>
                                        <EditIcon />
                                        <span>Editar</span>
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
                                                <Functions>
                                                    <LinkIcon><FaEdit title='Editar Cópia' onClick={() => editCopy(copyInfo.id)}/></LinkIcon>
                                                    <LinkIcon><MdDelete title='Deletar Cópia' onClick={() => deleteCopy(copyInfo.id)} /></LinkIcon>
                                                </Functions>
                                            </CopyItem>
                                        ))
                                        : <p>Nenhuma cópia desse livro encontrada.</p>
                                }
                                <Button to={`/catalog/createcopy/${id}`}>Adicionar Cópia</Button>
                            </CopyList>
                        </BookContent>
                    </BookSection>
                </>
            ) : (
                <p>Carregando...</p>
            )
            }
        </Container >
    );
};

export default InfoBook;
