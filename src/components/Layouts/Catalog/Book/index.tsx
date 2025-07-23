import React from 'react';
import {
  Container,
  Content,
  Circle,
  Info,
  Image,
  Title,
  Author,
  Rating
} from './styles';

import { FaStar } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useAuth } from '../../../../hooks/useAuth';

interface BookCard {
  id: number;
  img?: string;
  title: string;
  author: string;
  rank?: number;
  order: 'block' | 'inline';
}

const Book: React.FC<BookCard> = ({ img, title, author, rank, id }) => {
  const { userData } = useAuth();
  const defaultImage = 'http://localhost:5000/imgs/biblio/semcapa.png';
  const imagemFormatada = img
    ? `http://localhost:5000/imgs/biblio/${img}`
    : defaultImage;

  const imageSrc = imagemFormatada;

  return (
    <Container>
      {userData?.admin_flg && (
        <Circle to={`/catalog/info/${id}`}>
          <MdEdit title="Editar livro" />
        </Circle>
      )}

      <Content to={`/catalog/detail/${id}`}>
        <Info>
          <Image image={imageSrc}/>
          <Title>{title}</Title>
          <Author>
            por: <span>{author}</span>
          </Author>
        </Info>
        <Rating>
          rank {rank}
          <FaStar />
        </Rating>
      </Content>
    </Container>
  );
};

export default Book;
