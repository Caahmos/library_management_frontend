import React, { useState } from "react";
import { Container, Title, Button, DeleteButton } from "./styles";
import InputForm from "../../Input/index";
import SwitchComponent from "../../SwitchComponent";
import type { EditStaffRequest } from "../../../../../model/Staff/EditStaffRequest";
import type { SeeStaffs } from "../../../../../model/Staff/RegisterStaffRequest";

interface IEditAdminForm {
  adminInfo: SeeStaffs;
  button_text: string;
  handleSubmit(data: Partial<EditStaffRequest>): void; 
  handleDelete(): void; 
}

const EditAdminForm: React.FC<IEditAdminForm> = ({ button_text, handleSubmit, adminInfo, handleDelete }) => {
  
  const [modifiedFields, setModifiedFields] = useState<Partial<EditStaffRequest>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setModifiedFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof EditStaffRequest) => {
    setModifiedFields(prev => ({
      ...prev,
      [name]: !(name in prev ? prev[name] : Boolean(adminInfo[name as keyof SeeStaffs]))
    }));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...modifiedFields
    };
    console.log("Dados modificados:", dataToSubmit);
    handleSubmit(dataToSubmit);
  };

  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    handleDelete();
  }

  return (
    <Container onSubmit={handleOnSubmit}>
      <Title>Editar Administrador</Title>
      
      <InputForm 
        name="first_name" 
        label="Nome" 
        placeholder={adminInfo.first_name || "Digite o nome"} 
        value={modifiedFields.first_name || ""} 
        onChange={handleInputChange} 
      />
      
      <InputForm 
        name="last_name" 
        label="Sobrenome" 
        placeholder={adminInfo.last_name || "Digite o sobrenome"} 
        value={modifiedFields.last_name || ""} 
        onChange={handleInputChange} 
      />
      
      <InputForm 
        name="username" 
        label="Nome de Usuário" 
        placeholder={adminInfo.username || "Digite o nome de usuário"} 
        value={modifiedFields.username || ""} 
        onChange={handleInputChange} 
      />
      
      <SwitchComponent 
        checked={'catalog_flg' in modifiedFields ? modifiedFields.catalog_flg! : Boolean(adminInfo.catalog_flg)} 
        labelLeft="Área de Catálogo" 
        onChange={() => handleSwitchChange("catalog_flg")} 
      />
      
      <SwitchComponent 
        checked={'admin_flg' in modifiedFields ? modifiedFields.admin_flg! : Boolean(adminInfo.admin_flg)} 
        labelLeft="Área de Administrador" 
        onChange={() => handleSwitchChange("admin_flg")} 
      />
      
      <SwitchComponent 
        checked={'circ_flg' in modifiedFields ? modifiedFields.circ_flg! : Boolean(adminInfo.circ_flg)} 
        labelLeft="Área de Circulação" 
        onChange={() => handleSwitchChange("circ_flg")} 
      />
      
      <SwitchComponent 
        checked={'circ_mbr_flg' in modifiedFields ? modifiedFields.circ_mbr_flg! : Boolean(adminInfo.circ_mbr_flg)} 
        labelLeft="Área de Membros" 
        onChange={() => handleSwitchChange("circ_mbr_flg")} 
      />
      
      <SwitchComponent 
        checked={'reports_flg' in modifiedFields ? modifiedFields.reports_flg! : Boolean(adminInfo.reports_flg)} 
        labelLeft="Área de Relatórios" 
        onChange={() => handleSwitchChange("reports_flg")} 
      />
      
      <SwitchComponent 
        checked={'suspended_flg' in modifiedFields ? modifiedFields.suspended_flg! : Boolean(adminInfo.suspended_flg)} 
        labelLeft="Suspender Administrador" 
        onChange={() => handleSwitchChange("suspended_flg")} 
      />

      <Button type="submit">{button_text}</Button>
       <DeleteButton 
          type="button"  
          onClick={handleOnDelete}
        >
          Deletar
        </DeleteButton>
    </Container>
  );
};

export default EditAdminForm;