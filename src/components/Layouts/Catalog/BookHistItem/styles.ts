import styled from 'styled-components';
import { FaBarcode } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { MdInfoOutline } from "react-icons/md";
import { HiMiniReceiptRefund } from "react-icons/hi2";

export const BarcodeIcon = styled(FaBarcode)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
  margin-right: 5px;
`;

export const UsersIcon = styled(HiMiniUsers)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
  margin-right: 5px;
`;

export const InfoIcon = styled(MdInfoOutline)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
  margin-right: 5px;
`;

export const RefundIcon = styled(HiMiniReceiptRefund)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
  margin-right: 5px;
`;

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 17px;
  padding: 20px;
`;

export const Header = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 7px;
  color: ${props => props.theme.colors.success};
  font-weight: bold;
`;

export const Item = styled.div`
  width: 100%;
  display: grid;
  padding: 7px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

interface DueDateProps {
  overdue: boolean;
}

export const DueDate = styled.p<DueDateProps>`
  color: ${({ overdue, theme }) => (overdue ? 'red' : theme.colors.white)};
  font-weight: ${({ overdue }) => (overdue ? 'bold' : 'normal')};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HistDate = styled.div`

`;

export const DaysLate = styled.div`
  font-size: 0.8rem;
`;

