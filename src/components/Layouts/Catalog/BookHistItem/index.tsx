import React, { useEffect, useState } from 'react';
import {
    Container,
    Header,
    Item,
} from './styles';
import type { ViewHistsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHistRequest';
import api from '../../../../utils/api';
import type { ViewStatusRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest';

type Field = {
    key: string;
    label: string;
};

interface BookHistViewItemProps {
    items: ViewHistsRequest[];
    fields: Field[];
}

const BookHistViewItem: React.FC<BookHistViewItemProps> = ({ items, fields }) => {
    const [codeStatus, setCodeStatus] = useState<ViewStatusRequest[]>([]);
    const token = localStorage.getItem("@library_management:token") || "";
    const formatDate = (date?: string | Date | null) => {
        if (!date) return '-';
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    };

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
            return item.code === code
        })

        return description?.description
    };

    return (
        <Container>
            <Header>
                {
                    fields && fields.length > 0
                        ? fields.map(field => (
                            <p key={field.key}>{field.label}</p>
                        ))
                        : <p>Nenhum cabeçalho para renderizar</p>
                }
            </Header>
            {
                items && items.length > 0
                    ? items.map((item, index) => (
                        <Item key={index}>
                            <p>{item.biblio_copy.barcode_nmbr}</p>
                            <p>{item.member.first_name}</p>
                            <p>{item.status_cd && styledStatusCode(item.status_cd)}</p>
                            <p>{formatDate(item.due_back_dt)}</p>
                        </Item>
                    ))
                    : <p>Nenhum item foi encontrado</p>
            }
        </Container>
    );
};

export default BookHistViewItem;
