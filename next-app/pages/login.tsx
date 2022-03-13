import { signIn, signOut, useSession } from 'next-auth/react';
import { Flex, Button } from '@chakra-ui/react';
import DashboardBox from '../components/atoms/DashboardBox';
import type { Session } from 'next-auth';
import { NextPage } from 'next';

type Data = (Session & { user: { id?: string } }) | null;

const Login: NextPage = () => {
  const { data: session } = useSession();
  return (
    <Flex m={3} direction='column' w='100%'>
      <DashboardBox>
      {session?.user ? (
        <Flex direction='column'>
          <Flex>
          Logged in as: {session?.user?.name + ' ' + (session as Data)?.user?.id}
          </Flex>
          <Flex>
            <Button onClick={() => signOut()}>Logout</Button>
          </Flex>
        </Flex>
      ) : (
        <>
          <button onClick={() => signIn('google')}>
            Sign in with Google
          </button>
          <button onClick={() => signIn('linkedin')}>
            Sign in with linkedin
          </button>
          <button onClick={() => signIn('github')}>
            Sign in with github
          </button>
        </>
      )}
      </DashboardBox>
    </Flex>
  );
}

export default Login;
