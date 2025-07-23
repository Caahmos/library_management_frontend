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
import type { ViewStatusRequest } from '../../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest';

const EditCopy: React.FC = () => {
    const [bookCopies, setBookCopies] = useState<Copies>();
    const [book, setBook] = useState<Biblio>();
    const [codeStatus, setCodeStatus] = useState<ViewStatusRequest[]>([]);
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
                setBookCopies(response.data.copy);
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
                console.error(err)
            })

    }, [bookCopies, id, bibid, token]);

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

    const handleBackClick = () => {
        const lastPage = localStorage.getItem('lastPage');
        if (lastPage) {
            navigate(lastPage);
        } else {
            navigate(-1);
        }
    };

    const handleOnSubmit = async (formCopy: RegisterCopyRequest) => {

        let msgText = '';
        let msgType = '';

        try {
            const response = await api.patch(`/bibliocopy/edit/${id}`, formCopy);
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
        msgType === 'success' && handleBackClick();
    }

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <CreateCopyForm type="editar" button_text='Adicionar Cópia' copyData={bookCopies} biblioData={book} statusData={codeStatus} handleSubmit={handleOnSubmit} />
            </FormContainer>
        </Container>
    )
};

export default EditCopy;