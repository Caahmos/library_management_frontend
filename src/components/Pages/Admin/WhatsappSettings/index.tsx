import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ModalOverlay,
  ModalBox,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter,
  ExportButton,
  FormGroup,
  FormRow,
  FormLabel,
  FormInput
} from "./styles";
import api from "../../../../utils/api";
import { useWhatsapp } from "../../../../hooks/useWhatsapp";

const WhatsappSettings: React.FC = () => {
  const navigate = useNavigate();
  const { socket, status, qrCode, refreshStatus } = useWhatsapp();
  const [loadingLogout, setLoadingLogout] = useState(false);

  const close = () => navigate(-1);
  const isConnected = status.connected;
  console.log("CONNECATAOOOO?>>>>>>>>>>>> " + isConnected)
  console.log("LOADINFFFG?>>>>>>>>>>>> " + loadingLogout)

  const handleLogoutWhatsapp = async () => {
    if (!socket || status.status !== 'inChat') return;
    setLoadingLogout(true);
    try {
      await api.post("/whatsapp/logout");
      setLoadingLogout(false);
      refreshStatus(); // Atualiza o status depois do logout
    } catch (err: any) {
      console.log(err.message);
      setLoadingLogout(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Gerenciar WhatsApp</ModalTitle>
          <ModalClose onClick={close}>×</ModalClose>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <FormRow>
              <FormLabel>Status</FormLabel>
              <FormInput
                type="text"
                readOnly
                value={status.message + (isConnected ? " ✅" : " ❌")}
              />
            </FormRow>

            {status.status !== "inChat" && qrCode && (
              <FormRow>
                <FormLabel>QR Code</FormLabel>
                <img
                  src={qrCode}
                  alt="QR Code WhatsApp"
                  style={{
                    width: "300px",
                    background: "#fff",
                    padding: "5px",
                    borderRadius: "10px"
                  }}
                />
              </FormRow>
            )}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <ExportButton
            onClick={handleLogoutWhatsapp}
            disabled={status.status !== 'inChat' || loadingLogout}
            style={{ marginLeft: "10px" }}
          >
            {loadingLogout ? "Deslogando..." : "Deslogar WhatsApp"}
          </ExportButton>
        </ModalFooter>
      </ModalBox>
    </ModalOverlay>
  );
};

export default WhatsappSettings;
