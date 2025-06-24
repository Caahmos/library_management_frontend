import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import { Container, FormContainer } from "./styles";
import ReturnButton from "../../../Layouts/ReturnButton";
import { AxiosError } from "axios";
import GenericForm from "../../../Layouts/Forms/Admin/GenericForm";
import type { ViewCollection } from "../../../../model/Collection/ViewCollection";

const CreateCategory: React.FC = () => {
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const token = localStorage.getItem("@library_management:token") || "";

    const handleEdit = async (newCategory: ViewCollection) => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.post(`/collection/register`, newCategory);
            const data = response.data;
            msgText = data.message;
            msgType = 'success';
            console.log(response);
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

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <GenericForm
                    title="Criar Categoria"
                    fields={[
                        { name: "description", label: "Descrição", type: "text", placeholder: "Ex: Aluno" },
                        { name: "days_due_back", label: "Dias para Devolução", type: "number", placeholder: "Ex: 1" },
                        { name: "daily_late_fee", label: "Multa dia de Atraso", type: "number", placeholder: "Ex: 0" },
                    ]}
                    data={{} as ViewCollection}
                    button_text="Salvar"
                    onSubmit={handleEdit}
                    isCreate
                />
            </FormContainer>
        </Container>
    );
};

export default CreateCategory;
