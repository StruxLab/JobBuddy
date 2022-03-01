import { Flex, Link } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import NextLink from 'next/link';

interface IFooterMenuItem {
  (arg0: { url: string, linkItem: string }): ReactElement;
};
const FooterMenuItem: IFooterMenuItem = ({ url, linkItem }) => {
  return (
    <NextLink href={url} passHref>
      <Link
        display='inline-flex'
        overflow='hidden'
        lineHeight='1.1'
        _hover={{ textDecor: 'none' }}
      >
        {linkItem}
      </Link>
    </NextLink>
  );
};

interface IFooterMenu {
  (): ReactElement;
};
const FooterMenu: IFooterMenu = () => {
  const menuItems = [
    { id: 0, url: '/terms', text: 'Terms of Use' },
    { id: 1, url: '/privacy', text: 'Privacy Policy' },
    { id: 2, url: '/contact', text: 'Support' },
  ];
  return (
    <Flex direction='column' align='center'>
      {menuItems.map((item) => {
        return <FooterMenuItem
          key={item.id}
          url={item.url}
          linkItem={item.text}
        />
      })}
    </Flex>
  );
};

export default FooterMenu;
