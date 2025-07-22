import React, { useEffect, useState, type JSX } from 'react';
import {
    Container,
    Header,
    Item,
    BarcodeIcon,
    InfoIcon,
    RefundIcon,
    UsersIcon,
    BookInfo,
    BookTitle,
} from './styles';
import api from '../../../../utils/api';
import type { ViewStatusRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest';
import type { DetailedItem } from '../../../../model/Biblio/BiblioStatusHist/DetailedBalance';

type Field = {
    key: string;
    label: string;
};

interface BookHistViewItemProps {
    items: DetailedItem[];
    fields: Field[];
}

const DetailedBalanceItem: React.FC<BookHistViewItemProps> = ({ items, fields }) => {
    const [localItems, setLocalItems] = useState<DetailedItem[]>(items);
    const [codeStatus, setCodeStatus] = useState<ViewStatusRequest[]>([]);
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        setLocalItems(items);
    }, [items]);

    useEffect(() => {
        api.get(`/bibliohist/viewstatus`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setCodeStatus(response.data.statusDescription);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const styledStatusCode = (code: string) => {
        const description = codeStatus.find((item) => {
            return item.code === code;
        });

        return description?.description;
    };

    const iconMap: Record<string, JSX.Element> = {
        barcode_nmbr: <BarcodeIcon />,
        title: <UsersIcon />,
        status_cd: <InfoIcon />,
        category: <RefundIcon />,
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
                localItems && localItems.length > 0
                    ? localItems.map((item, index) => (
                        <Item key={index}>
                            <BookInfo>
                                <BookTitle>{item.biblio.title}</BookTitle>
                            </BookInfo>
                            <BookInfo>
                                <BookTitle>{item.biblio.collection.description}</BookTitle>
                            </BookInfo>
                            <p>{item.status_cd && styledStatusCode(item.status_cd)}</p>
                            <BookInfo>
                                <BookTitle>{item.barcode_nmbr}</BookTitle>
                            </BookInfo>
                        </Item>
                    ))
                    : <p>Nenhum item foi encontrado</p>
            }
        </Container>
    );
};

export default DetailedBalanceItem;
