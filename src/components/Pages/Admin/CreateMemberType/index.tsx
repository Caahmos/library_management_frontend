import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import { Container, FormContainer } from "./styles";
import ReturnButton from "../../../Layouts/ReturnButton";
import { AxiosError } from "axios";
import GenericForm from "../../../Layouts/Forms/Admin/GenericForm";
import type { ViewAllClassifiesRequest } from "../../../../model/Member/MemberClassifyDM/ViewAllClassifiesRequest";

const CreateMemberType: React.FC = () => {
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    const handleEdit = async (newClassifyData: ViewAllClassifiesRequest) => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.post(`/mbrclassifydm/register`, newClassifyData);
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
        msgType === 'success' && navigate('/mbrclassify');
    };

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <GenericForm
                    title="Criar Tipo de Membro"
                    fields={[
                        { name: "description", label: "Descrição", type: "text", placeholder: "Ex: Aluno" },
                        { name: "max_fines", label: "Multa Máxima", type: "text", placeholder: "Ex: 0" },
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

export default CreateMemberType;
