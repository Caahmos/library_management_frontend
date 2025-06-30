import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFlashMessage from "../../../../hooks/useFlashMessages";
import type { Biblio } from "../../../../model/Biblio/Biblio/SearchBiblioResponse";
import api from "../../../../utils/api";
import { AxiosError } from "axios";

import {
  Container,
  FormContainer
} from './styles';

import ReturnButton from "../../../Layouts/ReturnButton";
import ChangeImageBookForm from "../../../Layouts/Forms/Catalog/ChangeImageBookForm";

const ChangeImageBook: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Biblio>();
  const token = localStorage.getItem("@library_management:token") || "";
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get(`/biblio/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        setBook(response.data.biblio);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, token]);

  const handleImageUpload = async (imageFile: File) => {
    let msgText = '';
    let msgType = '';

    const formData = new FormData();
    formData.append("image_file", imageFile);

    try {
      const response = await api.patch(`/biblio/updateimage/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data"
        }
      });
      msgText = response.data.message || "Imagem atualizada com sucesso!";
      msgType = "success";
      navigate('/');
    } catch (error) {
      const err = error as AxiosError;
      msgText = err.response?.data
        ? (err.response.data as { message: string }).message
        : 'Erro desconhecido';
      msgType = 'error';
    }

    setFlashMessage(msgText, msgType);
  };

  return (
    <Container>
      <ReturnButton />
      {
        book ? (
          <FormContainer>
            <ChangeImageBookForm
              button_text="Enviar Imagem"
              handleSubmit={handleImageUpload}
            />
          </FormContainer>
        ) : (
          <p>Nenhum dado para carregar!</p>
        )
      }
    </Container>
  );
};

export default ChangeImageBook;
