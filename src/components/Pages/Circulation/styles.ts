import styled from "styled-components";
import { IoBookSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { Link } from "react-router-dom";
import { Tooltip } from "recharts";

export const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  min-height: fit-content;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  color: #fff;
  gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 120px auto;
  grid-template-areas:
    "SG1 SG2 SG3 SG4 AG"
    "CG1 CG1 CG2 CG2 AG"
    "RG RG RG RG AG";

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr;
    grid-template-rows: 120px 120px 120px 120px auto;
    grid-template-areas:
      "SG1"
      "SG2"
      "SG3"
      "SG4"
      "CG1"
      "CG2"
      "AG"
      "RG";
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Square1 = styled(Link)`
  grid-area: SG1;
  background-color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;
  position: relative;
  overflow: hidden;
`;

export const IconAdm = styled(IoBookSharp)`
  font-size: 130px;
  position: absolute;
  top: -15px;
  right: -20px;
  opacity: 0.1;
  color: ${(props) => props.theme.colors.success};
`;

export const IconUsers = styled(FaUsers)`
  font-size: 130px;
  position: absolute;
  top: -15px;
  right: -20px;
  opacity: 0.1;
  color: ${(props) => props.theme.colors.success};
`;

export const IconBooks = styled(FaUserPlus)`
  font-size: 130px;
  position: absolute;
  top: -15px;
  right: -20px;
  opacity: 0.1;
  color: ${(props) => props.theme.colors.success};
`;

export const IconCategory = styled(ImBlocked)`
  font-size: 130px;
  position: absolute;
  top: -15px;
  right: -20px;
  opacity: 0.1;
  color: ${(props) => props.theme.colors.success};
`;

export const SquareTitle = styled.h3`
  font-weight: normal;
  color: ${(props) => props.theme.colors.success};
`;

export const SquareSpan = styled.span`
  font-weight: normal;
  color: ${(props) => props.theme.colors.white};
  font-size: 0.9rem;
`;

export const Title = styled.p`
  font-weight: normal;
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  padding-bottom: 10px;
`;

export const SquareContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const Square2 = styled(Link)`
  grid-area: SG2;
  background-color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;
  position: relative;
  overflow: hidden;
`;
export const Square3 = styled(Link)`
  grid-area: SG3;
  background-color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;
  position: relative;
  overflow: hidden;
`;
export const Square4 = styled(Link)`
  grid-area: SG4;
  background-color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;
  position: relative;
  overflow: hidden;
`;

export const RetangleGrid = styled.div`
  padding: 20px;
  grid-area: RG;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  min-height: fit-content;
`;

export const AsideGrid = styled.div`
  grid-area: AG;
  min-height: fit-content;
  `;

export const AsideContent = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 20px;
  min-height: 1000px;
`

export const ChartGrid1 = styled.div`
  grid-area: CG1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
`;
export const ChartGrid2 = styled.div`
  grid-area: CG2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

export const TooltipEdited = styled(Tooltip)`
  color: ${(props) => props.theme.colors.white};
`;
