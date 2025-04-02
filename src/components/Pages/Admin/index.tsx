import React, { useState, useEffect, useMemo } from "react";
import { TopBooksInterface } from "../../../model/Biblio/BiblioReports/TopBooksInterface";
import { RentalsInterface } from "../../../model/Biblio/BiblioReports/RentalsInterface";
import { FiArrowUpRight } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
    Title
} from './styles';
import BookItem from "../../Layouts/Admin/BookItem";

const Admin: React.FC = () => {
    const [topBooks, setTopBooks] = useState<TopBooksInterface[]>([]);
    const [rentals, setRentals] = useState<RentalsInterface[]>([]);
    const [filteredRentals, setFilteredRentals] = useState<RentalsInterface[]>([]);
    const [selectedYear, setSelectedYear] = useState<number>(2024);
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

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

    const filteredRentalsFunction = useMemo(() => {
        const filtered = rentals.filter((rental) => {

            const rentalYear = rental.month.slice(0, 4);

            console.log(rentalYear);
            return rentalYear === selectedYear.toString();
        });

        console.log('Anos filtrados:', filtered);

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
            <Square1 to={'/admin/adminlist'}>
                <SquareContent>
                    <SquareTitle>Lista de Admins</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight/></SquareSpan>
                </SquareContent>
                <IconAdm />
            </Square1>
            <Square2 to={''}>
                <SquareContent>
                    <SquareTitle>Tipos de Usuários</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight/></SquareSpan>
                </SquareContent>
                <IconUsers />
            </Square2>
            <Square3 to={''}>
                <SquareContent>
                    <SquareTitle>Tipos de Materiais</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight/></SquareSpan>
                </SquareContent>
                <IconBooks />
            </Square3>
            <Square4 to={''}>
                <SquareContent>
                    <SquareTitle>Tipos de Categorias</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight/></SquareSpan>
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
                        <YAxis />
                        <XAxis dataKey="month" color="#F27052" />
                        <Tooltip />
                        <Line type="monotone" dataKey="total_rentals" stroke="#F27052" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </RetangleGrid>
            <ChartGrid1>
                Top Autores
            </ChartGrid1>
            <ChartGrid2>
                Top Categorias
            </ChartGrid2>
            <AsideGrid>
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
            </AsideGrid>
        </Container>
    );
}

export default Admin;
