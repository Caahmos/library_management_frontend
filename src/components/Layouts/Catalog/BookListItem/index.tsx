import React from "react";
import { ListBooksInterface, TopBooksInterface } from "../../../../model/Biblio/BiblioReports/TopBooksInterface";
import { IoIosArrowForward } from "react-icons/io";

import {
    Container,
    Info,
    Content,
    Rank,
    Title,
    Author,
} from './styles';

const BookListItem: React.FC<ListBooksInterface> = ({ author, bibid, title }) => {
    return (
        <Container to={`/catalog/detail/${bibid}`} key={bibid}>
            <Content>
                <Info>
                    <Title>{title}</Title>
                    <Author>{author}</Author>
                </Info>
            </Content>
            <IoIosArrowForward />
        </Container>
    )
}

export default BookListItem;