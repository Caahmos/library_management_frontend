import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import { Container, FormContainer } from "./styles";
import ReturnButton from "../../../Layouts/ReturnButton";
import { AxiosError } from "axios";
import GenericForm from "../../../Layouts/Forms/Admin/GenericForm";
import { EditMaterialRequest } from "../../../../model/Material/EditMaterialRequest";

const EditMaterial: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();
    const [materialData, setMaterialData] = useState<EditMaterialRequest | null>(null);
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get(`/material/detail/${id}`, {
            headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        })
            .then((response) => {
                setMaterialData(response.data.material);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id, token]);

    const handleEdit = async (updatedData: EditMaterialRequest) => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.patch(`/material/edit/${id}`, updatedData);
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
        msgType === 'success' && navigate('/material');
    };

    const handleDelete = async () => {
        let msgText = "";
        let msgType = "";

        try {
            const response = await api.delete(`/material/delete/${id}`);
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
        msgType === 'success' && navigate('/material');
    };

    if (!materialData) return <p>Carregando...</p>;

    return (
        <Container>
            <ReturnButton />
            <FormContainer>
                <GenericForm
                    title="Editar Categoria"
                    fields={[
                        { name: "description", label: "Descrição", type: "text", placeholder: "Ex: Aluno" },
                        { name: "image_file", label: "Imagem", type: "file", placeholder: "Ex: 1" }
                    ]}
                    data={materialData}
                    img={materialData?.image_file}
                    button_text="Salvar Alterações"
                    onSubmit={handleEdit}
                    onDelete={handleDelete}
                />
            </FormContainer>
        </Container>
    );
};

export default EditMaterial;
