import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, API, Auth, withSSRContext } from 'aws-amplify';
import Head from 'next/head';
import awsExports from '@/aws-exports';
import styles from '../styles/Home.module.css';
import { monthStr } from '@/utils';
import { UserData } from '@/models/user_data';
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

Amplify.configure({ ...awsExports, ssr: true });

interface UserPageProp {
    username: string,
    items: UserData,
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const SSR = withSSRContext(context);
  const currMonth = monthStr();
  try {
    const user = await SSR.Auth.currentAuthenticatedUser();
    console.log(user.username);
    const items = await SSR.API.get('api10and30', `/user/object/${user.username}/${currMonth}`, {}) as UserData;
    console.log(items);

    return {
      props: {
        username: user.username,
        items,
      } as UserPageProp,
    }
  } catch (err) {
    if (err === 'The user is not authenticated') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    console.error(err);
    throw err;
  } 
}

export default function Home(props: UserPageProp) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Amplify + Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h1>Hello {props.username}</h1>
            { 
                props.items.highlights.map((highlight, index) => (
                    (<div key={index}><span>{highlight.date}</span>{highlight.highlight}</div>)
                )) 
            }
          </div>
        </div>
      </main>
    </div>
  );
}