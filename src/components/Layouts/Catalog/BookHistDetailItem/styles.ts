import styled from "styled-components";
import { FaBarcode } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { MdInfoOutline } from "react-icons/md";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

export const BarcodeIcon = styled(FaBarcode)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
  margin-right: 5px;
`;

export const BookInfo = styled(Link)`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
`;

export const BookTitle = styled.p`
  color: ${(props) => props.theme.colors.success};
  font-size: 0.7rem;
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
  color: ${(props) => props.theme.colors.success};
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
  color: ${({ overdue, theme }) => (overdue ? "red" : theme.colors.white)};
  font-weight: ${({ overdue }) => (overdue ? "bold" : "normal")};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HistDate = styled.div``;

export const DaysLate = styled.div`
  font-size: 0.8rem;
`;

export const MemberContent = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-wrap: wrap;
  color: ${(props) => props.theme.colors.white};
  gap: 10px;
  transition: 0.4s all ease;

  &:hover {
    color: ${(props) => props.theme.colors.success};
  }
`;

export const Member = styled.div`
  display: flex;
  align-items: center;
`;

export const ArrowIcon = styled(FaArrowUpRightFromSquare)`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.success};
`;
