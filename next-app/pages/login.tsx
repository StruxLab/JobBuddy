import { signIn, signOut, getSession, useSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next'

interface ILogin {
  (): ReactElement,
};

const Login: ILogin = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user ? (
        <>
          <div>
          Logged in as: {session?.user?.name + ' ' + session?.user?.id}
          </div>
          <button onClick={() => signOut()}>Logout</button>
        </>
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


    </div>
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
