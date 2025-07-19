import React, { useEffect, useState } from "react";
import type { TopBooksInterface } from "../../../../model/Biblio/BiblioReports/TopBooksInterface";
import { IoIosArrowForward } from "react-icons/io";

import {
    Container,
    MemberContainer,
    MemberContent,
    MemberText,
    MemberImage,
    RankText,
    InfoRank,
    RanksContainer
} from './styles';

import type { MemberRank } from "../../../../model/Biblio/BiblioReports/MemberRankInterface";
import type { ViewMembersRequest } from "../../../../model/Member/Member/ViewMembersRequest";
import BookEmpty from "../../../../utils/BookModel";

import api from "../../../../utils/api";
import type { AxiosError } from 'axios';

import gold_rank from '../../../../../public/ranks/gold_rank.png';
import diamond_rank from '../../../../../public/ranks/diamond_rank.png';
import silver_rank from '../../../../../public/ranks/silver_rank.png';
import bronze_rank from '../../../../../public/ranks/bronze_rank.png';
import outlined_rank from '../../../../../public/ranks/outlined_rank.svg';

const token = localStorage.getItem("@library_management:token") || "";

const MemberRankHeader: React.FC = () => {
    const [member, setMember] = useState<ViewMembersRequest[]>([]);
    const [topRank, setTopRank] = useState<MemberRank[]>([]);

    useEffect(() => {
        api.get(`/biblioreports/memberranks?yearsAgo=3&limit=${3}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setTopRank(response.data.ranks);
                findMembers(response.data.ranks);

            })
            .catch((err: AxiosError) => {
                console.error(err);
            });
    }, [token]);

    const findMembers = (ranks: MemberRank[]) => {
        const uniqueMbrids = [...new Set(ranks.map(rank => rank.mbrid))];

        uniqueMbrids.forEach((mbrid) => {
            api.get(`/member/basicdetail/${mbrid}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
                .then((response) => {
                    const memberData = response.data.member;

                    setMember(prev => {
                        const alreadyExists = prev?.some(m => m.barcode_nmbr === memberData.barcode_nmbr);
                        if (alreadyExists) return prev;

                        return [...(prev || []), memberData];
                    });
                })
                .catch((err: AxiosError) => {
                    console.error(err);
                });
        });
    };

    const topRanks = [
        {
            rank: 1,
            img: diamond_rank,
            color: '#5EF1FF',
            order: 2
        },
        {
            rank: 2,
            img: gold_rank,
            color: '#FED030',
            order: 1
        },
        {
            rank: 3,
            img: silver_rank,
            color: '#E3E7E9',
            order: 3
        },
        {
            rank: 4,
            img: bronze_rank,
            color: '#E49050',
            order: 4
        }
    ];

    const editImage = (img: string | undefined) => {
        return img
            ? `http://localhost:5000/imgs/member/${img}`
            : undefined;
    }

    return (
        <Container>
            <RanksContainer>
                {
                    member && member.length == 3 &&
                    (
                        <>
                            {
                                member.map((member, i) => (
                                    <MemberContainer $order={topRanks[i].order}>
                                        <MemberContent $img={topRanks[i].img}>
                                            <MemberImage $img={editImage(member.imageUrl)}/>
                                        </MemberContent>
                                        <MemberText>{member.first_name + ' ' + member.last_name}</MemberText>
                                        <RankText>{topRank[i].rank}º lugar</RankText>
                                    </MemberContainer>
                                ))
                            }
                        </>
                    )
                }
            </RanksContainer>
            <InfoRank>O XP do ranking é calculado com base na quantidade de livros lidos e na data em que o check-in foi feito.</InfoRank>
        </Container>
    );
};

export default MemberRankHeader;
