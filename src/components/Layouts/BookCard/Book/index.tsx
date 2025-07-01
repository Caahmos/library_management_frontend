import React, { useState, useEffect } from 'react';
import {
  Container,
  Info,
  Image as ImageEdit,
  ImageBook,
  Title,
  Author,
  Rating
} from './styles';

import { FaStar } from "react-icons/fa6";

interface BookCard {
  id: number;
  img?: string;
  title: string;
  author: string;
  rank?: number;
}

const Book: React.FC<BookCard> = ({ img, title, author, rank, id }) => {
  const defaultImage = 'http://localhost:5000/imgs/biblio/semcapa.png';
  const formattedImage = img
    ? `http://localhost:5000/imgs/biblio/${img}`
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
      <ImageEdit image={imageSrc}/>
      <Info>
        <Title>{title}</Title>
        <Author>por: <span>{author}</span></Author>
        <Rating>
          rank {rank}
          <FaStar />
        </Rating>
      </Info>
    </Container>
  );
};

export default Book;
