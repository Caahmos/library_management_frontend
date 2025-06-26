import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Button,
  Option,
  Select
} from "./styles";
import type { Biblio } from "../../../../../model/Biblio/Biblio/SearchBiblioResponse";
import type { EditBiblioRequest } from "../../../../../model/Biblio/Biblio/EditBiblioRequest";
import InputForm from '../../Input';
import api from "../../../../../utils/api";
import type { ViewCollection } from '../../../../../model/Collection/ViewCollection';
import type { ViewMaterials } from '../../../../../model/Material/ViewMaterials';

interface IRegisterBookForm {
  button_text: string;
  handleSubmit(data: EditBiblioRequest): void;
  biblioData: Biblio;
}

interface MarcField {
  id: number;
  tag: number;
  subfield_cd: string;
  description: string;
  repeatable_flg: boolean;
  required: boolean;
}

export interface BiblioField {
  id: number;
  tag: string;
  subfield_cd: string;
  field_data: string;
}

const FIELD_PRIORITY_MAP: Record<string, keyof Biblio> = {
  "245a": "title",
  "245b": "title_remainder",
  "100a": "author",
  "245c": "responsibility_stmt",
  "650a": "topic1",
  "650b": "topic2",
  "650c": "topic3",
  "650d": "topic4",
  "650e": "topic5"
};

const EditBookForm: React.FC<IRegisterBookForm> = ({ button_text, handleSubmit, biblioData }) => {
  const [localBiblioData, setLocalBiblioData] = useState<Biblio>({ ...biblioData });
  const [subfields, setSubfields] = useState<BiblioField[]>([]);
  const [marcFieldsToRender, setMarcFieldsToRender] = useState<MarcField[]>([]);
  const [collections, setCollections] = useState<ViewCollection[]>([]);
  const [materials, setMaterials] = useState<ViewMaterials[]>([]);

  const token = localStorage.getItem("@library_management:token") || "";

  useEffect(() => {
    api.get('/collection/viewcollections', {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    }).then((res) => setCollections(res.data.collections));

    api.get('/material/viewmaterials', {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    }).then((res) => setMaterials(res.data.materials));
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/marc/viewsubfieldsrequired?required=true', {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        });

        const requiredFields: MarcField[] = res.data.subfields.map((sub: any) => ({
          id: sub.id,
          tag: sub.tag,
          subfield_cd: sub.subfield_cd,
          description: sub.description,
          repeatable_flg: sub.repeatable_flg,
          required: sub.required
        }));

        const sortedMarcFields = [...requiredFields].sort((a, b) => {
          if (a.required === b.required) return 0;
          return a.required ? -1 : 1;
        });

        setMarcFieldsToRender(sortedMarcFields);

        const existingMarcFields: BiblioField[] = biblioData.biblio_field?.map((sub: any) => ({
          id: Number(sub.id),
          tag: String(sub.tag),
          subfield_cd: String(sub.subfield_cd),
          field_data: String(sub.field_data)
        })) || [];

        const filledFields: BiblioField[] = sortedMarcFields.map((field) => {
          const labelKey = `${field.tag}${field.subfield_cd}`;
          const biblioFieldName = FIELD_PRIORITY_MAP[labelKey];
          const valueFromBiblio = biblioFieldName && biblioData[biblioFieldName];
          const foundMarc = existingMarcFields.find(
            (f) => f.tag === String(field.tag) && f.subfield_cd === field.subfield_cd
          );

          return {
            id: field.id,
            tag: String(field.tag),
            subfield_cd: field.subfield_cd,
            field_data: String(valueFromBiblio ?? foundMarc?.field_data ?? "")
          };
        });

        const extraFields = existingMarcFields.filter(
          (f) =>
            !filledFields.find(
              (filled) => filled.tag === f.tag && filled.subfield_cd === f.subfield_cd
            )
        );

        setSubfields([...filledFields, ...extraFields]);
      } catch (err) {
        console.error("Erro ao carregar os campos:", err);
      }
    };

    fetchData();
  }, [biblioData, token]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values: Record<string, string> = {};
    const tags: Record<string, string> = {};
    const subfieldMap: Record<string, string> = {};
    const fieldIds: Record<number, number> = {};
    const requiredFlgs: Record<string, string> = {};
    const indexes: string[] = [];

    subfields.forEach((field, i) => {
      const index = i.toString();
      const key = `${field.tag}${field.subfield_cd}`;
      indexes.push(index);
      values[index] = field.field_data;
      tags[index] = field.tag;
      subfieldMap[index] = field.subfield_cd;
      fieldIds[Number(index)] = field.id;
      const isRequired = marcFieldsToRender.find(
        (f) => String(f.tag) === field.tag && f.subfield_cd === field.subfield_cd
      )?.required;
      requiredFlgs[key] = isRequired ? "1" : "0";
    });

    const payload: EditBiblioRequest = {
      ...localBiblioData,
      values,
      tags,
      subfields: subfieldMap,
      indexes,
      fieldIds,
      requiredFlgs,
    };

    console.log("Enviando:", payload);
    handleSubmit(payload);
  };

  const handleBiblioFieldChange = (key: keyof Biblio, value: string) => {
    setLocalBiblioData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>Editar Livro</Title>

      <Select
        name="material_cd"
        value={localBiblioData.material_cd?.toString() || ""}
        onChange={(e) => handleBiblioFieldChange("material_cd", e.target.value)}
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
        value={localBiblioData.collection_cd?.toString() || ""}
        onChange={(e) => handleBiblioFieldChange("collection_cd", e.target.value)}
        required
      >
        <Option value="">Categoria *</Option>
        {collections.map((collection) => (
          <Option key={collection.code} value={collection.code?.toString()}>
            {collection.description}
          </Option>
        ))}
      </Select>

      <InputForm
        label="Call Number 1 *"
        name="call_nmbr1"
        value={localBiblioData.call_nmbr1 || ''}
        required
        onChange={(e) => handleBiblioFieldChange('call_nmbr1', e.target.value)}
      />

      <InputForm
        label="Call Number 2"
        name="call_nmbr2"
        value={localBiblioData.call_nmbr2 || ''}
        onChange={(e) => handleBiblioFieldChange('call_nmbr2', e.target.value)}
      />

      <InputForm
        label="Call Number 3"
        name="call_nmbr3"
        value={localBiblioData.call_nmbr3 || ''}
        onChange={(e) => handleBiblioFieldChange('call_nmbr3', e.target.value)}
      />

      {subfields.map((field) => {
        const labelKey = `${field.tag}${field.subfield_cd}`;
        const marcField = marcFieldsToRender.find(
          (f) => String(f.tag) === field.tag && f.subfield_cd === field.subfield_cd
        );

        const label = marcField
          ? marcField.required ? `${marcField.description} *` : marcField.description
          : `Campo ${labelKey}`;

        return (
          <div key={labelKey}>
            <InputForm
              label={label}
              name={labelKey}
              value={field.field_data}
              required={marcField?.required || false}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const updatedValue = e.target.value;

                const updatedFields = subfields.map((sub) => {
                  const isTarget =
                    sub.tag === field.tag && sub.subfield_cd === field.subfield_cd;
                  if (!isTarget) return sub;

                  const biblioFieldKey = FIELD_PRIORITY_MAP[labelKey];
                  if (biblioFieldKey) {
                    handleBiblioFieldChange(biblioFieldKey, updatedValue);
                  }

                  return { ...sub, field_data: updatedValue };
                });

                setSubfields(updatedFields);
              }}
            />
          </div>
        );
      })}

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default EditBookForm;
