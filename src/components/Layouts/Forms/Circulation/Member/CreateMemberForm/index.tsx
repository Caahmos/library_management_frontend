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
  type: "create" | "edit";
  button_text: string;
  memberData?: RegisterMemberRequest;
  handleSubmit(data: RegisterMemberRequest): void;
}

const CreateMemberForm: React.FC<IMemberForm> = ({
  button_text,
  handleSubmit,
  memberData,
  type
}) => {
  const [classifies, setClassifies] = useState<ViewAllClassifiesRequest[]>([]);
  const [fields, setFields] = useState<ViewFieldsRequest[]>([]);
  const [memberFields, setMemberFields] = useState<ViewFieldsRequest[]>([]);

  const [member, setMember] = useState<RegisterMemberRequest>({
    first_name: "",
    last_name: "",
    barcode_nmbr: "",
    address: "",
    home_phone: "",
    work_phone: "",
    email: "",
    classification: 0,
    member_fields: [],
  });

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

  useEffect(() => {
    if (memberData) {
      setMember({
        ...memberData,
        member_fields: undefined,
      });

      const extraFields: ViewFieldsRequest[] = memberData.member_fields?.length
        ? memberData.member_fields
        : (memberData.code || []).map((code, index) => {
          return {
            code,
            description: "",
            data: memberData.data?.[index] ?? "",
            default_flg: false
          };
        });

      setMemberFields(extraFields);
    }
  }, [memberData]);

  const handleInputChange = (name: string, value: string | number) => {
    setMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExtraChange = (
    index: number,
    key: "code" | "data",
    value: string
  ) => {
    const updated = [...memberFields];
    updated[index] = {
      ...updated[index],
      [key]: value,
      default_flg: updated[index]?.default_flg ?? false
    };
    setMemberFields(updated);
  };

  const addExtraField = () => {
    const available = fields.find(f =>
      !memberFields.some(existing => existing.code === f.code)
    );

    if (available) {
      setMemberFields(prev => [
        ...prev,
        {
          code: available.code,
          description: available.description ?? "",
          data: "",
          default_flg: false
        }
      ]);
    } else {
      alert("Todos os campos disponíveis já foram utilizados.");
    }
  };

  const removeExtraField = (index: number) => {
    setMemberFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      type === "create" &&
      (!member.first_name || !member.last_name || !member.barcode_nmbr)
    ) {
      alert("Preencha nome, sobrenome e código de barras.");
      return;
    }

    if (memberFields.length === 0) {
      alert("Adicione ao menos uma informação extra.");
      return;
    }

    const code = memberFields.map((field) => field.code ?? "");
    const data = memberFields.map((field) => field.data ?? "");

    const finalData: RegisterMemberRequest = {
      ...member,
      code,
      data,
      member_fields: undefined
    };

    handleSubmit(finalData);
  };

  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>{type === "edit" ? "Editar Membro" : "Registrar Membro"}</Title>

      <Select
        name="classification"
        value={member.classification}
        onChange={(e) =>
          handleInputChange("classification", parseInt(e.target.value))
        }
        required={type === "create"}
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
        required={type === "create"}
        onChange={(e) => handleInputChange("first_name", e.target.value)}
      />

      <InputForm
        label="Sobrenome *"
        name="last_name"
        value={member.last_name}
        required={type === "create"}
        onChange={(e) => handleInputChange("last_name", e.target.value)}
      />

      <InputForm
        label="Código de Barras *"
        name="barcode_nmbr"
        value={member.barcode_nmbr}
        required={type === "create"}
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
        {memberFields.map((field, index) => {
          const usedCodes = memberFields
            .map((f, i) => (i !== index ? f.code : null))
            .filter(Boolean);

          return (
            <Content key={index}>
              <Select
                name={`code-${index}`}
                value={field.code ?? ""}
                onChange={(e) => handleExtraChange(index, "code", e.target.value)}
                required={type === "create"}
              >
                <Option value="">Selecionar Campo *</Option>
                {fields.map((f) => (
                  <Option
                    key={f.code}
                    value={f.code}
                    disabled={usedCodes.includes(f.code)}
                  >
                    {f.code}
                  </Option>
                ))}
              </Select>

              <StyledInput
                name={`data-${index}`}
                placeholder="Valor"
                value={field.data ?? ""}
                onChange={(e) => handleExtraChange(index, "data", e.target.value)}
              />

              <button
                type="button"
                onClick={() => removeExtraField(index)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "8px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Remover
              </button>
            </Content>
          );
        })}
        <Button type="button" onClick={addExtraField}>
          Adicionar Campo Extra
        </Button>
      </InfoFields>

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default CreateMemberForm;
