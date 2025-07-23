import React, { type JSX } from 'react';
import {
    Container,
    Header,
    Item,
    DueDate,
    HistDate,
    DaysLate,
    BarcodeIcon,
    InfoIcon,
    RefundIcon,
    UsersIcon,
    BookInfo,
    BookTitle,
    Due,
    Returned,
    DeleteHold,
    HoldText,
    HoldInfo,
    DeleteIcon,
    ReturnedText,
    ReturnedContent
} from './styles';
import type { ViewHistsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHistRequest';
import { FiAlertTriangle } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";

type Field = {
    key: string;
    label: string;
};

interface BookHistViewItemProps {
    onDelete(barcode_nmbr: string): void;
    items: ViewHistsRequest[];
    fields: Field[];
}

const MiniBookHistItem: React.FC<BookHistViewItemProps> = ({ items, fields, onDelete }) => {

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

    const iconMap: Record<string, JSX.Element> = {
        barcode_nmbr: <BarcodeIcon />,
        mbrid: <UsersIcon />,
        status_cd: <InfoIcon />,
        due_back_dt: <RefundIcon />,
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
                            <BookInfo to={`/catalog/info/${item.bibid}`}>
                                <BookTitle>{item.biblio.title}</BookTitle>
                                <p>{item.biblio_copy.barcode_nmbr}</p>
                            </BookInfo>
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
                                <>
                                    {item.status_cd === 'hld' && item.biblio_copy.barcode_nmbr
                                        ?
                                        <HoldInfo>
                                            <HoldText>Sua vez de alugar!</HoldText>
                                            <DeleteHold onClick={() => {onDelete(item.biblio_copy.barcode_nmbr as string)}}><DeleteIcon/> Desistir</DeleteHold>
                                        </HoldInfo>
                                        :
                                        item.returned_at
                                            ?
                                            <Returned>
                                                <ReturnedText>Devolvido em:</ReturnedText>
                                                <ReturnedContent>
                                                    <FiCheck style={{ color: 'green' }} /><Due $in='yes'>{formatDate(item.returned_at)}</Due>
                                                </ReturnedContent>
                                            </Returned>
                                            :
                                            <Due $in='no'>{formatDate(item.due_back_dt)}</Due>
                                    }
                                </>
                            }
                        </Item>
                    ))
                    : <p>Nenhum item foi encontrado</p>
            }
        </Container>
    );
};

export default MiniBookHistItem;
