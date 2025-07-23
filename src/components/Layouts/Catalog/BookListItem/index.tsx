import React from "react";
import type { ListBooksInterface } from "../../../../model/Biblio/BiblioReports/TopBooksInterface";
import { IoIosArrowForward } from "react-icons/io";

import {
    Container,
    Info,
    Content,
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