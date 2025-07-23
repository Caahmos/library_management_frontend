import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import { Container, FormContainer } from "./styles";
import ReturnButton from "../../../Layouts/ReturnButton";
import { AxiosError } from "axios";
import GenericForm from "../../../Layouts/Forms/Admin/GenericForm";
import type { ViewCollection } from "../../../../model/Collection/ViewCollection";

const EditCategory: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const [collectionData, setCollectionData] = useState<ViewCollection | null>(null);
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get(`/collection/detail/${id}`, {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        })
            .then((response) => {
                setCollectionData(response.data.collection);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token]);

    const handleEdit = async (updatedData: ViewCollection) => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.patch(`/collection/edit/${id}`, updatedData);
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
        msgType === 'success' && navigate('/collection');
    };

    const handleDelete = async () => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.delete(`/collection/delete/${id}`);
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
        msgType === 'success' && navigate('/collection');
    };

    if (!collectionData) return <p>Carregando...</p>;

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <GenericForm
                    title="Editar Categoria"
                    fields={[
                        { name: "description", label: "Descrição", type: "text", placeholder: "Ex: Aluno" },
                        { name: "days_due_back", label: "Dias para Devolução", type: "number", placeholder: "Ex: 1" },
                        { name: "daily_late_fee", label: "Multa Diária", type: "number", placeholder: "Ex: 0" },
                    ]}
                    data={collectionData}
                    button_text="Salvar Alterações"
                    onSubmit={handleEdit}
                    onDelete={handleDelete}
                />
            </FormContainer>
        </Container>
    );
};

export default EditCategory;
