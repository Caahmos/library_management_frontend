import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import { Container, FormContainer } from "./styles";
import ReturnButton from "../../../Layouts/ReturnButton";
import { AxiosError } from "axios";
import GenericForm from "../../../Layouts/Forms/Admin/GenericForm";
import type { EditCheckPrivRequest, ViewCheckPrivRequest } from "../../../../model/CheckoutPrivs/EditCheckPrivRequest";

const EditCheckoutPrivs: React.FC = () => {
    const { id } = useParams();
    const [checkPrivs, setCheckPrivs] = useState<ViewCheckPrivRequest>();
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get(`/checkprivs/detail/${id}`, {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        })
            .then((response) => {
                setCheckPrivs(response.data.checkpriv);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token]);

    const handleEdit = async (updatedData: EditCheckPrivRequest) => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.patch(`/checkprivs/edit/${id}`, updatedData);
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
        msgType === 'success' && navigate('/admin/checkoutprivs');
    };

    if (!checkPrivs) return <p>Carregando...</p>;

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <GenericForm
                    title="Editar Limite de Membro"
                    fields={[
                        { name: "checkout_limit", label: "Máx. de Empréstimos", type: "number", placeholder: "2" },
                        { name: "renewal_limit", label: "Máx de Renovações", type: "number", placeholder: "5" },
                        { name: "grace_period_days", label: "Dias para Bloqueio", type: "number", placeholder: "3" },
                    ]}
                    data={checkPrivs}
                    button_text="Salvar Alterações"
                    onSubmit={handleEdit}
                />
            </FormContainer>
        </Container>
    );
};

export default EditCheckoutPrivs;
