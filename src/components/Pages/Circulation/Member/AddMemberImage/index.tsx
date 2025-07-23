import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../../../../utils/api';
import { AxiosError } from 'axios';
import ReturnButton from '../../../../Layouts/ReturnButton';
import useFlashMessage from '../../../../../hooks/useFlashMessages';

import {
  Container,
  FormContainer
} from './styles';
import AddImageMemberForm from '../../../../Layouts/Forms/Circulation/Member/AddImageMemberForm';
import type { ViewMembersRequest } from '../../../../../model/Member/Member/ViewMembersRequest';

const AddMemberImage: React.FC = () => {
  const { mbrid } = useParams();
  const navigate = useNavigate();
  const { setFlashMessage } = useFlashMessage();
  const [member, setMember] = useState<ViewMembersRequest>();
  const token = localStorage.getItem("@library_management:token") || "";

  useEffect(() => {
    api.get(`/member/detail/${mbrid}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        console.log(response.data.member);
        setMember(response.data.member);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [mbrid, token]);

  const handleImageUpload = async (imageFile: File) => {
    let msgText = '';
    let msgType = '';

    const formData = new FormData();
    formData.append("image_file", imageFile);

    try {
      const response = await api.patch(`/member/updateimage/${mbrid}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data"
        }
      });

      msgText = response.data.message || "Imagem atualizada com sucesso!";
      msgType = "success";

      navigate(`/member/detail/${mbrid}`);
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
      <FormContainer>
        <AddImageMemberForm button_text={`Adicionar Imagem de ${member?.first_name}`} handleSubmit={handleImageUpload} />
      </FormContainer>
    </Container>
  )
};

export default AddMemberImage;