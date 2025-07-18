import styled from "styled-components";
import { FaBarcode } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { MdAutoDelete, MdInfoOutline } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { Link } from "react-router-dom";

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

export const RefundIcon = styled(CgOptions)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
  margin-right: 5px;
`;

export const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
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

export const Header = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: ${(props) => props.theme.colors.success};
  font-weight: bold;
`;

export const Item = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};;
  padding-bottom: 10px;
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

export const Due = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.white};
`

export const Returned = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const DeleteIcon = styled(MdAutoDelete)`
  font-size: 0.8;
  margin-right: 5px;
`;

export const DeleteHold = styled.div`
 font-size: 1rem;
 cursor: pointer;
 transition: 0.4s all ease-in;
 color: #ff0000;
 display: flex;
 align-items: center;
 
 &:hover{
   color: #ff0000a1;
 }
`;

export const HoldText = styled.div`
  font-size: 1rem;
  
`;

export const HoldInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`;