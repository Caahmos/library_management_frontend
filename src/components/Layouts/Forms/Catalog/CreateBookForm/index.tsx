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

interface MarcField {
  id: number;
  tag: number;
  subfield_cd: string;
  description: string;
  repeatable_flg: boolean;
  required: boolean;
}

const CreateBookForm: React.FC<IRegisterBookForm> = ({ button_text, handleSubmit }) => {
  const [newBook, setNewBook] = useState<RegisterBiblioRequest>({
    material_cd: '',
    collection_cd: '',
    call_nmbr1: '',
    call_nmbr2: '',
    call_nmbr3: '',
    values: {},
    indexes: [],
    tags: {},
    subfields: {},
    fieldIds: {},
    requiredFlgs: {}
  });

  const [marcFieldsToRender, setMarcFieldsToRender] = useState<MarcField[]>([]);
  const token = localStorage.getItem("@library_management:token") || "";
  const [collections, setCollections] = useState<ViewCollection[]>([]);
  const [materials, setMaterials] = useState<ViewMaterials[]>([]);

  useEffect(() => {
    api.get('/collection/viewcollections', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => setCollections(res.data.collections));

    api.get('/material/viewmaterials', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => setMaterials(res.data.materials));
  }, [token]);

  useEffect(() => {
    api.get('/marc/viewsubfieldsrequired?required=true', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((res) => {
      const fields = res.data.subfields.map((sub: any) => ({
        id: sub.id,
        tag: sub.tag,
        subfield_cd: sub.subfield_cd,
        description: sub.description,
        repeatable_flg: sub.repeatable_flg,
        required: sub.required
      }));
      setMarcFieldsToRender(fields);
    }).catch((err) => console.error("Erro ao buscar subcampos:", err));
  }, [token]);

  const handleInputChange = useCallback((inputName: string, value: string) => {
    setNewBook(prev => {
      if (
        inputName === 'material_cd' ||
        inputName === 'collection_cd' ||
        inputName === 'call_nmbr1' ||
        inputName === 'call_nmbr2' ||
        inputName === 'call_nmbr3'
      ) {
        return { ...prev, [inputName]: value };
      }

      const field = marcFieldsToRender.find(f =>
        `${f.tag}${f.subfield_cd}` === inputName
      );
      if (!field) return prev;

      const labelKey = `${field.tag}${field.subfield_cd}`;

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
          [labelKey]: String(field.tag)
        },
        subfields: {
          ...prev.subfields,
          [labelKey]: field.subfield_cd
        },
        fieldIds: {
          ...prev.fieldIds,
          [labelKey]: `${field.tag}${field.subfield_cd}_${field.id}`
        },
        requiredFlgs: {
          ...prev.requiredFlgs,
          [labelKey]: field.required ? "1" : ""
        }
      };
    });
  }, [marcFieldsToRender]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newBook.material_cd || !newBook.collection_cd || !newBook.call_nmbr1) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const missingRequiredMarcFields = marcFieldsToRender
      .filter(field => field.required)
      .filter(field => {
        const labelKey = `${field.tag}${field.subfield_cd}`;
        return !newBook.values?.[labelKey];
      });

    if (missingRequiredMarcFields.length > 0) {
      const missingFieldsNames = missingRequiredMarcFields.map(f => f.description);
      alert(`Por favor, preencha os campos obrigatórios: ${missingFieldsNames.join(", ")}`);
      return;
    }

    console.log(newBook);
    handleSubmit(newBook);
  };

  // Ordenar para que obrigatórios venham primeiro
  const sortedMarcFields = [...marcFieldsToRender].sort((a, b) => {
    if (a.required === b.required) return 0;
    return a.required ? -1 : 1;
  });

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
          <Option key={collection.description} value={collection.code?.toString()}>
            {collection.description}
          </Option>
        ))}
      </Select>

      <InputForm
        label="Call Number 1 *"
        name="call_nmbr1"
        value={newBook.call_nmbr1 || ''}
        required
        onChange={(e) => handleInputChange('call_nmbr1', e.target.value)}
      />

      <InputForm
        label="Call Number 2"
        name="call_nmbr2"
        value={newBook.call_nmbr2 || ''}
        onChange={(e) => handleInputChange('call_nmbr2', e.target.value)}
      />

      <InputForm
        label="Call Number 3"
        name="call_nmbr3"
        value={newBook.call_nmbr3 || ''}
        onChange={(e) => handleInputChange('call_nmbr3', e.target.value)}
      />

      {sortedMarcFields.map((field) => {
        const labelKey = `${field.tag}${field.subfield_cd}`;
        return (
          <div key={labelKey}>
            <InputForm
              label={field.required ? `${field.description} *` : field.description}
              name={labelKey}
              value={newBook.values?.[labelKey] || ''}
              required={field.required}
              onChange={(e) => handleInputChange(labelKey, e.target.value)}
            />
          </div>
        );
      })}

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default CreateBookForm;
