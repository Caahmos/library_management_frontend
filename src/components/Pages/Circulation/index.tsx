import React, { useState, useEffect, useMemo } from "react";
import { FiArrowUpRight } from "react-icons/fi";
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

const Circulation: React.FC = () => {
    return (
        <Container>
            <Square1 to={'/circulation/checkin'}>
                <SquareContent>
                    <SquareTitle>Check-in</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight/></SquareSpan>
                </SquareContent>
                <IconAdm />
            </Square1>
            <Square2 to={'/circulation/findmember'}>
                <SquareContent>
                    <SquareTitle>Buscar Membro</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight/></SquareSpan>
                </SquareContent>
                <IconUsers />
            </Square2>
            <Square3 to={'/circulation/registermember'}>
                <SquareContent>
                    <SquareTitle>Adicionar Membro</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight/></SquareSpan>
                </SquareContent>
                <IconBooks />
            </Square3>
            <Square4 to={'/collection'}>
                <SquareContent>
                    <SquareTitle>Membros Bloqueados</SquareTitle>
                    <SquareSpan>Acessar painel <FiArrowUpRight/></SquareSpan>
                </SquareContent>
                <IconCategory />
            </Square4>
            <RetangleGrid>
                <Header>
                    
                </Header>
            </RetangleGrid>
            <ChartGrid1>
                Top Autores
            </ChartGrid1>
            <ChartGrid2>
                Top Categorias
            </ChartGrid2>
            <AsideGrid>
                <Title>Mais lidos</Title>
                
            </AsideGrid>
        </Container>
    );
}

export default Circulation;
