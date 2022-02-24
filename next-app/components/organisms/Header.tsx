import { Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import NavUser from '../molecules/NavUser';

const Header = () => {
  return (
    <Flex
      bg='#4E8062'
      color='#fff'
      h='70px'
      align='center'
      justify='space-between'
    >
      <NextLink href='/' passHref>
        <Text as='span' fontWeight='600'>JobBuddy</Text>
      </NextLink>
      <NavUser />
    </Flex>
  );
}

export default Header;
