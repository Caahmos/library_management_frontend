import React, { type JSX } from 'react';
import {
    Container,
    Header,
    Item,
    InfoIcon,
    RefundIcon,
    BookInfo,
    Due,
    Returned,
    DeleteHold,
    HoldInfo,
    DeleteIcon,
    UsersIcon
} from './styles';
import type { ViewAllHoldsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHoldsRequest';
import { ArrowIcon, Member, MemberContent } from '../BookHistItem/styles';

type Field = {
    key: string;
    label: string;
};

interface BookHistViewItemProps {
    items: ViewAllHoldsRequest[];
    holdFields: Field[];
    onDeleteHold: (mbrid: number, barcode_nmbr: string) => Promise<void>;
}

const BookHoldItems: React.FC<BookHistViewItemProps> = ({ items, holdFields, onDeleteHold }) => {
    const iconMap: Record<string, JSX.Element> = {
        holdid: <InfoIcon />,
        first_name: <UsersIcon />,
        actions: <RefundIcon />,
    };

    return (
        <Container>
            <Header>
                {
                    holdFields && holdFields.length > 0
                        ? holdFields.map(field => (
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
                            <Returned><Due>{item.holdid === 0 ? "Liberado para emprestar!" : item.holdid}</Due></Returned>
                            <BookInfo to={`/catalog/info/${item.bibid}`}>
                                <MemberContent to={`/member/detail/${item.mbrid}`}><ArrowIcon/><Member>{item.member.first_name}</Member></MemberContent>
                            </BookInfo>
                            <HoldInfo>
                                <DeleteHold onClick={() => onDeleteHold(item.mbrid, item.biblio_copy.barcode_nmbr)}><DeleteIcon /> Desistir</DeleteHold>
                            </HoldInfo>
                        </Item>
                    ))
                    : <p>Nenhum item foi encontrado</p>
            }
        </Container>
    );
};

export default BookHoldItems;
