import React from "react";
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
} from './styles';
import type { ViewMembersRequest } from "../../../../model/Member/Member/ViewMembersRequest";

const MemberItem: React.FC<ViewMembersRequest> = ({ first_name, barcode_nmbr, mbrid  }) => {
    return (
        <Container to={`/member/detail/${mbrid}`} key={mbrid}>
            <Content>
                <Count>
                    <Image></Image>
                </Count>
                <Info>
                    <Title>{first_name}</Title>
                    <Author>{barcode_nmbr}</Author>
                </Info>
            </Content>
            <IoIosArrowForward />
        </Container>
    )
}

export default MemberItem;