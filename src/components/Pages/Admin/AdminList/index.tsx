import React, { useState, useEffect, useMemo } from 'react';
import ReturnButton from '../../../Layouts/ReturnButton';
import AdminItem from '../../../Layouts/Admin/AdminItem';
import api from '../../../../utils/api';
import { SeeStaffs } from '../../../../model/Staff/RegisterStaffRequest';

import {
    Container,
    List,
    NewAdmin,
    NewAdminIcon,
    AdminHeaders,
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

const AdminList: React.FC = () => {
    const [admins, setAdmins] = useState<SeeStaffs[]>([]);
    const [token, setToken] = useState(
        localStorage.getItem("@library_management:token") || ""
    );

    useEffect(() => {
        api.get('/staff/viewstaffs', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setAdmins(response.data.staffs);
                console.log(response.data.staffs);
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const editedAdmins = useMemo<SeeStaffs[]>(() => {
        return admins.map((admin) => ({
            ...admin,
            admin_flg: admin.admin_flg ? "Sim" : "Não",
            catalog_flg: admin.catalog_flg ? "Sim" : "Não",
            circ_flg: admin.circ_flg ? "Sim" : "Não",
            circ_mbr_flg: admin.circ_mbr_flg ? "Sim" : "Não",
            suspended_flg: admin.suspended_flg ? "Sim" : "Não",
        }));
    }, [admins]);

    return (
        <Container>
            <ReturnButton />
            <List>
                <NewAdmin to={'/admin/createadmin'}><NewAdminIcon />Adicionar Administrador</NewAdmin>
                <AdminHeaders>
                    <FirstName>Nome</FirstName>
                    <LastName>Sobrenome</LastName>
                    <Username>Usuário</Username>
                    <Circ>Circulação</Circ>
                    <UpdMember>Atualizar Membros</UpdMember>
                    <Catalog>Catalogo</Catalog>
                    <Admin>Administrador</Admin>
                    <Suspended>Suspenso</Suspended>
                    <Functions>Ações</Functions>
                </AdminHeaders>
                {
                    editedAdmins && editedAdmins.length > 0 
                    ? editedAdmins.map((admin) => (
                        <AdminItem userid={admin.userid} first_name={admin.first_name} last_name={admin.last_name} username={admin.username} admin_flg={admin.admin_flg} catalog_flg={admin.catalog_flg} circ_flg={admin.circ_flg} circ_mbr_flg={admin.circ_mbr_flg} suspended_flg={admin.suspended_flg}/>
                    ))
                    : <span> Nenhum admin encontrado </span>
                }
            </List>
        </Container>
    )
};

export default AdminList;