import React, { useState, useEffect } from 'react';
import api from '../../../../utils/api';
import ReturnButton from '../../../Layouts/ReturnButton';
import GenericItem from '../../../Layouts/Admin/GenericItem';
import { ViewAllClassifiesRequest } from '../../../../model/Member/MemberClassifyDM/ViewAllClassifiesRequest';
import { TbEdit } from "react-icons/tb";

import {
    Container,
    List,
    NewAdmin,
    NewAdminIcon,
} from './styles';
import GenericHeader from '../../../Layouts/Admin/GenericHeader';

const MemberFieldsList: React.FC = () => {
    const [memberFields, setMemberFields] = useState<ViewAllClassifiesRequest[]>([]);
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get('/mbrfieldsdm/viewfields', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setMemberFields(response.data.fields);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const fields = [
        { key: 'code', label: 'Código' },
        { key: 'description', label: 'Descrição' }
    ];

    const actions = [
        {
            icon: <TbEdit />,
            title: "Editar",
            to: (item: ViewAllClassifiesRequest) => `/mbrfield/edit/${item.code}`,
        }
    ];

    return (
        <Container>
            <ReturnButton />
            <List>
                <NewAdmin to={'/mbrfield/create'}>
                    <NewAdminIcon />Adicionar Campo de Usuário
                </NewAdmin>

                <GenericHeader fields={fields} hasActions />

                {memberFields && memberFields.length > 0
                    ? memberFields.map((item, index) => (
                        <GenericItem
                            key={index}
                            item={item}
                            fields={fields}
                            actions={actions}
                        />
                    ))
                    : <span>Nenhum campo encontrada!</span>
                }
            </List>
        </Container>
    );
};

export default MemberFieldsList;
