import { Flex } from '@chakra-ui/react';
import SideBarMenu from './SideBarMenu';
import SideBarFooter from './SideBarFooter';

const SideBar = () => {
  return (
    <Flex
      bg='#dfdfdf'
      w='200px'
      pt={30}
      pb={10}
      borderRight='1px solid #8d8d8d'
      h='calc(100vh - 70px)'
      overflowY='scroll'
      direction='column'
      justify='space-between'
    >
      <SideBarMenu />
      <SideBarFooter />
    </Flex>
  );
}

export default SideBar;
