import React, { useState, useEffect } from "react";
import api from "../../../../../../utils/api";
import InputForm from "../../../Input";
import {
  Container,
  Title,
  Button,
  Select,
  Option,
  InfoFields,
  Label,
  Content,
  StyledInput
} from "./styles";

import type { RegisterMemberRequest } from "../../../../../../model/Member/Member/RegisterMemberRequest";
import type { ViewAllClassifiesRequest } from "../../../../../../model/Member/MemberClassifyDM/ViewAllClassifiesRequest";
import type { ViewFieldsRequest } from "../../../../../../model/Member/MemberFieldsDM/ViewFieldsRequest";

interface IMemberForm {
  button_text: string;
  memberData?: RegisterMemberRequest;
  handleSubmit(data: RegisterMemberRequest): void;
}

const CreateMemberForm: React.FC<IMemberForm> = ({ button_text, handleSubmit, memberData }) => {
  const [classifies, setClassifies] = useState<ViewAllClassifiesRequest[]>([]);
  const [fields, setFields] = useState<ViewFieldsRequest[]>([]);

  const [selectedCode, setSelectedCode] = useState("");
  const [typedData, setTypedData] = useState("");

  const [member, setMember] = useState<RegisterMemberRequest>(
    memberData || {
      first_name: "",
      last_name: "",
      barcode_nmbr: "",
      address: "",
      home_phone: "",
      work_phone: "",
      email: "",
      code: [],
      data: [],
      classification: 0
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("@library_management:token") || "";

    api.get("/mbrclassifydm/viewall", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(res => setClassifies(res.data.classifies))
      .catch(err => console.error("Erro ao buscar classificações:", err));

    api.get("/mbrfieldsdm/viewfields", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(res => setFields(res.data.fields))
      .catch(err => console.error("Erro ao buscar campos:", err));
  }, []);

  const handleInputChange = (name: string, value: string | number) => {
    setMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!member.first_name || !member.last_name || !member.barcode_nmbr) {
      alert("Preencha nome, sobrenome e código de barras.");
      return;
    }

    if (!selectedCode) {
      alert("Selecione um código (ex: Aluno, Professor...)");
      return;
    }

    const finalData: RegisterMemberRequest = {
      ...member,
      code: [selectedCode],
      data: [typedData],
    };

    console.log(finalData);
    handleSubmit(finalData);
  };

  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>Registrar Membro</Title>

      <Select
        name="classification"
        value={member.classification}
        onChange={(e) => handleInputChange("classification", parseInt(e.target.value))}
        required
      >
        <Option value="">Classificação *</Option>
        {classifies.map((cls) => (
          <Option key={cls.code} value={cls.code}>
            {cls.description}
          </Option>
        ))}
      </Select>

      <InputForm
        label="Nome *"
        name="first_name"
        value={member.first_name}
        required
        onChange={(e) => handleInputChange("first_name", e.target.value)}
      />

      <InputForm
        label="Sobrenome *"
        name="last_name"
        value={member.last_name}
        required
        onChange={(e) => handleInputChange("last_name", e.target.value)}
      />

      <InputForm
        label="Código de Barras *"
        name="barcode_nmbr"
        value={member.barcode_nmbr}
        required
        onChange={(e) => handleInputChange("barcode_nmbr", e.target.value)}
      />

      <InputForm
        label="Endereço"
        name="address"
        value={member.address}
        onChange={(e) => handleInputChange("address", e.target.value)}
      />

      <InputForm
        label="Telefone Residencial"
        name="home_phone"
        value={member.home_phone}
        onChange={(e) => handleInputChange("home_phone", e.target.value)}
      />

      <InputForm
        label="Telefone Comercial"
        name="work_phone"
        value={member.work_phone}
        onChange={(e) => handleInputChange("work_phone", e.target.value)}
      />

      <InputForm
        label="Email"
        name="email"
        value={member.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />

      <InfoFields>
        <Label>Informações Extras</Label>
        <Content>
          <Select
            name="code"
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            required
          >
            <Option value="">Selecionar Campo *</Option>
            {fields.map((f) => (
              <Option key={f.code} value={f.description}>
                {f.description}
              </Option>
            ))}
          </Select>

          <StyledInput
            name="data"
            value={typedData}
            onChange={(e) => setTypedData(e.target.value)}
          />
        </Content>
      </InfoFields>

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default CreateMemberForm;
