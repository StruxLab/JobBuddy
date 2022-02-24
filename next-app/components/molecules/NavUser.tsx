import {
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';
import NextLink from 'next/link';
import NextImage from 'next/image'

const NavUser = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <Flex>
      {data?.user ? (
        <Flex gap='10px'>
          <Flex
            direction='column'
            align='flex-end'
            justify='center'
          >
            <Text as='span'>{data?.user?.name}</Text>
            <Text
              as='a'
              onClick={() => signOut()}
              fontSize='0.8em'
              color='#d3d3d3'
            >Log Out</Text>
          </Flex>
          <Flex>
            {data.user.image ? (
              <Flex
                border='1px solid #fff'
                borderRadius='50%'
                overflow='hidden'
              >
                <NextImage
                  src={data.user.image}
                  width='40px'
                  height='40px'
                  layout='fixed'
                  objectFit='contain'
                />
              </Flex>
            ) : (
              <>Hello</>
            )}
          </Flex>
        </Flex>
      ) : (
        <NextLink href='/api/auth/signin' passHref>
          <Text>Sign In</Text>
        </NextLink>
      )}
    </Flex>
  );
}

export default NavUser;
