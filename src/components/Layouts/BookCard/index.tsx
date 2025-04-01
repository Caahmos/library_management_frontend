import {
  Container,
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

const BookCard: React.FC<BookCard> = ({img, title, author, rank, id}) => {

  const imagemFormatada = `http://localhost:5000/imgs/biblio/${img}`;

  return (
    <Container to={`/catalog/biblio/detail/${id}`}>
      <ImageBook img={imagemFormatada}/>
      <Title>{title}</Title>
      <Author>por: <span>{author}</span></Author>
      <Rating>rank {rank}<FaStar/></Rating>
    </Container>
  );
}

export default BookCard;