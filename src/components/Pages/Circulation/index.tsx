import React, { useState, useEffect, useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import api from "../../../utils/api";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

import {
    Container,
    GridContainer,
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
    Title,
    AsideContent,
    Seemore
} from './styles';
import type { ViewHistsRequest } from "../../../model/Biblio/BiblioStatusHist/ViewHistRequest";
import BookHistViewItem from "../../Layouts/Catalog/BookHistItem";
import type { ViewMembersRequest } from "../../../model/Member/Member/ViewMembersRequest";
import MemberItem from "../../Layouts/Circulation/MemberItem";
import { Filters } from "../../Layouts/Filter/styles";
import Filter from "../../Layouts/Filter";

export interface StatusCount {
    status: string;
    count: number;
}

export interface BookBalance {
    total: number;
    statusCounts: StatusCount[];
}

export interface MemberBalance {
    total: number;
    blocked: number;
    active: number;
    recent: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#F27052', '#d62a2a', '#A28DFF', '#00B3AD'];

const Circulation: React.FC = () => {
    const [bookHist, setBookHist] = useState<ViewHistsRequest[]>();
    const [booksBalance, setBooksBalance] = useState<BookBalance>();
    const [membersBalance, setMembersBalance] = useState<MemberBalance>();
    const [members, setMembers] = useState<ViewMembersRequest[]>();
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
            const el = document.getElementById("top");
            el?.scrollIntoView({ behavior: "smooth" });
        }, []);

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
        api.get(`/biblioreports/booksbalance`, {
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

    useEffect(() => {
        api.get(`/biblioreports/membersbalance`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setMembersBalance(response.data.balance);
                console.log(response.data.balance);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [token]);
    
    useEffect(() => {
        api.get(`/member/viewmembers?limit=15&sort=desc`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setMembers(response.data.members);
                console.log(response.data.members);
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

    const memberChartData = useMemo(() => {
        if (!membersBalance) return [];

        return [
            { name: 'Total', qtd: membersBalance.total },
            { name: 'Bloqueados', qtd: membersBalance.blocked },
            { name: 'Ativos', qtd: membersBalance.active },
            { name: 'Recentes', qtd: membersBalance.recent },
        ];
    }, [membersBalance]);

    return (
        <Container id="top">
            <GridContainer>
                <Square1 to={'/circulation/checkin'}>
                    <SquareContent>
                        <SquareTitle>Check-in</SquareTitle>
                        <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                    </SquareContent>
                    <IconAdm />
                </Square1>
                <Square2 to={'/member/findmember'}>
                    <SquareContent>
                        <SquareTitle>Buscar Membro</SquareTitle>
                        <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                    </SquareContent>
                    <IconUsers />
                </Square2>
                <Square3 to={'/member/register'}>
                    <SquareContent>
                        <SquareTitle>Adicionar Membro</SquareTitle>
                        <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                    </SquareContent>
                    <IconBooks />
                </Square3>
                <Square4 to={'/member/blocked'}>
                    <SquareContent>
                        <SquareTitle>Membros Bloqueados</SquareTitle>
                        <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                    </SquareContent>
                    <IconCategory />
                </Square4>
                <RetangleGrid>
                    <Header>
                        <p>Aluguéis Atrasados</p>
                        <Seemore to={`/circulation/viewhist?due=yes`}>VER MAIS</Seemore>
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
                    <Header>Balanço Membros</Header>
                    {memberChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={memberChartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="qtd" fill="#F27052" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p>Carregando gráfico...</p>
                    )}
                </ChartGrid2>
                <AsideGrid>
                    <AsideContent>
                        <Header>Membros Recentes</Header>
                         {
                        members && members.length > 0 ?
                            members.map((member) => {
                                return <MemberItem mbrid={member.mbrid} first_name={member.first_name} barcode_nmbr={member.barcode_nmbr} imageUrl={member.imageUrl}/>
                            }) :
                            <>
                                Nenhum membro encontrado...
                            </>
                    }
                    </AsideContent>
                </AsideGrid>
            </GridContainer>
        </Container>
    );
}

export default Circulation;
