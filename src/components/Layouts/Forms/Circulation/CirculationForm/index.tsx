import React, { useState } from "react";
import { Container, Title, Button, StyledInput, Content } from "./styles";
import type { ViewHistsRequest } from "../../../../../model/Biblio/BiblioStatusHist/ViewHistRequest";
import type { ViewHoldsRequest } from "../../../../../model/Biblio/BiblioStatusHist/ViewHoldsRequest";
import BookHoldItem from "../../../Catalog/BookHoldItem";
import BookOutItem from "../../../Catalog/BookOutItem";

interface BaseProps {
  button_text: string;
  booksHist?: ViewHistsRequest[];
  holdsHist?: ViewHoldsRequest[];
  onSubmit: (barcode_nmbr: string) => void;
}

interface HldProps extends BaseProps {
  type: 'hld';
  onDeleteHold: (barcode_nmbr: string) => void;
  onRenewal?: never
}

interface OutProps extends BaseProps {
  type: 'out';
  onDeleteHold?: never;
  onRenewal: (barcode_nmbr: string) => void;
}

type CirculationFormProps = HldProps | OutProps;

const CirculationForm: React.FC<CirculationFormProps> = ({ button_text, onSubmit, type, booksHist, holdsHist, onDeleteHold, onRenewal }) => {
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
      <Title>{type === 'out' ? 'Fazer um empréstimo' : 'Deixar em espera'}</Title>

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
      <Title>
        {type === 'out' ? 'Livros emprestados' : 'Livros em espera'}
      </Title>

      {
        type === 'hld' && holdsHist && holdsHist.length > 0 && <BookHoldItem fields={[
          { key: 'position', label: 'Posição' },
          { key: 'barcode_nmbr', label: 'Tombo' },
          { key: 'actions', label: 'Ações' },
        ]} items={holdsHist} onDelete={(barcode) => {
          onDeleteHold(barcode);
        }} />
      }

      {
        type === 'out' && booksHist && booksHist.length > 0 && <BookOutItem fields={[
          { key: 'barcode_nmbr', label: 'Tombo' },
          { key: 'due_back_dt', label: 'Devolução' },
          { key: 'actions', label: 'Ações' },
        ]} items={booksHist} onRenewal={(barcode) => {
          onRenewal(barcode);
        }}/>
      }
    </Container>
  );
};

export default CirculationForm;
