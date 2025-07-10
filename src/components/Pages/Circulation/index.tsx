import React, { useState, useEffect, useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import api from "../../../utils/api";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

import {
    Container,
    Header,
    Square1,
    Square2,
    Square3,
    Square4,
    RetangleGrid,
    SquareTitle,
    SquareSpan,
    SquareContent,
    ChartGrid1,
    ChartGrid2,
    AsideGrid,
    IconAdm,
    IconUsers,
    IconBooks,
    IconCategory,
    Title
} from './styles';
import type { ViewHistsRequest } from "../../../model/Biblio/BiblioStatusHist/ViewHistRequest";
import BookHistViewItem from "../../Layouts/Catalog/BookHistItem";

export interface StatusCount {
    status: string;
    count: number;
}

export interface BookBalance {
    total: number;
    statusCounts: StatusCount[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#A28DFF', '#00B3AD'];

const Circulation: React.FC = () => {
    const [bookHist, setBookHist] = useState<ViewHistsRequest[]>();
    const [booksBalance, setBooksBalance] = useState<BookBalance>();
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get(`/bibliohist/viewhists?due=yes&limit=100`, {
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
    }, [token]);

    useEffect(() => {
        api.get(`/biblioreports/balance`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setBooksBalance(response.data.balance);
                console.log(response.data.balance);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [token]);

    const fields = [
        { key: 'barcode_nmbr', label: 'Tombo' },
        { key: 'mbrid', label: 'Membro' },
        { key: 'status_cd', label: 'Status' },
        { key: 'due_back_dt', label: 'Devolução' },
    ];

    return (
        <Container>
            <Square1 to={'/circulation/checkin'}>
                <SquareContent>
                    <SquareTitle>Check-in</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                </SquareContent>
                <IconAdm />
            </Square1>
            <Square2 to={'/circulation/findmember'}>
                <SquareContent>
                    <SquareTitle>Buscar Membro</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                </SquareContent>
                <IconUsers />
            </Square2>
            <Square3 to={'/circulation/registermember'}>
                <SquareContent>
                    <SquareTitle>Adicionar Membro</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                </SquareContent>
                <IconBooks />
            </Square3>
            <Square4 to={'/collection'}>
                <SquareContent>
                    <SquareTitle>Membros Bloqueados</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                </SquareContent>
                <IconCategory />
            </Square4>
            <RetangleGrid>
                <Header>
                    Aluguéis Atrasados
                </Header>
                {
                    bookHist ?
                        <BookHistViewItem fields={fields} items={bookHist} />
                        : <p>Nenhum histórico encontrado.</p>
                }
            </RetangleGrid>
            <ChartGrid1>
                <Header>Balanço de Livros</Header>
                {booksBalance?.statusCounts ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={booksBalance.statusCounts}
                                dataKey="count"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                labelLine={false}
                            >
                                {booksBalance.statusCounts.map((entry, index) => (
                                    <Cell key={`cell-${entry.status}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: any, name: any, props: any) => {
                                const translations: Record<string, string> = {
                                    in: "Disponível",
                                    out: "Emprestado",
                                    hld: "Reservado",
                                    dis: "Danificado",
                                    lst: "Perdido",
                                    ord: "Encomendado",
                                    crt: "Corrigido"
                                };
                                
                                const label = translations[props.payload.status] || props.payload.status;
                               
                                return [`${value}`, label];
                            }} />
                            <Legend
                                layout="horizontal"
                                verticalAlign="bottom"
                                align="center"
                                formatter={(value: any, entry: any) => {
                                    const translations: Record<string, string> = {
                                        in: "Disponível",
                                        out: "Emprestado",
                                        hld: "Reservado",
                                        dis: "Danificado",
                                        lst: "Perdido",
                                        ord: "Encomendado",
                                        crt: "Corrigido"
                                    };

                                    const label = translations[value] || value;
                                    const count = entry?.payload?.count ?? 0;

                                    return `${label} (${count})`;
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p>Carregando gráfico...</p>
                )}
            </ChartGrid1>
            <ChartGrid2>
                Balanço Membros
            </ChartGrid2>
            <AsideGrid>
                <Title>Membros Recentes</Title>

            </AsideGrid>
        </Container>
    );
}

export default Circulation;
