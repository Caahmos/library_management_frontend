import React from 'react';
import api from '../../../../utils/api';
import useFlashMessage from '../../../../hooks/useFlashMessages';
import { useNavigate } from 'react-router-dom';

import {
    Container,
    FormContainer
} from './styles';
import ReturnButton from '../../../Layouts/ReturnButton';
import RegisterAdminForm from '../../../Layouts/Forms/Admin/RegisterAdminForm';
import { AxiosError } from 'axios';
import type { RegisterStaffRequest } from '../../../../model/Staff/RegisterStaffRequest';

const CreateAdmin: React.FC = () => {
    const navigate = useNavigate();
    const {setFlashMessage} = useFlashMessage();

    const createNewAdmin = async (newAdminData: RegisterStaffRequest) => {
        let msgText = '';
        let msgType = '';

        try {
            const response = await api.post('/staff/register', newAdminData);
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
        msgType === 'success' && navigate('/admin/adminlist');
    }

    return (
        <Container>
            <ReturnButton/>
            <FormContainer>
                    <RegisterAdminForm button_text='Adicionar' handleSubmit={createNewAdmin}/>
            </FormContainer>
        </Container>
    )
};

export default CreateAdmin;