import React, { useState, useEffect } from 'react';
import api from '../../../../utils/api';
import ReturnButton from '../../../Layouts/ReturnButton';
import GenericItem from '../../../Layouts/Admin/GenericItem';
import { TbEdit } from "react-icons/tb";

import {
    Container,
    List,
} from './styles';
import GenericHeader from '../../../Layouts/Admin/GenericHeader';
import type { ViewCheckPrivRequest } from '../../../../model/CheckoutPrivs/EditCheckPrivRequest';

const CheckoutPrivsList: React.FC = () => {
    const [checkPrivs, setCheckPrivs] = useState<ViewCheckPrivRequest[]>([]);
    const token = localStorage.getItem("@library_management:token") || "";

    useEffect(() => {
        api.get('/checkprivs/viewcheckprivs', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                const updated = response.data.checkprivs.map((value: ViewCheckPrivRequest) => ({
                    ...value,
                    classification: value.mbr_classify_dm.description,
                    material_cd: value.material_type_dm.description,
                    days_due_back: value.days_due_back
                }));
                setCheckPrivs(updated);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const fields = [
        { key: 'material_cd', label: 'Material' },
        { key: 'classification', label: 'Tipo de Membro' },
        { key: 'checkout_limit', label: 'Máx. Emprestimos' },
        { key: 'renewal_limit', label: 'Máx. Renovações' },
        { key: 'grace_period_days', label: 'Dias para Bloqueio' },
        { key: 'days_due_back', label: 'Dias para Devolução' },
    ];

    const actions = [
        {
            icon: <TbEdit />,
            title: "Editar",
            to: (item: ViewCheckPrivRequest) => `/admin/checkoutprivs/edit/${item.id}`,
        }
    ];

    return (
        <Container>
            <ReturnButton />
            <List>
                <GenericHeader fields={fields} hasActions />

                {checkPrivs && checkPrivs.length > 0
                    ? checkPrivs.map((item, index) => (
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

export default CheckoutPrivsList;
