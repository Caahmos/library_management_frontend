import React, { useEffect, useState } from 'react';
import {
    Container,
    Header,
    Item,
    DueDate,
    HistDate,
    DaysLate
} from './styles';
import type { ViewHistsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHistRequest';
import api from '../../../../utils/api';
import type { ViewStatusRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest';
import { FiAlertTriangle } from "react-icons/fi";

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

    const isOverdue = (dueDateStr?: string | Date | null) => {
        if (!dueDateStr) return false;
        const dueDate = new Date(dueDateStr);
        const today = new Date();
        dueDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return dueDate < today;
    };

    const getDaysOverdue = (dueDateStr?: string | Date | null) => {
        if (!dueDateStr) return 0;
        const dueDate = new Date(dueDateStr);
        const today = new Date();
        const diffTime = today.getTime() - dueDate.getTime();
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
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
            return item.code === code;
        });

        return description?.description;
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
                            {item.status_cd === 'out' && isOverdue(item.due_back_dt)
                                ? (

                                    <DueDate overdue={item.status_cd === 'out' && isOverdue(item.due_back_dt)}>
                                        <HistDate> 
                                            <FiAlertTriangle /> { } {formatDate(item.due_back_dt)}
                                        </HistDate>
                                        <DaysLate>
                                            ({getDaysOverdue(item.due_back_dt)} dias atrasado)
                                        </DaysLate>
                                    </DueDate>

                                )
                                :
                                formatDate(item.due_back_dt)
                            }
                        </Item>
                    ))
                    : <p>Nenhum item foi encontrado</p>
            }
        </Container>
    );
};

export default BookHistViewItem;
