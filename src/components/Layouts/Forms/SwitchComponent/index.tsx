import React from "react";
import Switch from "react-switch";
import { Container, Text } from "./styles";

interface ISwitchComponent {
  labelLeft: string;
  checked: boolean | undefined;
  onChange(): void;
}

const SwitchComponent: React.FC<ISwitchComponent> = ({ checked, labelLeft, onChange }) => {
  return (
    <Container>
      <Text>{labelLeft}</Text>
      <Switch checked={checked || false} onChange={onChange} />
    </Container>
  );
};

export default SwitchComponent;
