import { useState, useCallback } from "react";
import type {FormEvent, ChangeEvent} from 'react';
import { Container, Title, Button, DeleteButton } from "./styles";
import InputForm from "../../Input";
import SwitchComponent from "../../SwitchComponent";

type FieldType = "text" | "switch" | "number" | "file";

type Field<T> = {
  name: keyof T;
  label: string;
  type: FieldType;
  placeholder?: string;
};

interface GenericEditFormProps<T> {
  title: string;
  fields: Field<T>[];
  data: T;
  button_text: string;
  img?: string;
  onSubmit(data: Partial<T> | FormData): void;
  onDelete?(): void;
  isCreate?: boolean;
}

const apiUrl = import.meta.env.VITE_API_URL;

function GenericForm<T extends Record<string, any>>({
  title,
  fields,
  data,
  button_text,
  img,
  onSubmit,
  onDelete,
  isCreate = false,
}: GenericEditFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>({});
  const [fileData, setFileData] = useState<Record<string, File>>({});
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});

  const hasFileField = fields.some((field) => field.type === "file");

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type, files } = e.target as HTMLInputElement;
      const key = name as keyof T;

      if (type === "file" && files && files.length > 0) {
        const file = files[0];
        setFileData((prev) => ({ ...prev, [key]: file }));

        if (file.type.startsWith("image/")) {
          const previewUrl = URL.createObjectURL(file);
          setPreviewImages((prev) => ({ ...prev, [key]: previewUrl }));
        }

        return;
      }

      const originalValue = data[key];
      const newValue = type === "number" ? Number(value) || 0 : value;

      setFormData((prev) => {
        if (!isCreate && newValue === originalValue) {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        }
        return { ...prev, [key]: newValue };
      });
    },
    [data, isCreate]
  );

  const handleSwitchChange = useCallback(
    (name: keyof T) => {
      const originalValue = !!data[name];
      const newValue = !(formData[name] ?? originalValue);

      setFormData((prev) => {
        if (!isCreate && newValue === originalValue) {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        }
        return { ...prev, [name]: newValue };
      });
    },
    [data, formData, isCreate]
  );

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasFileField) {
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value));
      });

      Object.entries(fileData).forEach(([key, file]) => {
        formDataToSend.append(key, file);
      });

      onSubmit(formDataToSend);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <Container onSubmit={handleFormSubmit}>
      <Title>{title}</Title>

      {fields.map((field) =>
        field.type === "text" || field.type === "number" ? (
          <InputForm
            key={String(field.name)}
            name={String(field.name)}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            value={
              formData[field.name] !== undefined
                ? String(formData[field.name])
                : String(data[field.name] ?? "")
            }
            onChange={handleInputChange}
          />
        ) : field.type === "file" ? (
          <div key={String(field.name)}>
            <InputForm
              name={String(field.name)}
              label={field.label}
              placeholder={field.placeholder}
              type="file"
              onChange={handleInputChange}
            />
            {previewImages[field.name as string] || img && (
              <img
                src={previewImages[field.name as string] || `${apiUrl}/imgs/material/${img}`}
                alt="Pré-visualização"
                style={{ maxWidth: "200px", marginTop: "10px", borderRadius: "8px" }}
              />
            )}
          </div>
        ) : (
          <SwitchComponent
            key={String(field.name)}
            labelLeft={field.label}
            checked={
              formData[field.name] !== undefined
                ? !!formData[field.name]
                : !!data[field.name]
            }
            onChange={() => handleSwitchChange(field.name)}
          />
        )
      )}

      <Button type="submit">{button_text}</Button>

      {onDelete && (
        <DeleteButton type="button" onClick={onDelete}>
          Excluir
        </DeleteButton>
      )}
    </Container>
  );
}

export default GenericForm;
