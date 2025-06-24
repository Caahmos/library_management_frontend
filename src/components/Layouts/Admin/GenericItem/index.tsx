import React from 'react';
import {
  Container,
  Content,
  Cell,
  Functions,
  Label,
  LinkIcon,
  Row
} from './styles';
import type { JSX } from 'react/jsx-dev-runtime';

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
  const totalColumns = actions.length > 0 ? fields.length + 1 : fields.length;

  return (
    <Container>
      <Content>
        {fields.map((field) => (
          <Row key={field.key} columns={totalColumns}>
            <Label>{field.label}</Label>
            <Cell>
              {typeof item[field.key] === 'boolean'
                ? item[field.key] ? 'Sim' : 'Não'
                : item[field.key]}
            </Cell>
          </Row>
        ))}

        {actions.length > 0 && (
          <Row columns={totalColumns}>
            <Label>Ações</Label>
            <Functions>
              {actions.map((action, index) =>
                action.to ? (
                  <LinkIcon key={index} to={action.to(item)} title={action.title}>
                    {action.icon}
                  </LinkIcon>
                ) : (
                  <span key={index} onClick={() => action.onClick?.(item)} title={action.title}>
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
