import React, { useState, FormEvent, ChangeEvent } from "react";
import { Container, Title, Button } from "./styles";
import InputForm from "../../Input";
import SwitchComponent from "../../SwitchComponent";

type FieldType = 'text' | 'switch';

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
  onSubmit(data: Partial<T>): void;
  onDelete?(): void;
}

function GenericEditForm<T extends Record<string, any>>({
  title,
  fields,
  data,
  button_text,
  onSubmit,
  onDelete,
}: GenericEditFormProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const key = name as keyof T;
    const originalValue = data[key];

    setFormData((prev) => {
      if (value === String(originalValue)) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }
      return { ...prev, [key]: value };
    });

    console.log(formData);
  };

  const handleSwitchChange = (name: keyof T) => {
    const originalValue = !!data[name];
    const newValue = !(formData[name] ?? originalValue);

    setFormData((prev) => {
      if (newValue === originalValue) {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      }
      return { ...prev, [name]: newValue };
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
  };

  return (
    <Container onSubmit={handleFormSubmit}>
      <Title>{title}</Title>

      {fields.map((field) =>
        field.type === "text" ? (
          <InputForm
            key={String(field.name)}
            name={String(field.name)}
            label={field.label}
            placeholder={field.placeholder}
            value={
              formData[field.name] !== undefined
                ? String(formData[field.name])
                : String(data[field.name] ?? "")
            }
            onChange={handleInputChange}
          />
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
        <Button type="button" style={{ backgroundColor: "#D9534F" }} onClick={onDelete}>
          Excluir
        </Button>
      )}
    </Container>
  );
}

export default GenericEditForm;
