import React, { useState, useCallback } from "react";
import { Container, Title, Button } from "./styles";
import InputForm from "../../Input/index";
import type { ChangeStaffPasswordRequest } from "../../../../../model/Staff/ChangeStaffPasswordRequest";

interface IChangeAdminPassword {
  button_text: string;
  handleSubmit(data: ChangeStaffPasswordRequest): void;
}

const ChangeAdminPasswordForm: React.FC<IChangeAdminPassword> = ({ button_text, handleSubmit }) => {
  const [newAdminPassword, setNewAdminPassword] = useState<ChangeStaffPasswordRequest>({} as ChangeStaffPasswordRequest);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNewAdminPassword((prev) => ({ ...prev, [name]: value }));
    },
    []
  );


  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newAdminPassword);
    handleSubmit(newAdminPassword);
  };

  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>Alterar Senha de Administrador</Title>
      <InputForm name="password" type="password" label="Senha" placeholder="Digite a senha" value={newAdminPassword.password} onChange={handleInputChange} />
      <InputForm name="confirmPassword" type="password" label="Confirmar Senha" placeholder="Repita a senha" value={newAdminPassword.confirmPassword} onChange={handleInputChange} />

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default ChangeAdminPasswordForm;
