import api from '../../../../../utils/api';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
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
    const [mbrid, setMbrid] = useState<number | null>(null);

    const handleOnSubmit = async (memberData: RegisterMemberRequest) => {
        let msgText = '';
        let msgType = '';

        try {
            const response = await api.post('/member/register', memberData);
            const data = response.data;
            const newMbrid = data.registeredMember.mbrid;

            setMbrid(newMbrid);
            console.log("Novo membro cadastrado:", data);

            msgText = data.message;
            msgType = 'success';

            navigate(`/member/addimage/${newMbrid}`);
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

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <CreateMemberForm button_text='Próximo' handleSubmit={handleOnSubmit} />
            </FormContainer>
        </Container>
    )
};

export default CreateMember;