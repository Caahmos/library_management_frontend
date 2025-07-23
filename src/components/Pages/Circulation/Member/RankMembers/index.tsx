import React, { useEffect, useState } from 'react';
import ReturnButton from '../../../../Layouts/ReturnButton';

import {
    ButtonMore,
    Container,
    ListContainer
} from './styles';
import type { MemberRank } from '../../../../../model/Biblio/BiblioReports/MemberRankInterface';
import MemberRankItem from '../../../../Layouts/Circulation/MemberRankItem';
import api from '../../../../../utils/api';
import type { AxiosError } from 'axios';
import MemberRankHeader from '../../../../Layouts/Circulation/MemberRankHeader';
const token = localStorage.getItem("@library_management:token") || "";

const RankMembers: React.FC = () => {
    const [memberRank, setMemberRank] = useState<MemberRank[]>();
    const [limit, setLimit] = useState<number>(30);

    useEffect(() => {
        api.get(`/biblioreports/memberranks?yearsAgo=3&limit=${limit}`)
            .then((response) => {
                console.log(response.data.ranks);
                setMemberRank(response.data.ranks);
            })
            .catch((err: AxiosError) => {
                console.error(err);
            });
    }, [token, limit]);

    const handleLimit = () => {
        setLimit((prev) => prev = prev + 30);
    };

    return (
        <Container>
            <ReturnButton />
            <ListContainer>
                <MemberRankHeader/>
                {
                    memberRank && memberRank.length >= 0
                        ? 
                        memberRank.map(rank => (
                            <MemberRankItem earliestDate={rank.earliestDate} mbrid={rank.mbrid} rank={rank.rank} totalBooksBorrowed={rank.totalBooksBorrowed} />
                        ))
                        : <p>Nenhum rank encontrado!</p>
                }
                <ButtonMore onClick={handleLimit}>Carregar mais</ButtonMore>
            </ListContainer>
        </Container>
    )
};

export default RankMembers;