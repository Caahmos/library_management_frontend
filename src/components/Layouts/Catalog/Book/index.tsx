import {
  Container,
  Content,
  Circle,
  Info,
  ImageBook,
  Title,
  Author,
  Rating
} from './styles';

import { FaStar } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

interface BookCard {
  id: number;
  img?: string;
  title: string;
  author: string;
  rank?: number;
  order: 'block' | 'inline';
}

const Book: React.FC<BookCard> = ({ img, title, author, rank, id, order }) => {

  const imagemFormatada = `http://localhost:5000/imgs/biblio/${img}`;

  return (
    <Container>
      <Circle to={`/catalog/editbook/${id}`}>
        <MdEdit title='Editar livro' />
      </Circle>
      <Content to={`/catalog/detail/${id}`}>
        <Info>
          <ImageBook src={imagemFormatada} />
          <Title>{title}</Title>
          <Author>por: <span>{author}</span></Author>
        </Info>
        <Rating>rank {rank}<FaStar /></Rating>
      </Content>
    </Container>
  );
}

export default Book;