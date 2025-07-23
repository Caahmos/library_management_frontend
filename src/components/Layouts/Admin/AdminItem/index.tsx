import React from 'react';
import type { SeeStaffs } from '../../../../model/Staff/RegisterStaffRequest';
import { TbEdit } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";

import {
    Container,
    Content,
    HiddenHeaders,
    FirstName,
    LastName,
    Username,
    Circ,
    UpdMember,
    Catalog,
    Admin,
    Suspended,
    Functions,
    LinkIcon
} from './styles';

const AdminItem: React.FC<SeeStaffs> = ({ userid, first_name, last_name, username, admin_flg, catalog_flg, circ_flg, circ_mbr_flg, suspended_flg }) => {
    return (
        <Container>
            <HiddenHeaders>
                <FirstName>Nome:</FirstName>
                <LastName>Sobrenome:</LastName>
                <Username>Usuário:</Username>
                <Circ>Circulação:</Circ>
                <UpdMember>Atualizar Membros:</UpdMember>
                <Catalog>Catalogo:</Catalog>
                <Admin>Administrador:</Admin>
                <Suspended>Suspenso:</Suspended>
                <Functions>Ações:</Functions>
            </HiddenHeaders>
            <Content>
                <FirstName>{first_name}</FirstName>
                <LastName>{last_name}</LastName>
                <Username>{username}</Username>
                <Circ>{circ_flg}</Circ>
                <UpdMember>{circ_mbr_flg}</UpdMember>
                <Catalog>{catalog_flg}</Catalog>
                <Admin>{admin_flg}</Admin>
                <Suspended>{suspended_flg}</Suspended>
                <Functions>
                    <LinkIcon to={`/admin/editadmin/${userid}`}><TbEdit title='Editar Admin' /></LinkIcon>
                    <LinkIcon to={`/admin/cpass/${userid}`}><RiLockPasswordLine title='Alterar a Senha' /></LinkIcon>
                </Functions>
            </Content>
        </Container>
    )
};

export default AdminItem;