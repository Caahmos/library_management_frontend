import api from '../../../utils/api';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Text,
  Select,
  Option
} from './styles';
import { ViewCollection } from '../../../model/Collection/ViewCollection';
import { useHandleSearch } from '../../../hooks/useHandleSearch';

const Filter: React.FC = () => {
  const [collections, setCollections] = useState<ViewCollection[]>([]);
  const token = localStorage.getItem("@library_management:token") || "";
  const { filterData, changeFilter } = useHandleSearch();

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

  const handleFilterChange = (key: keyof typeof filterData, value: string) => {
    if (key === "date") {
      changeFilter({
        ...filterData,
        date: value,
        order: ""
      });
    } else if (key === "order") {
      changeFilter({
        ...filterData,
        order: value,
        date: ""
      });
    } else {
      changeFilter({
        ...filterData,
        [key]: value
      });
    }
  };

  return (
    <Container>
      <Text>Classificar por:</Text>

      <Select
        value={filterData.collection}
        onChange={(e) => handleFilterChange("collection", e.target.value)}
      >
        <Option value="">Categoria</Option>
        {
          collections?.map((collection) => (
            <Option key={collection.description} value={collection.description}>
              {collection.description}
            </Option>
          ))
        }
      </Select>

      <Select
        value={filterData.date}
        onChange={(e) => handleFilterChange("date", e.target.value)}
        active={!!filterData.date && !filterData.order}
      >
        <Option value="">Ordenar por Data</Option>
        <Option value="desc">Mais Recente</Option>
        <Option value="asc">Mais Antigo</Option>
      </Select>

      <Select
        value={filterData.order}
        onChange={(e) => handleFilterChange("order", e.target.value)}
        active={!!filterData.order && !filterData.date}
      >
        <Option value="">Ordenar por Nome</Option>
        <Option value="A-Z">A-Z</Option>
        <Option value="Z-A">Z-A</Option>
      </Select>

      <Text>Carregar:</Text>
      <Select
        value={filterData.take}
        onChange={(e) => handleFilterChange("take", e.target.value)}
      >
        <Option value="10">10</Option>
        <Option value="50">50</Option>
        <Option value="100">100</Option>
        <Option value="500">500</Option>
        <Option value="1000">1000</Option>
      </Select>
    </Container>
  );
};

export default Filter;
