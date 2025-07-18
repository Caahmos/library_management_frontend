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
    FingerprintIcon
} from './styles';
import type { MemberRank } from "../../../../model/Biblio/BiblioReports/MemberRankInterface";
import type { ViewMembersRequest } from "../../../../model/Member/Member/ViewMembersRequest";
import api from "../../../../utils/api";
import type { AxiosError } from 'axios';
const token = localStorage.getItem("@library_management:token") || "";

const MemberRankItem: React.FC<MemberRank> = ({ earliestDate, mbrid, rank, totalBooksBorrowed }) => {
    const [member, setMember] = useState<ViewMembersRequest>();


    const imagemFormatada = member?.imageUrl
        ? `http://localhost:5000/imgs/member/${member.imageUrl}`
        : undefined;

    useEffect(() => {
            api.get(`/member/detail/${mbrid}`, {
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
        }, [token, mbrid]);

    return (
        member &&
        <Container to={`/member/detail/${mbrid}`} key={mbrid}>
            <Content>
                <Count>
                    <Image image={imagemFormatada} />
                </Count>
                <Info>
                    <Title>{member.first_name}</Title>
                    <Author><FingerprintIcon /> {member.barcode_nmbr}</Author>
                </Info>
            </Content>
            <IoIosArrowForward />
        </Container>
    )
}

export default MemberRankItem;