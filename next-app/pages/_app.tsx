import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/templates/Layout';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Head>
          <title>JobBuddy</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
