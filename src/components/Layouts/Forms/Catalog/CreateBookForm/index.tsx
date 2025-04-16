import React, { useState, useCallback, useEffect } from "react";
import InputForm from "../../Input/index";
import SwitchComponent from "../../SwitchComponent";
import { RegisterBiblioRequest } from "../../../../../model/Biblio/Biblio/RegisterBiblioRequest";
import api from "../../../../../utils/api";

import {
  Container,
  Call,
  Title,
  Button,
  Select,
  Option
} from "./styles";
import { ViewCollection } from "../../../../../model/Collection/ViewCollection";
import { ViewMaterials } from "../../../../../model/Material/ViewMaterials";

interface IRegisterBookForm {
  button_text: string;
  handleSubmit(data: RegisterBiblioRequest): void;
}

const CreateBookForm: React.FC<IRegisterBookForm> = ({ button_text, handleSubmit }) => {
  const [newBook, setNewBook] = useState<RegisterBiblioRequest>({} as RegisterBiblioRequest);
  const token = localStorage.getItem("@library_management:token") || "";
  const [collections, setCollections] = useState<ViewCollection[]>([]);
  const [materials, setMaterials] = useState<ViewMaterials[]>([]);

  useEffect(() => {
    api.get('/collection/viewcollections', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => setCollections(response.data.collections))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api.get('/material/viewmaterials', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => setMaterials(response.data.materials))
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setNewBook((prev) => ({
        ...prev,
        [name]: name === 'material_cd' ? Number(value) : value,
      }));
    },
    []
  );

  const handleSwitchChange = useCallback(
    (name: keyof RegisterBiblioRequest) => {
      setNewBook((prev) => ({
        ...prev,
        [name]: !prev[name] as boolean,
      }));
    },
    []
  );

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = ['material_cd', 'collection_cd', 'title', 'author'];
    const missingFields = requiredFields.filter(field => !newBook[field as keyof RegisterBiblioRequest]);

    // const validCollectionCodes = collections.map((c) => c.description);
    // const isValidCollection = validCollectionCodes.includes(newBook.collection_cd);

    // if (!isValidCollection) {
    //   alert("Categoria inválida. Por favor, selecione uma das opções válidas.");
    //   return;
    // }

    if (missingFields.length > 0) {
      console.error("Campos obrigatórios faltando:", missingFields);
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    console.log(newBook);
    // handleSubmit(newBook);
  };

  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>Registrar Livro</Title>

      <Select name="material_cd" value={newBook.material_cd || ''} onChange={handleInputChange}>
        <Option value="">Material *</Option>
        {materials.map((material) => (
          <Option key={material.code} value={material.code}>
            {material.description}
          </Option>
        ))}
      </Select>

      <Select name="collection_cd" value={newBook.collection_cd || ''} onChange={handleInputChange}>
        <Option value="">Categoria *</Option>
        {collections.map((collection) => (
          <Option key={collection.description} value={collection.description}>
            {collection.description}
          </Option>
        ))}
      </Select>

      <Call>
        <InputForm name="call_nmbr1" label="Número de chamada I" placeholder="Número de chamada I" value={newBook.call_nmbr1} onChange={handleInputChange} />
        <InputForm name="call_nmbr2" label="Número de chamada II" placeholder="Número de chamada II" value={newBook.call_nmbr2} onChange={handleInputChange} />
        <InputForm name="call_nmbr3" label="Número de chamada III" placeholder="Número de chamada III" value={newBook.call_nmbr3} onChange={handleInputChange} />
      </Call>

      <InputForm name="title" type="text" label="Título *" placeholder="Título" value={newBook.title} onChange={handleInputChange} />
      <InputForm name="title_remainder" type="text" label="Subtítulo" placeholder="Subtítulo" value={newBook.title_remainder} onChange={handleInputChange} />
      <InputForm name="responsibility_stmt" type="text" label="Declaração de Responsabilidade" placeholder="Declaração de Responsabilidade" value={newBook.responsibility_stmt} onChange={handleInputChange} />
      <InputForm name="author" type="text" label="Autor *" placeholder="Autor" value={newBook.author} onChange={handleInputChange} />

      <InputForm name="topic1" type="text" label="Termo tópico I" placeholder="Digite aqui..." value={newBook.topic1} onChange={handleInputChange} />
      <InputForm name="topic2" type="text" label="Termo tópico II" placeholder="Digite aqui..." value={newBook.topic2} onChange={handleInputChange} />
      <InputForm name="topic3" type="text" label="Termo tópico III" placeholder="Digite aqui..." value={newBook.topic3} onChange={handleInputChange} />
      <InputForm name="topic4" type="text" label="Termo tópico IV" placeholder="Digite aqui..." value={newBook.topic4} onChange={handleInputChange} />
      <InputForm name="topic5" type="text" label="Termo tópico V" placeholder="Digite aqui..." value={newBook.topic5} onChange={handleInputChange} />

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default CreateBookForm;
