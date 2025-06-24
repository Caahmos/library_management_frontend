import React, { useState, useEffect } from 'react';
import api from '../../../../utils/api';
import ReturnButton from '../../../Layouts/ReturnButton';
import GenericItem from '../../../Layouts/Admin/GenericItem';
import type { ViewAllClassifiesRequest } from '../../../../model/Member/MemberClassifyDM/ViewAllClassifiesRequest';
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";

import {
    Container,
    List,
    NewAdmin,
    NewAdminIcon,
} from './styles';
import GenericHeader from '../../../Layouts/Admin/GenericHeader';

const MemberList: React.FC = () => {
    const [memberClassifies, setMemberClassifies] = useState<ViewAllClassifiesRequest[]>([]);
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get('/mbrclassifydm/viewall', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setMemberClassifies(response.data.classifies);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const fields = [
        { key: 'description', label: 'Descrição' },
        { key: 'max_fines', label: 'Multa Máxima' }
    ];

    const actions = [
        {
            icon: <TbEdit />,
            title: "Editar",
            to: (item: ViewAllClassifiesRequest) => `/mbrclassify/edit/${item.code}`,
        }
    ];

    return (
        <Container>
            <ReturnButton />
            <List>
                <NewAdmin to={'/mbrclassify/create'}>
                    <NewAdminIcon />Adicionar Tipo de Usuário
                </NewAdmin>

                <GenericHeader fields={fields} hasActions />

                {memberClassifies && memberClassifies.length > 0
                    ? memberClassifies.map((item, index) => (
                        <GenericItem
                            key={index}
                            item={item}
                            fields={fields}
                            actions={actions}
                        />
                    ))
                    : <span>Nenhuma categoria encontrada!</span>
                }
            </List>
        </Container>
    );
};

export default MemberList;
