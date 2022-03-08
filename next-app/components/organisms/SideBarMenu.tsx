import {
  Flex,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

interface ISideBarMenuItem {
  (arg0: { url: string, linkText: string }): ReactElement;
};
const SideBarMenuItem: ISideBarMenuItem = ({ url, linkText }) => {
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

interface ISideBarMenu {
  (): ReactElement;
}
const SideBarMenu: ISideBarMenu = () => {
  const menuItems: { id: number, url: string, text: string }[] = [
    { id: 0, url: '/dashboard', text: 'Dashboard' },
    { id: 1, url: '/dashboard/connect', text: 'Chrome Extension' },
    { id: 2, url: '/dashboard/tracker', text: 'Job Tracker' },
    { id: 3, url: '/login', text: 'Login' },
    { id: 4, url: '/terms', text: 'Terms' },
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
          key={item.id}
          url={item.url}
          linkText={item.text}
        />
      })}
    </Flex>
  );
}

export default SideBarMenu;
