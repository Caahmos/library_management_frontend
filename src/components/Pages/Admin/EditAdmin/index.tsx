import React, { useState, useEffect } from 'react';
import api from '../../../../utils/api';
import useFlashMessage from '../../../../hooks/useFlashMessages';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import {
    Container,
    FormContainer
} from './styles';
import ReturnButton from '../../../Layouts/ReturnButton';
import { AxiosError } from 'axios';
import EditAdminForm from '../../../Layouts/Forms/Admin/EditAdminForm';
import type { EditStaffRequest } from '../../../../model/Staff/EditStaffRequest';
import type { SeeStaffs } from '../../../../model/Staff/RegisterStaffRequest';

const EditAdmin: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const [adminInfo, setAdminInfo] = useState<SeeStaffs>({} as SeeStaffs);
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    useEffect(() => {
        api.get(`/staff/detail/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setAdminInfo(response.data.staff);
                console.log(response.data.staff);
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const deleteAdmin = async () => {
        let msgText = '';
        let msgType = '';

        try {
            const response = await api.delete(`/staff/delete/${id}`);
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

    const editedAdmin = async (editedAdminData: EditStaffRequest) => {
        let msgText = '';
        let msgType = '';

        try {
            const response = await api.patch(`/staff/edit/${id}`, editedAdminData);
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
                <EditAdminForm button_text='Salvar' handleSubmit={editedAdmin} adminInfo={adminInfo} handleDelete={deleteAdmin} />
            </FormContainer>
        </Container>
    )
};

export default EditAdmin;