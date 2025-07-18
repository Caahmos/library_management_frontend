import React, { useEffect, useState } from 'react';
import ReturnButton from '../../../../Layouts/ReturnButton';

import {
    Container,
    ListContainer
} from './styles';
import type { MemberRank } from '../../../../../model/Biblio/BiblioReports/MemberRankInterface';
import MemberRankItem from '../../../../Layouts/Circulation/MemberRankItem';
import api from '../../../../../utils/api';
import type { AxiosError } from 'axios';
const token = localStorage.getItem("@library_management:token") || "";

const RankMembers: React.FC = () => {
    const [memberRank, setMemberRank] = useState<MemberRank[]>();
    const [limit, setLimit] = useState<number>(30);

    useEffect(() => {
        api.get(`/biblioreports/memberranks?yearsAgo=3&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                console.log(response.data.ranks);
                setMemberRank(response.data.ranks);
            })
            .catch((err: AxiosError) => {
                console.error(err);
            });
    }, [token, limit]);

    return (
        <Container>
            <ReturnButton />
            <ListContainer>
                {
                    memberRank && memberRank.length >= 0
                        ? memberRank.map(rank => (
                            <MemberRankItem earliestDate={rank.earliestDate} mbrid={rank.mbrid} rank={rank.rank} totalBooksBorrowed={rank.totalBooksBorrowed} />
                        ))
                        : <p>Nenhum rank encontrado!</p>
                }
            </ListContainer>
        </Container>
    )
};

export default RankMembers;