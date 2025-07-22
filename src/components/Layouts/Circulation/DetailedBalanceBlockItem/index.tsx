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

const DetailedBalanceBlockItem: React.FC<BookHistViewItemProps> = ({ items, fields }) => {
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
            {
                localItems && localItems.length > 0
                    ? localItems.map((item, index) => (
                        <Item key={index}>
                            <Header>
                                {iconMap[fields[0].key]} {fields[0].label}
                            </Header>
                            <BookInfo>
                                <BookTitle>{item.biblio.title}</BookTitle>
                            </BookInfo>
                            <Header>
                                {iconMap[fields[1].key]} {fields[1].label}
                            </Header>
                            <BookInfo>
                                <BookTitle>{item.biblio.collection.description}</BookTitle>
                            </BookInfo>
                            <Header>
                                {iconMap[fields[2].key]} {fields[2].label}
                            </Header>
                            <BookInfo>
                                <BookTitle>{item.status_cd && styledStatusCode(item.status_cd)}</BookTitle>
                            </BookInfo>
                            <Header>
                                {iconMap[fields[3].key]} {fields[3].label}
                            </Header>
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

export default DetailedBalanceBlockItem;
