import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import { Container, FormContainer } from "./styles";
import ReturnButton from "../../../Layouts/ReturnButton";
import { AxiosError } from "axios";
import GenericForm from "../../../Layouts/Forms/Admin/GenericForm";
import type { RegisterMaterialRequest } from "../../../../model/Material/RegisterMaterialRequest";

const CreateMaterial: React.FC = () => {
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    const handleEdit = async (formData: FormData) => {
        let msgText = "";
        let msgType = "";
    
        try {
            const response = await api.post(`/material/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            const data = response.data;
            msgText = data.message;
            msgType = "success";
        } catch (error) {
            const err = error as AxiosError;
            console.error(err);
            if (err.response && err.response.data) {
                msgText = (err.response.data as { message: string }).message;
            } else {
                msgText = "Erro desconhecido";
            }
            msgType = "error";
        }
    
        setFlashMessage(msgText, msgType);
        if (msgType === "success") {
            navigate("/material");
        }
    };

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <GenericForm
                    title="Criar Material"
                    fields={[
                        { name: "description", label: "Descrição", type: "text", placeholder: "Livro" },
                        { name: "image_file", label: "Imagem", type: "file", placeholder: "Ex: 1" }
                    ]}
                    data={{} as RegisterMaterialRequest}
                    button_text="Salvar"
                    onSubmit={handleEdit}
                    isCreate
                />
            </FormContainer>
        </Container>
    );
};

export default CreateMaterial;
