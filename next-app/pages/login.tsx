import { signIn, signOut, getSession, useSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Flex, Button } from '@chakra-ui/react';
import DashboardBox from '../components/atoms/DashboardBox';

interface ILogin {
  (): ReactElement,
};

{/* <Flex m={3} w='100%' direction='column'>
<DashboardBox>
    <Heading as='h2' size='md' mb={3}>StruxLab's Terms of Use</Heading>
    <Text>Hey there! You've reached the StruxLab Terms of Use! We haven't built out or site policies yet, but the crux of the policies will ultimately be (1) don't be a jerk, and (2) don't have malicious intent.</Text>
    <Text>We'll update this page once we have a set of site terms available!</Text>
</DashboardBox>
</Flex> */}

const Login: ILogin = () => {
  const { data: session } = useSession();
  return (
    <Flex m={3} direction='column' w='100%'>
      <DashboardBox>
      {session?.user ? (
        <Flex direction='column'>
          <Flex>
          Logged in as: {session?.user?.name + ' ' + session?.user?.id}
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

interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  params?: { [key: string]: any }
};
interface GetServerSideProps {
  props: LoginProps;
};

// export async function getServerSideProps(context: Context): Promise<GetServerSideProps> {
//   const data = await getSession(context);
//   return {
//     props: {
//       user: data?.user || null,
//     },
//   };
// }
