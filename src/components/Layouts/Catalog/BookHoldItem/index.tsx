import React, { type JSX } from 'react';
import {
    Container,
    Header,
    Item,
    BarcodeIcon,
    InfoIcon,
    RefundIcon,
    BookInfo,
    BookTitle,
    Due,
    Returned,
    DeleteHold,
    HoldInfo,
    DeleteIcon
} from './styles';
import type { ViewHoldsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHoldsRequest';

type Field = {
    key: string;
    label: string;
};

interface BookHistViewItemProps {
    items: ViewHoldsRequest[];
    fields: Field[];
    onDelete(barcode_nmbr: string): void;
}

const BookHoldItem: React.FC<BookHistViewItemProps> = ({ items, fields, onDelete }) => {
    const iconMap: Record<string, JSX.Element> = {
        barcode_nmbr: <BarcodeIcon />,
        position: <InfoIcon />,
        actions: <RefundIcon />,
    };

    return (
        <Container>
            <Header>
                {
                    fields && fields.length > 0
                        ? fields.map(field => (
                            <p key={field.key} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                {iconMap[field.key]} {field.label}
                            </p>
                        ))
                        : <p>Nenhum cabeçalho para renderizar</p>
                }
            </Header>
            {
                items && items.length > 0
                    ? items.map((item, index) => (
                        <Item key={index}>
                            <Returned><Due>{item.holdid}</Due></Returned>
                            <BookInfo to={`/catalog/info/${item.bibid}`}>
                                <BookTitle>{item.biblio.title}</BookTitle>
                                <p>{item.biblio_copy.barcode_nmbr}</p>
                            </BookInfo>
                            <HoldInfo>
                                <DeleteHold onClick={() => {onDelete(item.biblio_copy.barcode_nmbr)}}><DeleteIcon /> Desistir</DeleteHold>
                            </HoldInfo>
                        </Item>
                    ))
                    : <p>Nenhum item foi encontrado</p>
            }
        </Container>
    );
};

export default BookHoldItem;
