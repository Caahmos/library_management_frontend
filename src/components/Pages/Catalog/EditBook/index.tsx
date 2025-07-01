import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import { useParams } from "react-router-dom";
import type { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import api from "../../../../utils/api";
import { AxiosError } from 'axios';

import {
    Container,
    FormContainer
} from './styles';

import ReturnButton from "../../../Layouts/ReturnButton";
import EditBookForm from "../../../Layouts/Forms/Catalog/EditBookForm";

const EditBook: React.FC = () => {
    const { id } = useParams();
    const [book, setBook] = useState<Biblio>();
    const token = localStorage.getItem("@library_management:token") || "";
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get(`/biblio/detail/${id}`, {
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

    }, [id, token]);

    const handleOnSubmit = async (newBiblio: Biblio) => {
        let msgText = '';
        let msgType = '';

        try {
            const response = await api.patch(`/biblio/edit/${id}`, newBiblio);
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
        msgType === 'success' && navigate('/');
    }

    return (
        <Container>
            <ReturnButton />
            {
                book
                    ? <FormContainer>
                        <EditBookForm button_text='Criar Livro' handleSubmit={handleOnSubmit} biblioData={book} />
                    </FormContainer>
                    : <p>Nenhum dado para carregar!</p>
            }
        </Container>
    );
};

export default EditBook;
