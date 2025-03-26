import styled from "styled-components";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { BiSolidCategory } from "react-icons/bi";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding: 20px;
    display: grid;
    color: #fff;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 120px auto;
    grid-template-areas:
    "SG1 SG2 SG3 SG4 AG"
    "RG RG RG RG AG"
    "CG1 CG1 CG2 CG2 AG";
`;

export const Square1 = styled.div`
    grid-area: SG1;
    background-color: ${ props => props.theme.colors.secondary};
    position: relative;
    overflow: hidden;
    `

export const IconAdm = styled(RiAdminFill)`
    font-size: 130px;
    position: absolute;
    top: -15px;
    right: -20px;
    opacity: .1;
    color: ${ props => props.theme.colors.success};

`;

export const IconUsers = styled(FaUsers)`
    font-size: 130px;
    position: absolute;
    top: -15px;
    right: -20px;
    opacity: .1;
    color: ${ props => props.theme.colors.success};

`;

export const IconBooks = styled(ImBooks)`
    font-size: 130px;
    position: absolute;
    top: -15px;
    right: -20px;
    opacity: .1;
    color: ${ props => props.theme.colors.success};

`;

export const IconCategory = styled(BiSolidCategory)`
    font-size: 130px;
    position: absolute;
    top: -15px;
    right: -20px;
    opacity: .1;
    color: ${ props => props.theme.colors.success};

`;

export const SquareTitle = styled.h3`
    font-weight: normal;
    color: ${ props => props.theme.colors.success};
`

export const SquareSpan = styled.span`
    font-weight: normal;
    color: ${ props => props.theme.colors.white};
    font-size: 0.9rem;
`

export const Title = styled.p`
    font-weight: normal;
    color: ${ props => props.theme.colors.white};
    font-size: 1rem;
    padding-bottom: 10px;
`

export const SquareContent = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
`

export const Square2 = styled.div`
    grid-area: SG2;
    background-color: ${ props => props.theme.colors.secondary};
    position: relative;
    overflow: hidden;
    `
export const Square3 = styled.div`
    grid-area: SG3;
    background-color: ${ props => props.theme.colors.secondary};
    position: relative;
    overflow: hidden;
    `
export const Square4 = styled.div`
    grid-area: SG4;
    background-color: ${ props => props.theme.colors.secondary};
    position: relative;
    overflow: hidden;
    `

export const RetangleGrid = styled.div`
    grid-area: RG;
    background-color: ${ props => props.theme.colors.secondary};
`

export const AsideGrid = styled.div`
    grid-area: AG;
    padding: 10px;
    background-color: ${ props => props.theme.colors.secondary};
`

export const ChartGrid1 = styled.div`
    grid-area: CG1;
    background-color: ${ props => props.theme.colors.secondary};
`
export const ChartGrid2 = styled.div`
    grid-area: CG2;
    background-color: ${ props => props.theme.colors.secondary};
`

