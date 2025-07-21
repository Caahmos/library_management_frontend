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
    Count,
    SpinnerContainer
} from './styles';
import type { ViewHistsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHistRequest';
import api from '../../../../utils/api';
import type { ViewStatusRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest';
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import { LuMailPlus } from "react-icons/lu";
import { SpinnerLoading } from '../../../../utils/SpinnerLoading';

type Field = {
    key: string;
    label: string;
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

interface BookHistViewItemProps {
    loadingItemId: number | null;
    items: ViewHistsRequest[];
    fields: Field[];
    sendEmail: (data: NotifyLoanRequestBody) => void;
}

const BookDetailBlockItem: React.FC<BookHistViewItemProps> = ({ items, fields, sendEmail, loadingItemId }) => {
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

    const iconMap: Record<string, JSX.Element> = {
        barcode_nmbr: <BarcodeIcon />,
        mbrid: <UsersIcon />,
        status_cd: <InfoIcon />,
        due_back_dt: <RefundIcon />,
        actions: <ActionsIcon />
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
                            <BookInfo to={`/catalog/detail/${item.bibid}`}>
                                <BookTitle>{item.biblio.title}</BookTitle>
                                <p>{item.biblio_copy.barcode_nmbr}</p>
                            </BookInfo>
                            <Header>
                                 {iconMap[fields[1].key]} {fields[1].label}
                            </Header>
                            <MemberContent to={`/member/detail/${item.mbrid}`}><ArrowIcon /><Member>{item.member.first_name}</Member></MemberContent>
                            <Header>
                                 {iconMap[fields[2].key]} {fields[2].label}
                            </Header>
                            <p>{item.status_cd && styledStatusCode(item.status_cd)}</p>
                            <Header>
                                 {iconMap[fields[3].key]} {fields[3].label}
                            </Header>
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
                            <Header>
                                 {iconMap[fields[4].key]} {fields[4].label}
                            </Header>
                            {
                                item.status_cd === 'out' && getDaysOverdue(item.due_back_dt) > 0 && (
                                    <EmailContainer>
                                        {
                                            loadingItemId === Number(item.id) ? (
                                                <SpinnerContainer>
                                                    <SpinnerLoading />
                                                </SpinnerContainer>
                                            ) : (
                                                <>
                                                    <LuMailPlus
                                                        title='Enviar cobrança por email'
                                                        onClick={() => sendEmail({
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
                                                        })}
                                                    />
                                                    {
                                                        (item.emails_sent ?? 0) >= 1 &&
                                                        <Count>{item.emails_sent}</Count>
                                                    }
                                                </>
                                            )
                                        }
                                    </EmailContainer>
                                )
                            }
                        </Item>
                    ))
                    : <p>Nenhum item foi encontrado</p>
            }
        </Container>
    );
};

export default BookDetailBlockItem;
