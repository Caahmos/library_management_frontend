import React, { useEffect, useState } from 'react';
import ReturnButton from '../../../Layouts/ReturnButton';
import { useSearchParams } from "react-router-dom";
import api from '../../../../utils/api';

import {
    ButtonMore,
    Check,
    CheckContainer,
    CheckLabel,
    Clean,
    ClearFiltersIcon,
    Container,
    DataContent,
    FiltersContainer,
    FiltersContent,
    Option,
    Select,
    StyledInput
} from './styles';
import type { ViewHistsRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewHistRequest';
import BookHistDetailItem from '../../../Layouts/Catalog/BookHistDetailItem';
import { Header } from '../styles';
import type { ViewStatusRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest';
import useFlashMessage from '../../../../hooks/useFlashMessages';
import BookDetailBlockItem from '../../../Layouts/Catalog/BookDetailBlockItem';

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

const Hist: React.FC = () => {
    const token = localStorage.getItem("@library_management:token") || "";
    const [bookHist, setBookHist] = useState<ViewHistsRequest[]>();
    const [memberBarcode, setMemberBarcode] = useState<string>();
    const [copyBarcode, setCopyBarcode] = useState<string>();
    const [bibId, setBibId] = useState<string | null>();
    const [codeStatus, setCodeStatus] = useState<ViewStatusRequest[]>([]);
    const [statusCode, setStatusCode] = useState<string>("");
    const [limit, setLimit] = useState<number>(50);
    const [due, setDue] = useState<string>('no');
    const [searchParams, setSearchParams] = useSearchParams();
    const [hasInitialized, setHasInitialized] = useState(false);
    const [loadingItemId, setLoadingItemId] = useState<number | null>(null);
    const { setFlashMessage } = useFlashMessage();

    const fields = [
        { key: 'barcode_nmbr', label: 'Tombo' },
        { key: 'mbrid', label: 'Membro' },
        { key: 'status_cd', label: 'Status' },
        { key: 'due_back_dt', label: 'Devolução' },
        { key: 'actions', label: 'Ações' },
    ];

    useEffect(() => {
        if (!hasInitialized) {
            setMemberBarcode(searchParams.get("member_barcode") || "");
            setCopyBarcode(searchParams.get("copy_barcode") || "");
            setDue(searchParams.get("due") || "no");
            setBibId(searchParams.get("bibid") || "");
            setHasInitialized(true);
        }
    }, [searchParams, hasInitialized]);

    useEffect(() => {
        if (!hasInitialized) return;

        const params = new URLSearchParams();

        if (memberBarcode?.trim()) params.append("member_barcode", memberBarcode);
        if (copyBarcode?.trim()) params.append("copy_barcode", copyBarcode);
        if (bibId?.trim()) params.append("bibid", bibId);
        if (statusCode?.trim()) params.append("status_cd", statusCode);
        if (limit) params.append("limit", String(limit));
        if (due) params.append("due", due);

        api.get(`/bibliohist/detailhists?${params.toString()}`, {
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
    }, [token, memberBarcode, copyBarcode, bibId, statusCode, due, limit, hasInitialized]);

    useEffect(() => {
        api.get(`/bibliohist/viewstatus`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                console.log(response.data.statusDescription);
                setCodeStatus(response.data.statusDescription);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [token]);

    const handleLimit = () => {
        setLimit((prev) => prev = prev + 30);
    };

    const sendEmail = (data: NotifyLoanRequestBody) => {
        setLoadingItemId(data.hist_id);

        api.post('/bibliohist/sendemail', data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then(() => {
            setFlashMessage('Sucesso ao enviar o e-mail', 'success')!;
        }).catch((err) => {
            console.error(err);
            setFlashMessage('Erro ao enviar o e-mail', 'error')!;
        }).finally(() => {
            setLoadingItemId(null);

            const params = new URLSearchParams();
            if (memberBarcode?.trim()) params.append("member_barcode", memberBarcode);
            if (copyBarcode?.trim()) params.append("copy_barcode", copyBarcode);
            if (bibId?.trim()) params.append("bibid", bibId);
            if (statusCode?.trim()) params.append("status_cd", statusCode);
            if (limit) params.append("limit", String(limit));
            if (due) params.append("due", due);

            api.get(`/bibliohist/detailhists?${params.toString()}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
                .then((response) => {
                    setBookHist(response.data.foundHists);
                })
                .catch(console.error);
        });
    };

    const removeFilters = () => {
        setMemberBarcode("");
        setCopyBarcode("");
        setBibId("");
        setStatusCode("");
        setDue("no");
        setLimit(50);

        setSearchParams({});
    };

    return (
        <Container id="top">
            <ReturnButton />
            <FiltersContainer>
                <FiltersContent>
                    <Header>Filtrar por:</Header>
                    <StyledInput type='text' placeholder='Tombo' value={copyBarcode} onChange={(e) => { setCopyBarcode(e.target.value) }} />
                    <StyledInput type='text' placeholder='Código de barras do membro' value={memberBarcode} onChange={(e) => { setMemberBarcode(e.target.value) }} />
                    <Select value={statusCode} onChange={(e) => setStatusCode(e.target.value)} disabled={due === 'yes'}>
                        <Option value="">Todos os status</Option>
                        {codeStatus?.map((status) => (
                            <Option key={status.code} value={status.code}>
                                {status.description}
                            </Option>
                        ))}
                    </Select>
                    <CheckContainer>
                        <Check
                            id='adue'
                            type='checkbox'
                            checked={due === 'yes'}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setDue(checked ? 'yes' : 'no');
                                if (checked) {
                                    setStatusCode('out');
                                }
                            }}
                        />
                        <CheckLabel htmlFor='adue'>Atrasados</CheckLabel>
                    </CheckContainer>
                    <Clean onClick={removeFilters}>
                        <ClearFiltersIcon title='Remover filtros' />
                        <span>Limpar Filtros</span>
                    </Clean>
                </FiltersContent>
                <DataContent>
                    <Header>
                        Histórico detalhado:
                    </Header>
                    {
                        bookHist ?
                            <>
                                <BookDetailBlockItem
                                    fields={fields}
                                    items={bookHist}
                                    sendEmail={sendEmail}
                                    loadingItemId={loadingItemId}
                                />
                                <BookHistDetailItem
                                    fields={fields}
                                    items={bookHist}
                                    sendEmail={sendEmail}
                                    loadingItemId={loadingItemId}
                                />
                            </>
                            : <p>Nenhum histórico encontrado.</p>
                    }
                    <ButtonMore onClick={handleLimit}>Carregar mais</ButtonMore>
                </DataContent>
            </FiltersContainer>
        </Container>
    )
};

export default Hist;