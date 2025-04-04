import React from 'react';
import {
  Container,
  Content,
  Row,
  Label,
  Cell,
  Functions,
  LinkIcon,
} from './styles';

type Field = {
  key: string;
  label: string;
};

type Action = {
  icon: JSX.Element;
  title: string;
  to?: (item: any) => string;
  onClick?: (item: any) => void;
};

interface GenericItemProps {
  item: any;
  fields: Field[];
  actions?: Action[];
}

const GenericItem: React.FC<GenericItemProps> = ({ item, fields, actions = [] }) => {
  return (
    <Container>
      <Content>
        {fields.map((field) => (
          <Row key={field.key}>
            <Label>{field.label}</Label>
            <Cell>
              {typeof item[field.key] === "boolean"
                ? item[field.key] ? "Sim" : "Não"
                : item[field.key]}
            </Cell>
          </Row>
        ))}
        {actions.length > 0 && (
          <Row>
            <Label>Ações</Label>
            <Functions>
              {actions.map((action, i) =>
                action.to ? (
                  <LinkIcon key={i} to={action.to(item)} title={action.title}>
                    {action.icon}
                  </LinkIcon>
                ) : (
                  <span key={i} onClick={() => action.onClick?.(item)} title={action.title}>
                    {action.icon}
                  </span>
                )
              )}
            </Functions>
          </Row>
        )}
      </Content>
    </Container>
  );
};

export default GenericItem;
