import React, { useEffect, useState } from 'react';
import ReturnButton from '../../../Layouts/ReturnButton';
import api from '../../../../utils/api';

import {
    Clean,
    ClearFiltersIcon,
    Container,
    DataContent,
    FiltersContainer,
    FiltersContent,
    Option,
    Select
} from './styles';
import { Header } from '../styles';
import type { ViewStatusRequest } from '../../../../model/Biblio/BiblioStatusHist/ViewStatusRequest';
import useFlashMessage from '../../../../hooks/useFlashMessages';
import type { DetailedItem } from '../../../../model/Biblio/BiblioStatusHist/DetailedBalance';
import DetailedBalanceItem from '../../../Layouts/Circulation/DetailedBalanceItem';
import type { ViewCollection } from '../../../../model/Collection/ViewCollection';
import { exportToExcel } from '../../../Utils/handleExportToXLSX';
import { RiFileExcel2Line } from "react-icons/ri";
import DetailedBalanceBlockItem from '../../../Layouts/Circulation/DetailedBalanceBlockItem';

const Balance: React.FC = () => {
    const token = localStorage.getItem("@library_management:token") || "";
    const [originalBalance, setOriginalBalance] = useState<DetailedItem[]>([]);
    const [codeStatus, setCodeStatus] = useState<ViewStatusRequest[]>([]);
    const [statusCode, setStatusCode] = useState<string>("out");
    const [statusCount, setStatusCount] = useState<number>(0);
    const [collections, setCollections] = useState<ViewCollection[]>([]);
    const [collectionCode, setCollectionCode] = useState<number>();
    const { setFlashMessage } = useFlashMessage();

    const fields = [
        { key: 'title', label: 'Título' },
        { key: 'category', label: 'Categoria' },
        { key: 'status_cd', label: 'Status' },
        { key: 'barcode_nmbr', label: 'Tombo' },
    ];

    useEffect(() => {
        api.get('/collection/viewcollections', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setCollections(response.data.collections);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        if (!token) return;

        const url = statusCode
            ? `/biblioreports/detailedbalance?status_cd=${statusCode}`
            : `/biblioreports/detailedbalance`;

        api.get(url, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setOriginalBalance(response.data.balance.detailed);
                setStatusCount(response.data.balance.statusCount);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [token, statusCode]);

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
    }, [token]);

    const removeFilters = () => {
        setStatusCode("out");
        setCollectionCode(0);
    };

    const handleExportToXLSX = () => {
        if (filteredItems.length === 0) {
            setFlashMessage("Nenhum dado para exportar", "error");
            return;
        }

        const formattedItems = filteredItems.map(item => ({
            title: item.biblio?.title || '',
            category: item.biblio?.collection?.description || '',
            status_cd: item.status_cd,
            barcode_nmbr: item.barcode_nmbr,
        }));

        exportToExcel(formattedItems, fields, 'acervo-detalhado.xlsx');
    };

    const filteredItems = originalBalance.filter(item => {
        const matchesStatus = statusCode ? item.status_cd === statusCode : true;
        const matchesCollection = collectionCode
            ? item.biblio?.collection?.description === collections.find(c => c.code === collectionCode)?.description
            : true;
        return matchesStatus && matchesCollection;
    });

    return (
        <Container id="top">
            <ReturnButton />
            <FiltersContainer>
                <FiltersContent>
                    <Header>Filtrar por:</Header>

                    <Select value={statusCode} onChange={(e) => setStatusCode(e.target.value)}>
                        <Option value="">Todos os status</Option>
                        {codeStatus?.map((status) => (
                            <Option key={status.code} value={status.code}>
                                {status.description}
                            </Option>
                        ))}
                    </Select>

                    <Select
                        value={collectionCode}
                        onChange={(e) => setCollectionCode(Number(e.target.value))}
                    >
                        <Option value="">Categoria</Option>
                        {collections?.map((collection) => (
                            <Option key={collection.code} value={collection.code}>
                                {collection.description}
                            </Option>
                        ))}
                    </Select>
                    <Clean onClick={handleExportToXLSX}>
                        <RiFileExcel2Line />
                        <span>Exportar para Excel</span>
                    </Clean>

                    <Clean onClick={removeFilters}>
                        <ClearFiltersIcon title='Remover filtros' />
                        <span>Limpar Filtros</span>
                    </Clean>
                </FiltersContent>

                <DataContent>
                    <Header>Histórico detalhado: {statusCount && (<p>({statusCount} itens encontrados)</p>)}</Header>
                    {filteredItems.length > 0 ? (
                        <>
                            <DetailedBalanceItem fields={fields} items={filteredItems} />
                            <DetailedBalanceBlockItem fields={fields} items={filteredItems} />
                        </>
                    ) : (
                        <p>Nenhum histórico encontrado.</p>
                    )}
                </DataContent>
            </FiltersContainer>
        </Container>
    );
};

export default Balance;
