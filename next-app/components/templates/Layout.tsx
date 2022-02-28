import { Flex } from '@chakra-ui/react';
import type { ReactFragment, ReactElement } from 'react';
import Header from '../organisms/Header';
import SideBar from '../organisms/SideBar';

interface ILayout {
  (arg0: { children: ReactFragment }): ReactElement
}

const Layout: ILayout = ({ children }) => {
  return (
    <Flex
      direction='column'
      minH='100vh'
      bg='#999393'
      fontFamily='ntr'
    >
      <Header />
      <Flex>
        <SideBar />
        <Flex overflowY='scroll' maxH='calc(100vh - 70px)' w='100%'>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Layout;
