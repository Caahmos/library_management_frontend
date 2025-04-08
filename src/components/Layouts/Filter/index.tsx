import api from '../../../utils/api';
import React, {useEffect, useState} from 'react';
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";

import {
    Container,
    Text,
    Select,
    Option
} from './styles';
import { ViewCollection } from '../../../model/Collection/ViewCollection';

const Filter: React.FC = () => {
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

    return (
        <Container>
            <Text>Classificar por:</Text>
            <Select >
                <Option>Categoria</Option>
                {
                    collections && collections.length > 0 &&
                    collections.map((collection) => (
                       <option>{collection.description}</option> 
                    ))
                }
            </Select>
            <Select>
                <Option>Mais Recente </Option>
                <Option>Mais Antigo </Option>
            </Select>
            <Select>
                <Option>A-Z</Option>
                <Option>Z-A</Option>
            </Select>
            <Select>
                <Option>Bloco</Option>
                <Option>Lista</Option>
            </Select>
            
        </Container>
    )
};

export default Filter;