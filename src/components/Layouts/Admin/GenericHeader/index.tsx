import React from 'react';
import { Container, Row } from './styles';

type Field = {
  key: string;
  label: string;
};

interface GenericHeaderProps {
    fields: Field[];
    hasActions?: boolean;
  }
  
  const GenericHeader: React.FC<GenericHeaderProps> = ({ fields, hasActions = false }) => {
    const totalColumns = hasActions ? fields.length + 1 : fields.length;
  
    return (
      <Container>
        {fields.map((field) => (
          <Row key={field.key} columns={totalColumns}>
            {field.label}
          </Row>
        ))}
        {hasActions && (
          <Row key="actions" columns={totalColumns}>
            Ações
          </Row>
        )}
      </Container>
    );
  };

export default GenericHeader;
