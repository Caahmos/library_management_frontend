import styled from "styled-components";
import { FaBarcode } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { MdInfoOutline } from "react-icons/md";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { CgOptions } from "react-icons/cg";

export const BarcodeIcon = styled(FaBarcode)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
  margin-right: 5px;
`;

export const BookInfo = styled(Link)`
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  max-width: 100%;
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

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`

export const EmailContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  > svg {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
    transition: 0.2s all ease-in;
    
    &:hover{
      color: ${(props) => props.theme.colors.success};
  }
  }
`

export const Count = styled.div`
  position: absolute;
  top: -5px;
  left: 15px;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.success};
  color: ${(props) => props.theme.colors.white};
`

export const ActionsIcon = styled(CgOptions)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
  margin-right: 5px;
`;

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  margin-top: 20px;
  display: none;
  flex-direction: column;
  gap: 17px;

  @media screen and (max-width: 1000px) {
      display: flex;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px;
  color: ${(props) => props.theme.colors.success};
  font-weight: bold;
  font-size: 0.8rem;
  
`;

export const Item = styled.div`
  width: 100%;
  padding: 7px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
`;

interface DueDateProps {
  overdue: boolean;
}

export const DueDate = styled.div<DueDateProps>`
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

export const Due = styled.div<{$in: string}>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ $in }) => ($in === 'yes' ? "green" : "")};
`

export const Returned = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ReturnedText = styled.div`
  font-size: 0.8rem;
  color: green;
`
export const ReturnedContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`