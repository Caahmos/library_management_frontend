import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../../utils/api';
import useFlashMessage from '../../../../hooks/useFlashMessages';
import { useNavigate } from 'react-router-dom';

import {
    Container,
    FormContainer
} from './styles';
import ReturnButton from '../../../Layouts/ReturnButton';
import { AxiosError } from 'axios';
import { ChangeStaffPasswordRequest } from '../../../../model/Staff/ChangeStaffPasswordRequest';
import ChangeAdminPasswordForm from '../../../Layouts/Forms/Admin/ChangeAdminPasswordForm';

const ChangeAdminPassword: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    const newAdminPassword = async (changeAdminPassword: ChangeStaffPasswordRequest) => {
        let msgText = '';
        let msgType = '';

        try {
            const response = await api.patch(`/staff/changepassword/${id}`, changeAdminPassword);
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
            <ReturnButton />
            <FormContainer>
                <ChangeAdminPasswordForm button_text='Alterar' handleSubmit={newAdminPassword} />
            </FormContainer>
        </Container>
    )
};

export default ChangeAdminPassword;