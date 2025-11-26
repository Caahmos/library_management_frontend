import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 20px;
`;

export const ModalBox = styled.div`
  width: 100%;
  max-width: 700px;
  background: ${(props) => props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  padding: 0;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  font-size: 1.3rem;
`;

export const ModalTitle = styled.div``;

export const ModalClose = styled.div`
  cursor: pointer;
  font-size: 1.8rem;
  line-height: 1rem;
  transition: 0.3s;
  &:hover {
    color: ${(props) => props.theme.colors.success};
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
  overflow-y: auto;
  color: ${(props) => props.theme.colors.white};
`;

export const ModalFooter = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  background: ${(props) => props.theme.colors.primary};
`;

export const ExportButton = styled.button`
  padding: 12px 20px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 1rem;
  background: ${(props) => props.theme.colors.success};
  color: ${(props) => props.theme.colors.white};
  display: flex;
  gap: 5px;
  align-items: center;
  border: none;
  transition: 0.3s;

  > svg {
    font-size: 1.2rem;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Item = styled.div`
  padding: 15px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 7px;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 5px;
`;

export const Label = styled.div`
  font-weight: bold;
  color: ${(props) => props.theme.colors.white};
`;

export const Value = styled.div`
  color: ${(props) => props.theme.colors.white};
`;

// Container geral do formulário
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 20px;
`;

// Cada linha do formulário (label + input)
export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white};
`;

// Input estilizado
export const FormInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  background: ${(props) => props.theme.colors.primary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.colors.success};
    box-shadow: 0 0 0 2px rgba(0, 255, 150, 0.25);
  }
`;

// Select estilizado
export const FormSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  background: ${(props) => props.theme.colors.primary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  outline: none;
  appearance: none; /* remove seta padrão */

  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 14px center;

  transition: all 0.2s ease;

  &:focus {
    border-color: ${(props) => props.theme.colors.success};
    box-shadow: 0 0 0 2px rgba(0, 255, 150, 0.25);
  }
`;

