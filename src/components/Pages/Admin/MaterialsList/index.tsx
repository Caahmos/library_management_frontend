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

const MaterialsList: React.FC = () => {
    const [materials, setMaterials] = useState<ViewAllClassifiesRequest[]>([]);
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get('/material/viewmaterials', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setMaterials(response.data.materials);
                console.log(response.data.materials);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const fields = [
        { key: 'description', label: 'Descrição' },
        { key: 'image_file', label: 'Imagem' }
    ];

    const actions = [
        {
            icon: <TbEdit />,
            title: "Editar",
            to: (item: ViewAllClassifiesRequest) => `/material/edit/${item.code}`,
        }
    ];

    return (
        <Container>
            <ReturnButton />
            <List>
                <NewAdmin to={'/material/create'}>
                    <NewAdminIcon />Adicionar Tipo de Material
                </NewAdmin>

                <GenericHeader fields={fields} hasActions />

                {materials && materials.length > 0
                    ? materials.map((item, index) => (
                        <GenericItem
                            key={index}
                            item={item}
                            fields={fields}
                            actions={actions}
                        />
                    ))
                    : <span>Nenhum material encontrado!</span>
                }
            </List>
        </Container>
    );
};

export default MaterialsList;
