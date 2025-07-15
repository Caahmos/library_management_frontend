import React, { useState } from "react";
import { Container, Title, Button, StyledInput, Content } from "./styles";

interface CirculationFormProps {
  button_text: string;
  onSubmit: (barcode_nmbr: string) => void;
}

const CirculationForm: React.FC<CirculationFormProps> = ({ button_text, onSubmit }) => {
  const [barcode, setBarcode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode.trim()) return;
    console.log(barcode.trim());
    onSubmit(barcode.trim());
    setBarcode("");
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Title>Fazer Empréstimo</Title>

      <Content>
        <StyledInput
          type="text"
          placeholder="Digite o código de barras da cópia"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          required
        />

        <Button type="submit">{button_text || "Registrar Empréstimo"}</Button>
      </Content>
    </Container>
  );
};

export default CirculationForm;
