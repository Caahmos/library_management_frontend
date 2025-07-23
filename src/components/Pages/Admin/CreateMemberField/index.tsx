import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import { Container, FormContainer } from "./styles";
import ReturnButton from "../../../Layouts/ReturnButton";
import { AxiosError } from "axios";
import GenericForm from "../../../Layouts/Forms/Admin/GenericForm";
import type { ViewAllClassifiesRequest } from "../../../../model/Member/MemberClassifyDM/ViewAllClassifiesRequest";

const CreateMemberField: React.FC = () => {
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    const handleEdit = async (newMemberFieldData: ViewAllClassifiesRequest) => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.post(`/mbrfieldsdm/register`, newMemberFieldData);
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

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <GenericForm
                    title="Criar Campo de Membro"
                    fields={[
                        { name: "code", label: "Código", type: "text", placeholder: "Professor" },
                        { name: "description", label: "Descrição", type: "text", placeholder: "Professor" }
                    ]}
                    data={{} as ViewAllClassifiesRequest}
                    button_text="Salvar"
                    onSubmit={handleEdit}
                    isCreate
                />
            </FormContainer>
        </Container>
    );
};

export default CreateMemberField;
