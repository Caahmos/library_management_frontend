import React from 'react';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { useHandleSearch } from '../../../hooks/useHandleSearch';

import { 
    Container,
    Title,
    Img,
    Info,
    Button,
    Author,
    Rating
} from './styles';

interface BookCard {
    id: number;
    img?: string;
    title: string;
    author: string;
    rank?: number;
  }

const apiUrl = import.meta.env.VITE_API_URL;

const BookSearch: React.FC<BookCard> = ({title, author, id, img, rank}) => {
    const { close } = useHandleSearch();

    const imagemFormatada = `${apiUrl}/imgs/biblio/${img}`;

    return (
        <Container key={id} to={`/catalog/detail/${id}`} onClick={() => { close() }}>
            <Img src={imagemFormatada}/>
            <Info>
                <Title> {title}</Title>  
                <Author>por: <span>{author}</span></Author>
                <Rating>rank {rank}<FaStar/></Rating>
            </Info>    
            <Button>
                <FaArrowUpRightFromSquare/>
            </Button>       
        </Container>
    )
};

export default BookSearch;