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
    DaysLate,
    DueDate,
    HistDate,
    IconLink,
    IconGroup,
    Renewal
} from './styles';
import type { ViewHistsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHistRequest';
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import { TbBookUpload } from "react-icons/tb";
import { MdOutlineAutorenew } from "react-icons/md";

type Field = {
    key: string;
    label: string;
};

interface BookHistViewItemProps {
    items: ViewHistsRequest[];
    fields: Field[];
    onRenewal: (barcode_nmbr: string) => void;
}

const BookOutItem: React.FC<BookHistViewItemProps> = ({ items, fields, onRenewal }) => {
    const iconMap: Record<string, JSX.Element> = {
        barcode_nmbr: <BarcodeIcon />,
        due_back_dt: <InfoIcon />,
        actions: <RefundIcon />,
    };

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
                                    {
                                        item.returned_at
                                            ?
                                            <Returned><FiCheck style={{ color: 'green' }} /><Due>{formatDate(item.returned_at)}</Due></Returned>
                                            :
                                            <Due>{formatDate(item.due_back_dt)}</Due>
                                    }
                                </>
                            }
                            <IconGroup>
                                <IconLink to={`/circulation/checkin?barcode_nmbr=${item.biblio_copy.barcode_nmbr}`}><TbBookUpload/> Devolver</IconLink>
                                <Renewal onClick={() => { item.biblio_copy.barcode_nmbr && onRenewal(item.biblio_copy.barcode_nmbr) }}><MdOutlineAutorenew/> Renovar</Renewal>
                            </IconGroup>
                        </Item>
                    ))
                    : <p>Nenhum item foi encontrado</p>
            }
        </Container>
    );
};

export default BookOutItem;
