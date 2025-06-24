import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import { Container, FormContainer } from "./styles";
import ReturnButton from "../../../Layouts/ReturnButton";
import { AxiosError } from "axios";
import GenericForm from "../../../Layouts/Forms/Admin/GenericForm";
import type { ViewAllClassifiesRequest } from "../../../../model/Member/MemberClassifyDM/ViewAllClassifiesRequest";

const EditMemberField: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const [mbrFieldInfo, setMbrFieldIndo] = useState<ViewAllClassifiesRequest | null>(null);
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get(`/mbrfieldsdm/detail/${id}`, {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        })
            .then((response) => {
                setMbrFieldIndo(response.data.field);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token]);

    const handleEdit = async (updatedData: ViewAllClassifiesRequest) => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.patch(`/mbrfieldsdm/edit/${id}`, updatedData);
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
        };

        setFlashMessage(msgText, msgType);
        msgType === 'success' && navigate('/mbrfield');
    };

    const handleDelete = async () => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.delete(`/mbrfieldsdm/delete/${id}`);
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
        msgType === 'success' && navigate('/mbrfield');
    };

    if (!mbrFieldInfo) return <p>Carregando...</p>;

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <GenericForm
                    title="Editar Campo de Membro"
                    fields={[
                        { name: "code", label: "Código", type: "text", placeholder: "Professor" },
                        { name: "description", label: "Descrição", type: "text", placeholder: "Professor" },
                    ]}
                    data={mbrFieldInfo}
                    button_text="Salvar Alterações"
                    onSubmit={handleEdit}
                    onDelete={handleDelete}
                />
            </FormContainer>
        </Container>
    );
};

export default EditMemberField;
