import React from 'react';
import { SeeStaffs } from '../../../../model/Staff/RegisterStaffRequest';
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

import {
    Container,
    FirstName,
    LastName,
    Username,
    Circ,
    UpdMember,
    Catalog,
    Admin,
    Suspended,
    Functions
} from './styles';

const AdminItem: React.FC<SeeStaffs> = ({userid, first_name, last_name, username, admin_flg, catalog_flg, circ_flg, circ_mbr_flg, suspended_flg }) => {
    return (
        <Container>
            <FirstName>{first_name}</FirstName>
            <LastName>{last_name}</LastName>
            <Username>{username}</Username>
            <Circ>{circ_flg}</Circ>
            <UpdMember>{circ_mbr_flg}</UpdMember>
            <Catalog>{catalog_flg}</Catalog>
            <Admin>{admin_flg}</Admin>
            <Suspended>{suspended_flg}</Suspended>
            <Functions><TbEdit/><MdDeleteOutline/><RiLockPasswordLine/></Functions>
        </Container>
    )
};

export default AdminItem;