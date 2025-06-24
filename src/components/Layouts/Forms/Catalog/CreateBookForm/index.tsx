import React, { useState, useCallback, useEffect } from "react";
import InputForm from "../../Input/index";
import type { RegisterBiblioRequest } from "../../../../../model/Biblio/Biblio/RegisterBiblioRequest";
import api from "../../../../../utils/api";

import {
  Container,
  Title,
  Button,
  Select,
  Option
} from "./styles";
import type { ViewCollection } from "../../../../../model/Collection/ViewCollection";
import type { ViewMaterials } from "../../../../../model/Material/ViewMaterials";

interface IRegisterBookForm {
  button_text: string;
  handleSubmit(data: RegisterBiblioRequest): void;
}

const CreateBookForm: React.FC<IRegisterBookForm> = ({ button_text, handleSubmit }) => {
  const [newBook, setNewBook] = useState<RegisterBiblioRequest>({
    material_cd: '',
    collection_cd: '',
    values: {},
    indexes: [],
    tags: {},
    subfields: {},
    fieldIds: {},
    requiredFlgs: {}
  });

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
  }, [token]);

  useEffect(() => {
    api.get('/material/viewmaterials', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => setMaterials(response.data.materials))
      .catch((err) => console.error(err));
  }, [token]);

  const handleInputChange = useCallback((inputName: string, value: string) => {
    setNewBook(prev => {
      
      if (inputName === 'material_cd' || inputName === 'collection_cd') {
        return {
          ...prev,
          [inputName]: value
        };
      }

      
      const field = marcFieldsToRender.find(f => f.inputName === inputName);
      if (!field) return prev;

      console.log(newBook)
      const labelKey = `${field.tag}${field.subfield}`;
      
      return {
        ...prev,
        values: {
          ...prev.values,
          [labelKey]: value
        },
        indexes: prev.indexes.includes(labelKey) 
          ? prev.indexes 
          : [...prev.indexes, labelKey],
        tags: {
          ...prev.tags,
          [labelKey]: field.tag
        },
        subfields: {
          ...prev.subfields,
          [labelKey]: field.subfield
        },
        fieldIds: {
          ...prev.fieldIds,
          [labelKey]: field.fieldId || ""
        },
        requiredFlgs: {
          ...prev.requiredFlgs,
          [labelKey]: field.required ? "1" : ""
        }
      };
    });
  }, []);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar campos obrigatórios principais
    if (!newBook.material_cd || !newBook.collection_cd) {
      alert("Por favor, selecione o Material e a Categoria.");
      return;
    }

    // Verificar campos MARC obrigatórios
    const missingRequiredMarcFields = marcFieldsToRender
      .filter(field => field.required)
      .filter(field => {
        const labelKey = `${field.tag}${field.subfield}`;
        return !newBook.values?.[labelKey];
      });

    if (missingRequiredMarcFields.length > 0) {
      const missingFieldsNames = missingRequiredMarcFields.map(f => f.description);
      alert(`Por favor, preencha os campos obrigatórios: ${missingFieldsNames.join(", ")}`);
      return;
    }

    console.log("Dados enviados:", newBook);
    handleSubmit(newBook);
  };

  const marcFieldsToRender = [
    {
      tag: "245",
      subfield: "a",
      labelKey: "245a",
      required: true,
      description: "Título",
      value: "",
      inputName: "245a",
      fieldId: "245a_1"
    },
    {
      tag: "245",
      subfield: "b",
      labelKey: "245b",
      required: false,
      description: "Subtítulo",
      value: "",
      inputName: "245b",
      fieldId: "245b_1"
    },
    {
      tag: "245",
      subfield: "c",
      labelKey: "245c",
      required: false,
      description: "Responsabilidade pelo título",
      value: "",
      inputName: "245c",
      fieldId: "245c_1"
    },
    {
      tag: "100",
      subfield: "a",
      labelKey: "100a",
      required: true,
      description: "Autor",
      value: "",
      inputName: "100a",
      fieldId: "100a_1"
    },
    // ... (restante dos campos MARC permanecem iguais)
  ];
  
  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>Registrar Livro</Title>

      <Select 
        name="material_cd" 
        value={newBook.material_cd} 
        onChange={(e) => handleInputChange('material_cd', e.target.value)}
        required
      >
        <Option value="">Material *</Option>
        {materials.map((material) => (
          <Option key={material.code} value={material.code.toString()}>
            {material.description}
          </Option>
        ))}
      </Select>

      <Select 
        name="collection_cd" 
        value={newBook.collection_cd} 
        onChange={(e) => handleInputChange('collection_cd', e.target.value)}
        required
      >
        <Option value="">Categoria *</Option>
        {collections.map((collection) => (
          <Option key={collection.description} value={collection.description}>
            {collection.description}
          </Option>
        ))}
      </Select>

      {marcFieldsToRender.map((field) => {
        const labelKey = `${field.tag}${field.subfield}`;
        
        return (
          <div key={field.inputName}>
            <InputForm
              label={field.description}
              name={field.inputName}
              value={newBook.values?.[labelKey] || ''}
              required={field.required}
              onChange={(e) => handleInputChange(field.inputName, e.target.value)}
            />
          </div>
        );
      })}

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default CreateBookForm;