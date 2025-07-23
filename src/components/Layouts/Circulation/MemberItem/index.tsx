import React from "react";
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
import type { ViewMembersRequest } from "../../../../model/Member/Member/ViewMembersRequest";

const MemberItem: React.FC<ViewMembersRequest> = ({ first_name, barcode_nmbr, mbrid, imageUrl  }) => {
    const imagemFormatada = imageUrl
        ? `http://localhost:5000/imgs/member/${imageUrl}`
        : undefined;

    return (
        <Container to={`/member/detail/${mbrid}`} key={mbrid}>
            <Content>
                <Count>
                    <Image image={imagemFormatada}/>
                </Count>
                <Info>
                    <Title>{first_name}</Title>
                    <Author><FingerprintIcon/> {barcode_nmbr}</Author>
                </Info>
            </Content>
            <IoIosArrowForward />
        </Container>
    )
}

export default MemberItem;