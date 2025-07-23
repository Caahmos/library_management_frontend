import React, { useState } from 'react';
import {
  Container,
  Title,
  Button,
} from "./styles";

interface ChangeImageBookFormProps {
  button_text: string;
  handleSubmit(imageFile: File): void;
}

const apiUrl = import.meta.env.VITE_API_URL;

const ChangeImageBookForm: React.FC<ChangeImageBookFormProps> = ({ button_text, handleSubmit }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedImage) {
      alert("Selecione uma imagem.");
      return;
    }
    handleSubmit(selectedImage);
  };

  return (
    <Container onSubmit={handleFormSubmit}>
      <Title>Atualizar Imagem</Title>

      <div style={{ marginTop: 16 }}>
        <img
          src={preview || `${apiUrl}/imgs/biblio/semcapa.png`}
          alt="Preview"
          style={{ width: 200, height: 'auto', borderRadius: 8 }}
        />
      </div>
      
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <Button>
        {button_text}
      </Button>

    </Container>
  );
};

export default ChangeImageBookForm;
