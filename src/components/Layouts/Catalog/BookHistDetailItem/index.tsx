import React, { useEffect, useState, type JSX } from 'react';
import useFlashMessage from '../../../../hooks/useFlashMessages';
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
    MemberContent,
    Member,
    ArrowIcon,
    Returned,
    ReturnedText,
    ReturnedContent,
    Due,
    ActionsIcon,
    EmailContainer,
    Count
} from './styles';
import type { ViewHistsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHistRequest';
import api from '../../../../utils/api';
import type { ViewStatusRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest';
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import { LuMailPlus } from "react-icons/lu";

type Field = {
    key: string;
    label: string;
};

interface BookHistViewItemProps {
    items: ViewHistsRequest[];
    fields: Field[];
};

interface NotifyLoanRequestBody {
    first_name: string;
    last_name: string;
    email: string;
    barcode_nmbr: string;
    status_begin_dt: string;
    due_back_dt: string;
    daysLate: number;
    title: string;
    bib_barcode: string;
    hist_id: number;
}

const BookHistDetailItem: React.FC<BookHistViewItemProps> = ({ items, fields }) => {
    const [localItems, setLocalItems] = useState<ViewHistsRequest[]>(items);
    const [codeStatus, setCodeStatus] = useState<ViewStatusRequest[]>([]);
    const token = localStorage.getItem("@library_management:token") || "";
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        setLocalItems(items);
    }, [items]);

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

    const sendEmail = ({ first_name, last_name, email, barcode_nmbr, title, bib_barcode, hist_id, daysLate, status_begin_dt, due_back_dt }: NotifyLoanRequestBody) => {
        api.post('/bibliohist/sendemail', {
            first_name,
            last_name,
            email,
            barcode_nmbr,
            title,
            bib_barcode,
            hist_id,
            daysLate,
            status_begin_dt,
            due_back_dt
        }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            console.log('Sucesso ao enviar e-mail!');
            setLocalItems(prevItems =>
                prevItems.map(item =>
                    item.id === String(hist_id)
                        ? { ...item, emails_sent: (item.emails_sent ?? 0) + 1 }
                        : item
                )
            );
            setFlashMessage('Sucesso ao enviar o e-mail', 'success')!
        })
            .catch((err) => {
                console.error(err);
            });
    };

    const iconMap: Record<string, JSX.Element> = {
        barcode_nmbr: <BarcodeIcon />,
        mbrid: <UsersIcon />,
        status_cd: <InfoIcon />,
        due_back_dt: <RefundIcon />,
        actions: <ActionsIcon />
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
                            <BookInfo to={`/catalog/detail/${item.bibid}`}>
                                <BookTitle>{item.biblio.title}</BookTitle>
                                <p>{item.biblio_copy.barcode_nmbr}</p>
                            </BookInfo>
                            <MemberContent to={`/member/detail/${item.mbrid}`}><ArrowIcon /><Member>{item.member.first_name}</Member></MemberContent>
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
                            {
                                item.status_cd === 'out' && getDaysOverdue(item.due_back_dt) > 0 &&
                                <EmailContainer>
                                    <LuMailPlus title='Enviar cobrança por email' onClick={() => {
                                        sendEmail({
                                            first_name: item.member.first_name ?? '',
                                            last_name: item.member.last_name ?? '',
                                            email: item.member.email ?? '',
                                            barcode_nmbr: item.member.barcode_nmbr ?? '',
                                            title: item.biblio.title ?? '',
                                            bib_barcode: item.biblio_copy.barcode_nmbr ?? '',
                                            hist_id: Number(item.id ?? 0),
                                            daysLate: getDaysOverdue(item.due_back_dt),
                                            status_begin_dt: item.status_begin_dt ?? '',
                                            due_back_dt: item.due_back_dt ?? ''
                                        });
                                    }}
                                    />
                                    {
                                        (item.emails_sent ?? 0) >= 1 &&
                                        <Count>{item.emails_sent}</Count>
                                    }
                                </EmailContainer>
                            }
                        </Item>
                    ))
                    : <p>Nenhum item foi encontrado</p>
            }
        </Container>
    );
};

export default BookHistDetailItem;
