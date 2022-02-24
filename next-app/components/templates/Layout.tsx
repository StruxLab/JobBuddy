import { Flex } from '@chakra-ui/react';
import type { ReactFragment, ReactElement } from 'react';
import Header from '../organisms/Header';
import SideBar from '../organisms/SideBar';

interface ILayout {
  (arg0: { children: ReactFragment }): ReactElement
}

const Layout: ILayout = ({ children }) => {
  return (
    <Flex direction='column' minH='100vh'>
      <Header />
      <Flex>
        <SideBar />
        {children}
      </Flex>
    </Flex>
  );
}

export default Layout;
