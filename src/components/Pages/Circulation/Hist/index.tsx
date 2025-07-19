import React, { useEffect, useState } from 'react';
import ReturnButton from '../../../Layouts/ReturnButton';
import api from '../../../../utils/api';

import {
    Container,
    FiltersContainer,
    FiltersContent,
    StyledInput
} from './styles';
import type { ViewHistsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHistRequest';
import BookHistDetailItem from '../../../Layouts/Catalog/BookHistDetailItem';

const Hist: React.FC = () => {
    const token = localStorage.getItem("@library_management:token") || "";
    const [bookHist, setBookHist] = useState<ViewHistsRequest[]>();
    const [memberBarcode, setMemberBarcode] = useState<string>();
    const [due, setDue] = useState<'yes' | 'no'>('no');

    const fields = [
        { key: 'barcode_nmbr', label: 'Tombo' },
        { key: 'mbrid', label: 'Membro' },
        { key: 'status_cd', label: 'Status' },
        { key: 'due_back_dt', label: 'Devolução' },
    ];

    useEffect(() => {
        api.get(`/bibliohist/detailhists?member_barcode=${memberBarcode}&due=${due}&limit=100`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setBookHist(response.data.foundHists);
                console.log(response.data.foundHists);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [token, memberBarcode, due]);

    return (
        <Container id="top">
            <ReturnButton />
            <FiltersContainer>
                <FiltersContent>
                    <StyledInput type='number' placeholder='Código de barras do membro' value={memberBarcode} onChange={(e) => {setMemberBarcode(e.target.value)}} />
                </FiltersContent>
                {
                    bookHist ?
                        <BookHistDetailItem fields={fields} items={bookHist} />
                        : <p>Nenhum histórico encontrado.</p>
                }
            </FiltersContainer>
        </Container>
    )
};

export default Hist;