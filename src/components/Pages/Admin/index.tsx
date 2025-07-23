import React, { useState, useEffect, useMemo } from "react";
import type { TopBooksInterface } from "../../../model/Biblio/BiblioReports/TopBooksInterface";
import type { RentalsInterface } from "../../../model/Biblio/BiblioReports/RentalsInterface";
import { FiArrowUpRight, FiBell, FiBook, FiSettings } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from "../../../utils/api";

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
    Title,
    AsideContent,
    GridContainer,
    Content
} from './styles';
import BookItem from "../../Layouts/Admin/BookItem";
import ButtonAdmin from "../../Layouts/Admin/ButtonAdmin";
import { RiTimerLine } from "react-icons/ri";

const Admin: React.FC = () => {
    const [topBooks, setTopBooks] = useState<TopBooksInterface[]>([]);
    const [rentals, setRentals] = useState<RentalsInterface[]>([]);
    const [filteredRentals, setFilteredRentals] = useState<RentalsInterface[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(2024);
    const token = localStorage.getItem("@library_management:token") || ""

    useEffect(() => {
        api.get('/biblioreports/topbooks', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setTopBooks(response.data.topBooks)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        api.get('/biblioreports/rentals', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setRentals(response.data.rentals)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    useMemo(() => {
        const filtered = rentals.filter((rental) => {

            const rentalYear = rental.month.slice(0, 4);

            return rentalYear === selectedYear.toString();
        });

        setFilteredRentals(filtered)
    }, [rentals, selectedYear]);

    const avaiableYears = useMemo(() => {
        let year = new Set<string>();

        rentals.map((rental) => {
            year.add(rental.month.slice(0, 4));
        });

        return Array.from(year).reverse();
    }, [rentals]);

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(e.target.value));
    };

    return (
        <Container>
            <GridContainer>
                <Square1 to={'/admin/adminlist'}>
                    <SquareContent>
                        <SquareTitle>Lista de Admins</SquareTitle>
                        <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                    </SquareContent>
                    <IconAdm />
                </Square1>
                <Square2 to={'/mbrclassify'}>
                    <SquareContent>
                        <SquareTitle>Tipos de Usuários</SquareTitle>
                        <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                    </SquareContent>
                    <IconUsers />
                </Square2>
                <Square3 to={'/material'}>
                    <SquareContent>
                        <SquareTitle>Tipos de Materiais</SquareTitle>
                        <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                    </SquareContent>
                    <IconBooks />
                </Square3>
                <Square4 to={'/collection'}>
                    <SquareContent>
                        <SquareTitle>Tipos de Categorias</SquareTitle>
                        <SquareSpan>Acessar painel <FiArrowUpRight /></SquareSpan>
                    </SquareContent>
                    <IconCategory />
                </Square4>
                <RetangleGrid>
                    <Header>
                        Estatística de aluguéis
                        <select onChange={handleOnChange} value={selectedYear}>
                            {
                                avaiableYears && avaiableYears.length > 0
                                    ? avaiableYears.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))
                                    : <option>{selectedYear}</option>
                            }
                        </select>
                    </Header>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            height={300}
                            data={filteredRentals}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <YAxis />
                            <XAxis dataKey="month" color="#F27052" />

                            <Line type="monotone" dataKey="total_rentals" stroke="#F27052" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </RetangleGrid>
                <ChartGrid1>
                    <Content>
                        <ButtonAdmin icon={<FiBook/>} link="/circulation/balance" text="Acessar Balanço"/>
                        <ButtonAdmin icon={<RiTimerLine/>} link="/admin/checkoutprivs" text="Gerenciar Limites"/>
                        <ButtonAdmin icon={<FiBell/>} link="/admin/notifications" text="Notificações"/>
                        <ButtonAdmin icon={<FiSettings/>} link="/admin/settings" text="Configurações"/>
                    </Content>
                </ChartGrid1>
                <ChartGrid2>
                    <Content>

                    </Content>
                </ChartGrid2>
                <AsideGrid>
                    <AsideContent>
                        <Title>Mais lidos</Title>
                        {
                            topBooks && topBooks.length > 0 ?
                                topBooks.map((book) => {
                                    return <BookItem bibid={book.bibid} author={book.author} count={book.count} title={book.title} />
                                }) :
                                <>
                                    Nenhum livro encontrado...
                                </>
                        }
                    </AsideContent>
                </AsideGrid>
            </GridContainer>
        </Container>
    );
}

export default Admin;
