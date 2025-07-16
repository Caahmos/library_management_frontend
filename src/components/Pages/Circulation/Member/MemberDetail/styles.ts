import styled from "styled-components";
import { RiFingerprint2Fill } from "react-icons/ri";
import { LuCircleUser } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { RiCalendarLine } from "react-icons/ri";
import { PiMedal } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ImBlocked } from "react-icons/im";

export const Container = styled.div<{$block: boolean}>`
  width: 100%;
  background: ${props => props.$block ? 'linear-gradient(35deg,rgba(212, 40, 40, 0) 60%, rgba(212, 40, 40, 0.86) 100%)' : 'none'};
  height: fit-content;
`;

export const MemberContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const MemberGrid = styled.div`
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 300px 1fr 1fr 1fr;
  grid-template-areas:
    "HC MC MC MC "
    "HC B1 B2 B3 "
    "HC CT CT CT ";
  gap: 20px;

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "MC MC MC"
      "B1 B2 B3"
      "CT CT CT"
      "HC HC HC";
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "MC"
      "B1"
      "B2"
      "B3"
      "CT"
      "HC";
  }
`;

export const MemberContent = styled.div`
  grid-area: CT;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NameDisplay = styled.div`
  display: flex;
  flex-direction: column;
`

export const HistContent = styled.div`
  width: 100%;
  min-height: 500px;
  border-radius: 7px;
  padding: 20px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.tertiary};
`;

export const Hist = styled.div`
  grid-area: HC;
  height: fit-content;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.tertiary};
`;

export const MemberCard = styled.div`
  grid-area: MC;
  width: 100%;
  min-height: 250px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.colors.tertiary};
  display: flex;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  max-width: 200px;
  width: 100%;
  height: 100%;
  gap: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 800px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const Right = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 15px;
`;

export const Image = styled.div<{ image: string | undefined }>`
  width: 120px;
  height: 120px;
  border-radius: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const Barcode = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const BookQtd = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
`;

export const FingerprintIcon = styled(RiFingerprint2Fill)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
`;

export const MailIcon = styled(MdOutlineMail)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
`;

export const CalendarIcon = styled(RiCalendarLine)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
`;

export const UserIcon = styled(LuCircleUser)`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.success};
`;

export const LocationIcon = styled(MdOutlineLocationOn)`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.success};
`;

export const MedalIcon = styled(PiMedal)`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.success};
`;

export const BarcodeText = styled.span`
  color: ${(props) => props.theme.colors.white};
`;

export const Name = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
`;

export const NameContent = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const MemberText = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const Text = styled.p`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.white};
`;

export const NormalText = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.white};
`;

export const Since = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export const Description = styled.div``;

export const SinceDate = styled.div`
  font-size: 0.7rem;
  color: ${(props) => props.theme.colors.white};
`;

export const Button1 = styled(Link)`
  grid-area: B1;
  width: 100%;
  display: flex;
  border-radius: 7px;
  text-decoration: none;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.tertiary};
`;

export const Button2 = styled(Link)`
  grid-area: B2;
  width: 100%;
  display: flex;
  border-radius: 7px;
  text-decoration: none;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.tertiary};
`;

export const Button3 = styled.div`
  grid-area: B3;
  width: 100%;
  display: flex;
  border-radius: 7px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.tertiary};
`;

export const IconBlocked = styled(ImBlocked)<{$block: boolean}>`
  font-size: 300px;
  position: absolute;
  display: ${props => props.$block ? 'block' : 'none'};
  top: -15px;
  right: -20px;
  opacity: 0.1;
  color: #000;
`;

export const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const InfoCards = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: ${(props) => props.theme.colors.secondary}; */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Card = styled.div`
  width: 35%;
  height: 90px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 7px;
  display: flex;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const CardLeft = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CardRight = styled.div`
  width: 50px;
  height: 100%;
  /* background-color: ${(props) => props.theme.colors.primary}; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.white};
`;

export const TopCard = styled.div`
  font-size: 1.2rem;
`;

export const BottomCard = styled.div`

`;

export const CardTitle = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
`;

export const CardDescription = styled.div`
  font-size: 0.7rem;
`;

export const ButtonLeft = styled.div`
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
  color: ${(props) => props.theme.colors.success};
`;

export const ButtonRight = styled.div`
  height: 100%;
  width: 100%;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  font-weight: bold;
`;

export const ButtonText = styled.div``;
