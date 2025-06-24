import React, { useState, useCallback } from "react";
import { Container, Title, Button } from "./styles";
import InputForm from "../../Input/index";
import SwitchComponent from "../../SwitchComponent";
import type { RegisterStaffRequest } from "../../../../../model/Staff/RegisterStaffRequest";

interface IRegisterAdminForm {
  button_text: string;
  handleSubmit(data: RegisterStaffRequest): void;
}

const RegisterAdminForm: React.FC<IRegisterAdminForm> = ({ button_text, handleSubmit }) => {
  const [newAdminData, setNewAdminData] = useState<RegisterStaffRequest>({} as RegisterStaffRequest);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNewAdminData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSwitchChange = useCallback(
    (name: keyof RegisterStaffRequest) => {
      setNewAdminData((prev) => ({
        ...prev,
        [name]: !prev[name] as boolean,
      }));
    },
    []
  );

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newAdminData);
    handleSubmit(newAdminData);
  };

  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>Adicionar Administrador</Title>
      <InputForm name="first_name" label="Nome" placeholder="Digite o nome" value={newAdminData.first_name} onChange={handleInputChange} />
      <InputForm name="last_name" label="Sobrenome" placeholder="Digite o sobrenome" value={newAdminData.last_name} onChange={handleInputChange} />
      <InputForm name="username" label="Nome de Usuário" placeholder="Digite o nome de usuário" value={newAdminData.username} onChange={handleInputChange} />
      <InputForm name="password" type="password" label="Senha" placeholder="Digite a senha" value={newAdminData.password} onChange={handleInputChange} />
      <InputForm name="confirmPassword" type="password" label="Confirmar Senha" placeholder="Repita a senha" value={newAdminData.confirmPassword} onChange={handleInputChange} />

      <SwitchComponent checked={newAdminData.catalog_flg} labelLeft="Área de Catálogo" onChange={() => handleSwitchChange("catalog_flg")} />
      <SwitchComponent checked={newAdminData.admin_flg} labelLeft="Área de Administrador" onChange={() => handleSwitchChange("admin_flg")} />
      <SwitchComponent checked={newAdminData.circ_flg} labelLeft="Área de Circulação" onChange={() => handleSwitchChange("circ_flg")} />
      <SwitchComponent checked={newAdminData.circ_mbr_flg} labelLeft="Área de Membros" onChange={() => handleSwitchChange("circ_mbr_flg")} />
      <SwitchComponent checked={newAdminData.reports_flg} labelLeft="Área de Relatórios" onChange={() => handleSwitchChange("reports_flg")} />

      <Button type="submit">{button_text}</Button>
    </Container>
  );
};

export default RegisterAdminForm;
