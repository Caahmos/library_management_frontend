import api from '../../../../utils/api';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import ReturnButton from '../../../Layouts/ReturnButton';
import type { RegisterBiblioRequest } from '../../../../model/Biblio/Biblio/RegisterBiblioRequest';
import useFlashMessage from '../../../../hooks/useFlashMessages';
import { useNavigate } from 'react-router-dom';

import {
    Container,
    FormContainer
} from './styles';
import CreateBookForm from '../../../Layouts/Forms/Catalog/CreateBookForm';

const CreateBook: React.FC = () => {
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    const handleOnSubmit = async (newBiblio: RegisterBiblioRequest) => {
        let msgText = '';
        let msgType = '';

        try {
            const response = await api.post('/biblio/register', newBiblio);
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
        msgType === 'success' && navigate('/catalog/createbook');
    }

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <CreateBookForm button_text='Criar Livro' handleSubmit={handleOnSubmit} />
            </FormContainer>
        </Container>
    )
};

export default CreateBook;