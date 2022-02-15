import { signIn, useSession } from 'next-auth/react';

export default function Login() {
  const { data: session, status } = useSession();
  return (
    <div>
      <div>
        Logged in as: { session?.user?.name }
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
