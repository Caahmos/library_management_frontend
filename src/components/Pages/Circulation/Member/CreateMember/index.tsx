import api from '../../../../../utils/api';
import { AxiosError } from 'axios';
import React from 'react';
import ReturnButton from '../../../../Layouts/ReturnButton';
import useFlashMessage from '../../../../../hooks/useFlashMessages';
import { useNavigate } from 'react-router-dom';

import {
    Container,
    FormContainer
} from './styles';
import type { RegisterMemberRequest } from '../../../../../model/Member/Member/RegisterMemberRequest';
import CreateMemberForm from '../../../../Layouts/Forms/Circulation/Member/CreateMemberForm';

const CreateMember: React.FC = () => {
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    const handleOnSubmit = async (memberData: RegisterMemberRequest) => {
        let msgText = '';
        let msgType = '';

        try {
            const response = await api.post('/member/register', memberData);
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
            <FormContainer>
                <CreateMemberForm button_text='Cadastrar' handleSubmit={handleOnSubmit}/>
            </FormContainer>
        </Container>
    )
};

export default CreateMember;