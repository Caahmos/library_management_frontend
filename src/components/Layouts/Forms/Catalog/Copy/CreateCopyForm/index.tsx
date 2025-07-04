import React, { useState, useEffect } from "react";
import InputForm from "../../../Input/index";
import {
  Container,
  Author,
  Title,
  Button,
  Select,
  Option
} from "./styles";
import type { RegisterCopyRequest } from "../../../../../../model/Biblio/BiblioCopy/RegisterCopyRequest";
import type { Copies } from "../../../../../../model/Biblio/BiblioCopy/Copies";
import type { Biblio } from "../../../../../../model/Biblio/Biblio/SearchBiblioResponse";
import type { ViewStatusRequest } from "../../../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest";

interface IRegisterCopy {
  type: string;
  button_text: string;
  handleSubmit(data: RegisterCopyRequest): void;
  biblioData?: Biblio;
  copyData?: Copies;
  statusData?: ViewStatusRequest[];
}

const CreateCopyForm: React.FC<IRegisterCopy> = ({
  button_text,
  biblioData,
  copyData,
  type,
  statusData = [],
  handleSubmit
}) => {
  const [formCopy, setFormCopy] = useState<RegisterCopyRequest>({
    barcode_nmbr: '',
    copy_desc: '',
    status_cd: type === 'editar' ? '' : 'in'
  });

  useEffect(() => {
    if (copyData) {
      setFormCopy({
        barcode_nmbr: copyData.barcode_nmbr || '',
        copy_desc: copyData.copy_desc || '',
        status_cd: copyData.status_cd?.toString() || (type === 'editar' ? '' : 'in')
      });
    }
  }, [copyData, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormCopy((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(formCopy);
  };

  return (
    <Container onSubmit={handleOnSubmit}>
      {biblioData ? (
        <>
          <Author>{type === 'editar' ? 'Editar uma cópia de:' : 'Adicionar uma cópia de:'}</Author>
          <Title>{biblioData.title}</Title>
        </>
      ) : (
        <Title>Adicionar Cópia</Title>
      )}

      <InputForm
        label="Tombo: *"
        name="barcode_nmbr"
        value={formCopy.barcode_nmbr}
        required
        onChange={handleChange}
      />

      <InputForm
        label="Descrição *"
        name="copy_desc"
        value={formCopy.copy_desc}
        required
        onChange={handleChange}
      />

      <Select
        name="status_cd"
        value={formCopy.status_cd}
        onChange={handleChange}
        required
        disabled={type !== 'editar'} 
      >
        <Option value="">Status</Option>
        {statusData.map((status) => (
          <Option key={status.code} value={status.code.toString()}>
            {status.description}
          </Option>
        ))}
      </Select>

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default CreateCopyForm;
