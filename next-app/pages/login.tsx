import { signIn, getSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import type { NextApiRequest, NextApiResponse } from 'next'

declare type ISODateString = string;
interface LoginProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
};

export default function Login({ user }: LoginProps): ReactElement {
  return (
    <div>
      <div>
      Logged in as: { user?.name }
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
  console.log(context);
  const session = await getSession(context);
  return {
    props: {
      user: session?.user,
    },
  };
}
