import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, API, Auth, withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import awsExports from '@/aws-exports';
import styles from '../styles/Home.module.css';
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

Amplify.configure({ ...awsExports, ssr: true });

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const SSR = withSSRContext(context);
  try {
    const user = await SSR.Auth.currentAuthenticatedUser();
    return {
      redirect: {
        destination: '/user',
        permanent: false,
      },
    }
  } catch (err) {
    if (err === 'The user is not authenticated') return { props: {} };
    console.error(err);
    throw err;
  } 
}

export default function Home(props = {}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amplify + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Amplify + Next.js</h1>
        <div className={styles.grid}>
          <div className={styles.card}>
            <Authenticator>
              {({ signOut, user }) => (
                <main>
                  <h1>Hello {user?.username}</h1>
                  <button onClick={signOut}>Sign out</button>
                </main>
              )}
            </Authenticator>
          </div>
        </div>
      </main>
    </div>
  );
}