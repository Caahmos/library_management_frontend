import { useAuth } from '../../../hooks/useAuth';
import { IoLogOutOutline } from "react-icons/io5";

import {
  Container,
  Profile,
  User,
  Button
} from './styles'

const Header: React.FC = () => {
  const { signOut, userData } = useAuth();

  return (
    <Container>
      <h2>Library Management</h2>
      <Profile>
        <User>
          <p>Bem vindo(a)</p>
          <span>
            {
              userData 
              ? userData.first_name
              : <p>Carlos</p>
            }
            </span>
        </User>
        <Button onClick={signOut}>
          <IoLogOutOutline />
          <span>Sair</span>
        </Button>
      </Profile>
    </Container>
  );
}

export default Header;