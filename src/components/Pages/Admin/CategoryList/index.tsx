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
import type { ViewCollection } from '../../../../model/Collection/ViewCollection';

const CategoryList: React.FC = () => {
    const [collections, setCollections] = useState<ViewCollection[]>([]);
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get('/collection/viewcollections', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setCollections(response.data.collections);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const fields = [
        { key: 'description', label: 'Descrição' },
        { key: 'days_due_back', label: 'Dias para Devolução' },
        { key: 'daily_late_fee', label: 'Multa Diária' }
    ];

    const actions = [
        {
            icon: <TbEdit />,
            title: "Editar",
            to: (item: ViewAllClassifiesRequest) => `/collection/edit/${item.code}`,
        }
    ];

    return (
        <Container>
            <ReturnButton />
            <List>
                <NewAdmin to={'/collection/create'}>
                    <NewAdminIcon />Adicionar Categoria
                </NewAdmin>

                <GenericHeader fields={fields} hasActions />

                {collections && collections.length > 0
                    ? collections.map((item, index) => (
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

export default CategoryList;
