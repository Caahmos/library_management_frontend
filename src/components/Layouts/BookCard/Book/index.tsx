import React, { useState, useEffect } from 'react';
import {
  Container,
  Info,
  Image as ImageEdit,
  Title,
  Author,
  Rating
} from './styles';

import { FaStar } from "react-icons/fa6";
import CategoryTag from '../CategoryTag';

interface BookCard {
  id: number;
  img?: string;
  title: string;
  author: string;
  rank?: number;
  category?: string;
  colors?: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const Book: React.FC<BookCard> = ({ img, title, author, rank, id, category, colors }) => {
  let color1 = colors?.split(',')[0] || null;
  let color2 = colors?.split(',')[1] || null;

  console.log(color1, color2);

  const defaultImage = `${apiUrl}/imgs/biblio/semcapa.png`;
  const formattedImage = img
    ? `${apiUrl}/imgs/biblio/${img}`
    : defaultImage;

  const [imageSrc, setImageSrc] = useState(defaultImage);

  useEffect(() => {
    if (img) {
      const imgLoader = new Image();
      imgLoader.src = formattedImage;
      imgLoader.onload = () => setImageSrc(formattedImage);
      imgLoader.onerror = () => setImageSrc(defaultImage);
    }
  }, [img]);

  return (
    <Container to={`/catalog/detail/${id}`}>
      <ImageEdit image={imageSrc} />
      <Info>
        <Title>{title}</Title>
        <Author>por: <span>{author}</span></Author>
        {category && <CategoryTag description={category} color1={color1} color2={color2} />}
        <Rating>
          rank {rank}
          <FaStar />
        </Rating>
      </Info>
    </Container>
  );
};

export default Book;
