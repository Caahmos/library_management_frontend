import api from '../../../../../utils/api';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import ReturnButton from '../../../../Layouts/ReturnButton';
import useFlashMessage from '../../../../../hooks/useFlashMessages';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Container,
  FormContainer
} from './styles';
import type { RegisterMemberRequest } from '../../../../../model/Member/Member/RegisterMemberRequest';
import CreateMemberForm from '../../../../Layouts/Forms/Circulation/Member/CreateMemberForm';

const EditMember: React.FC = () => {
  const navigate = useNavigate();
  const { mbrid } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [memberData, setMemberData] = useState<RegisterMemberRequest | null>(null);
  const token = localStorage.getItem("@library_management:token") || "";

  useEffect(() => {
    if (!mbrid) return;

    api.get(`/member/detail/${mbrid}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then(res => {
        console.log(res.data.member);
        setMemberData(res.data.member);
      })
      .catch((err: AxiosError) => {
        console.error(err);
        setFlashMessage("Erro ao buscar dados do membro", "error");
      });
  }, [mbrid, token]);

  const handleOnSubmit = async (data: RegisterMemberRequest) => {
    let msgText = '';
    let msgType = '';

    try {
      await api.patch(`/member/edit/${mbrid}`, data, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      msgText = "Dados do membro atualizados com sucesso!";
      msgType = "success";

      navigate(`/member/detail/${mbrid}`);
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
  };

  return (
    <Container>
      <ReturnButton />
      <FormContainer>
        {memberData && (
          <CreateMemberForm
            type='edit'
            button_text="Salvar Alterações"
            handleSubmit={handleOnSubmit}
            memberData={memberData}
          />
        )}
      </FormContainer>
    </Container>
  );
};

export default EditMember;
