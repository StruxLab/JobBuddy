import {
  Flex,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const SideBarMenuItem = ({ url, linkText }) => {
  const router = useRouter();
  const isActiveLink = router.route === url;
  return (
    <NextLink href={url} passHref>
      <Flex
        _hover={{
          bg: '#c7c7c7',
          transition: '0.3s',
        }}
        p='10px 20px'
        cursor='pointer'
        userSelect='none'
        bg={isActiveLink ? '#c7c7c7' : 'inherit'}
      >
        <NextLink href={url} passHref>
          <Text
            as='a'
            lineHeight={0.8}
          >{linkText}</Text>
        </NextLink>
      </Flex>
    </NextLink>
  );
}

const SideBarMenu = () => {
  const menuItems = [
    // { url: '/', text: 'Home' },
    { url: '/dashboard', text: 'Dashboard' },
    { url: '/dashboard/connect', text: 'Chrome Extension' },
    { url: '/login', text: 'Login' },
    { url: '/?', text: 'Job Tracker' },
    { url: '/?1', text: 'Job Tracker' },
  ];
  return (
    <Flex
      direction='column'
      color='#5A5A5A'
      gap={0}
      lineHeight={1}
      fontSize='1.15em'
      w='100%'
    >
      {menuItems.map((item) => {
        return <SideBarMenuItem
          key={item.url}
          url={item.url}
          linkText={item.text}
        />
      })}
    </Flex>
  );
}

export default SideBarMenu;
