import React, { useMemo } from 'react';

import Header from '../Header';
import Aside from '../Aside';
import Content from '../Content';

import {
  Container
} from './styles'

interface ILayoutProps {
  children: React.ReactNode;
}


const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const MemoAside = useMemo(() => <Aside />, []);

  return (
    <Container>
      <Header />
      {MemoAside}
      <Content>
        {children}
      </Content>
    </Container>
  );
}

export default Layout;