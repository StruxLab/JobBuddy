import {
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { useSession, signOut, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useRouter } from 'next/router';

const NavUser = () => {
  const { data } = useSession();
  const router = useRouter();
  console.log(router);
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
            <Text cursor='pointer' as='span'>{data?.user?.name}</Text>
            <Text
              as='a'
              onClick={() => signOut()}
              fontSize='0.8em'
              color='#d3d3d3'
              cursor='pointer'
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
          <Text
            as='a'
            onClick={() => signIn(undefined, { callbackUrl: router.pathname })}
          >Sign In</Text>
        </NextLink>
      )}
    </Flex>
  );
}

export default NavUser;
