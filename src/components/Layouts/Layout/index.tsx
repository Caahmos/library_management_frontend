import React from 'react';

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
  return (
    <Container>
      <Header />
      <Aside />
      <Content>
        {children}
      </Content>
    </Container>
  );
}

export default Layout;