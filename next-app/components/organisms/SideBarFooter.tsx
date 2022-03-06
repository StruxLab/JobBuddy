import {
  Flex,
  Text,
  Link,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ReactElement } from 'react';
import SideBarFooterMenu from './SideBarFooterMenu';

interface ISideBarFooter {
  (): ReactElement;
}
const SideBarFooter: ISideBarFooter = () => {
  return (
    <Flex
      direction='column'
      fontSize='0.9em'
      align='center'
      color='#767676'
      w='100%'
    >
      <Divider borderColor='#BCBCBC' mb={3} w='70%' />
      <SideBarFooterMenu />
      <Divider borderColor='#BCBCBC' mt={2} mb={3} w='70%' />
      <Link
        href='https://www.struxlab.com'
        _hover={{ textDecor: 'none' }}
        target='_blank'
        overflow='hidden'
      >
        A StruxLab Application
      </Link>
      <Text
        as='span'
        lineHeight={1}
        overflow='hidden'
      >Copyright &copy; 2022</Text>
      <NextLink href='/login' passHref>
        <Link mt={2} color='#a5a5a5'>0.1.17-alpha-prod</Link>
      </NextLink>
    </Flex>
  );
}

export default SideBarFooter;
