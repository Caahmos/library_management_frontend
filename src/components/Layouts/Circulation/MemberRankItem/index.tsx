import React, { useEffect, useState } from "react";
import type { TopBooksInterface } from "../../../../model/Biblio/BiblioReports/TopBooksInterface";
import { IoIosArrowForward } from "react-icons/io";

import {
    Container,
    Count,
    Info,
    Content,
    Image,
    Title,
    Author,
    FingerprintIcon,
    Points
} from './styles';

import type { MemberRank } from "../../../../model/Biblio/BiblioReports/MemberRankInterface";
import type { ViewMembersRequest } from "../../../../model/Member/Member/ViewMembersRequest";
import BookEmpty from "../../../../utils/BookModel";

import api from "../../../../utils/api";
import type { AxiosError } from 'axios';

import gold_rank from '../../../../assets/ranks/gold_rank.png';
import diamond_rank from '../../../../assets/ranks/diamond_rank.png';
import silver_rank from '../../../../assets/ranks/silver_rank.png';
import bronze_rank from '../../../../assets/ranks/bronze_rank.png';
import outlined_rank from '../../../../assets/ranks/outlined_rank.svg';

const token = localStorage.getItem("@library_management:token") || "";

const MemberRankItem: React.FC<MemberRank> = ({ earliestDate, mbrid, rank, totalBooksBorrowed }) => {
    const [member, setMember] = useState<ViewMembersRequest>();

    const topRanks = [
        {
            rank: 1,
            img: diamond_rank,
            color: '#5EF1FF'
        },
        {
            rank: 2,
            img: gold_rank,
            color: '#FED030'
        },
        {
            rank: 3,
            img: silver_rank,
            color: '#E3E7E9'
        },
        {
            rank: 4,
            img: bronze_rank,
            color: '#E49050'
        }
    ];

    const currentRank = topRanks.find((r) => r.rank === rank);

    const imagemFormatada = member?.imageUrl
        ? `http://localhost:5000/imgs/member/${member.imageUrl}`
        : undefined;

    useEffect(() => {
        api.get(`/member/basicdetail/${mbrid}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                const memberData = response.data.member;
                setMember(memberData);
            })
            .catch((err: AxiosError) => {
                console.error(err);
            });
    }, [mbrid]);

    return (
        member && (
            <Container rankColor={currentRank?.color} key={mbrid}>
                <Content>
                    <Count>
                        {currentRank?.img
                            ? <img src={currentRank.img} width={70} />
                            : <BookEmpty rank={rank}/>}
                    </Count>
                    <Count>
                        <Image image={imagemFormatada} />
                    </Count>
                    <Info>
                        <Title>{member.first_name}</Title>
                        <Author><FingerprintIcon /> {member.barcode_nmbr}</Author>
                    </Info>
                </Content>
                <Points>{totalBooksBorrowed}0 XP</Points>
            </Container>
        )
    );
};

export default MemberRankItem;
