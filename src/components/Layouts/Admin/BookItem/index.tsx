import React from "react";
import { TopBooksInterface } from "../../../../model/Biblio/BiblioReports/TopBooksInterface";
import { IoIosArrowForward } from "react-icons/io";

import {
    Container,
    Count,
    Info,
    Content,
    Rank,
    Title,
    Author,
} from './styles';

const BookItem: React.FC<TopBooksInterface> = ({ author, bibid, count, title }) => {
    return (
        <Container to={`/catalog/detail/${bibid}`}>
            <Content>
                <Count>
                    <Rank>{count}</Rank>
                </Count>
                <Info>
                    <Title>{title}</Title>
                    <Author>{author}</Author>
                </Info>
            </Content>
            <IoIosArrowForward />
        </Container>
    )
}

export default BookItem;