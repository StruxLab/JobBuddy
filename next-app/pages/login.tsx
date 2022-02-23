import { signIn, getSession, useSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next'

interface LoginProps {
  user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
  } | null;
};

export default function Login(props: LoginProps): ReactElement {
  return (
    <div>
      <div>
      Logged in as: { props.user?.name }
      </div>
      <button onClick={() => signIn('google')}>
        Sign in with Google
      </button>
      <button onClick={() => signIn('linkedin')}>
        Sign in with linkedin
      </button>
      <button onClick={() => signIn('github')}>
        Sign in with github
      </button>
    </div>
  );
}

interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  params?: { [key: string]: any }
};
interface GetServerSideProps {
  props: LoginProps;
};

export async function getServerSideProps(context: Context): Promise<GetServerSideProps> {
  const session = await getSession(context);
  return {
    props: {
      user: session?.user || null,
    },
  };
}
