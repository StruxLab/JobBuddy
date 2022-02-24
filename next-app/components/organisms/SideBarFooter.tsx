import {
  Flex,
  Text,
  Link,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';
// import SideBarFooterMenu from '../SideBarFooterMenu';

const SideBarFooter = () => {
  return (
    <Flex
      direction='column'
      fontSize='0.8em'
      lineHeight={1.1}
      align='center'
      color='#767676'
      w='100%'
    >
      <Divider borderColor='#000' />
      <Link href='https://www.struxlab.com' target='_blank'>
        A StruxLab Application
      </Link>
      <Text as='span'>Copyright &copy; 2022</Text>
      <NextLink href='/login' passHref>
        <Link mt={5} color='#a5a5a5'>0.1.17-alpha-prod</Link>
      </NextLink>
    </Flex>
  );
}

export default SideBarFooter;
