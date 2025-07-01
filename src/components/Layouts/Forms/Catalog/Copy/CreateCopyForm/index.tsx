import React, { useState, useCallback, useEffect } from "react";
import InputForm from "../../../Input/index";
import {
  Container,
  Author,
  Title,
  Button
} from "./styles";
import type { RegisterCopyRequest } from "../../../../../../model/Biblio/BiblioCopy/RegisterCopyRequest";
import type { Copies } from "../../../../../../model/Biblio/BiblioCopy/Copies";
import type { Biblio } from "../../../../../../model/Biblio/Biblio/SearchBiblioResponse";

interface IRegisterCopy {
  button_text: string;
  handleSubmit(data: RegisterCopyRequest): void;
  biblioData?: Biblio;
  copyData?: Copies | undefined;
}


const CreateCopyForm: React.FC<IRegisterCopy> = ({ button_text, biblioData, copyData, handleSubmit }) => {
  const [formCopy, setFormCopy] = useState({
    barcode_nmbr: '',
    copy_desc: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormCopy((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    handleSubmit(formCopy)
  };

  return (
    <Container onSubmit={handleOnSubmit}>
      {
        biblioData ?
        <>
          <Author>Adicionar uma cópia para:</Author>
          <Title>{biblioData.title}</Title>
        </>
        :
        <Title>Adicionar Cópia</Title>
      }
      <InputForm
        label="Tombo: *"
        name="barcode_nmbr"
        value={copyData?.barcode_nmbr || ''}
        required
        onChange={handleChange}
      />

      <InputForm
        label="Descrição *"
        name="copy_desc"
        value={copyData?.copy_desc || ''}
        required
        onChange={handleChange}
      />

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default CreateCopyForm;
