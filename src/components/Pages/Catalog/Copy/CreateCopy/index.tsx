import api from '../../../../../utils/api';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import ReturnButton from '../../../../Layouts/ReturnButton';
import useFlashMessage from '../../../../../hooks/useFlashMessages';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import {
    Container,
    FormContainer
} from './styles';
import CreateCopyForm from '../../../../Layouts/Forms/Catalog/Copy/CreateCopyForm';
import type { RegisterCopyRequest } from '../../../../../model/Biblio/BiblioCopy/RegisterCopyRequest';
import type { Biblio } from '../../../../../model/Biblio/Biblio/SearchBiblioResponse';
import type { Copies } from '../../../../../model/Biblio/BiblioCopy/Copies';

const CreateCopy: React.FC = () => {
    const [bookCopies, setBookCopies] = useState<Copies>();
    const [book, setBook] = useState<Biblio>();
    const token = localStorage.getItem("@library_management:token") || "";
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const { id, bibid } = useParams();

    useEffect(() => {
        api.get(`/bibliocopy/detail/${id}`, {
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
    }, [id, token]);

    useEffect(() => {
        api.get(`/biblio/detail/${bibid}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((respose) => {
                setBook(respose.data.biblio)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [bookCopies, id, bibid]);

    const handleOnSubmit = async (formCopy: RegisterCopyRequest) => {
        console.log(formCopy);

        let msgText = '';
        let msgType = '';

        try {
            const response = await api.post(`/bibliocopy/register/${bibid}`, formCopy);
            const data = response.data;
            msgText = data.message;
            msgType = 'success';
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
        msgType === 'success' && navigate(`/catalog`);
    }

    return (
        <Container onClick={() => { console.log(book)}}>
            <ReturnButton />
            <FormContainer>
                <CreateCopyForm button_text='Adicionar Cópia' copyData={bookCopies} biblioData={book} handleSubmit={handleOnSubmit} />
            </FormContainer>
        </Container>
    )
};

export default CreateCopy;